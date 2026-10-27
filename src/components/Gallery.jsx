
import useFetchPhotos from "../hooks/useFetchPhotos";
import PhotoCard from "./PhotoCard";

function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  // Favourite state will be connected in Step 4.
  const handleToggleFavorite = (photoId) => {
    console.log("Selected photo:", photoId);
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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorite={false}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}

export default Gallery;
