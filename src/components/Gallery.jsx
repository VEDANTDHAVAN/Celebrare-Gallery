import { useEffect, useMemo, useReducer, useState, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favoritesReducer } from "../reducers/favoritesReducer";
import PhotoCard from "./PhotoCard";

const FAVORITES_KEY = "celebrare-favorites";

function getInitialFavorites() {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(savedFavorites);

    return Array.isArray(parsedFavorites) ? parsedFavorites : [];
  } catch {
    return [];
  }
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getInitialFavorites
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return photos.filter((photo) => photo.author.toLowerCase().includes(normalizedSearch));
  }, [photos, searchTerm]);

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
      );
    } catch (err) {
      console.error("Unable to save favourites:", err);
    }
  }, [favorites]);

  const handleToggleFavorite = (photoId) => {
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: photoId,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600"
          role="status"
          aria-label="Loading photos"
        />
        <p className="text-sm text-gray-500">
          Loading beautiful photos...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
      >
        <p className="font-semibold text-red-700">
          Unable to load photos
        </p>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-7">
        <label
          htmlFor="photo-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search by author
        </label>

        <input
          id="photo-search"
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search photographers..."
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 sm:max-w-md"
        />
      </div>

      {filteredPhotos.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          No photos found for "{searchTerm}".
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavorite={favorites.includes(photo.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
