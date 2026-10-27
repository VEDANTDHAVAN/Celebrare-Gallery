
function PhotoCard({ photo, isFavorite = false, onToggleFavorite }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
            Photographer
          </p>
          <h2 className="mt-1 truncate font-semibold text-gray-800">
            {photo.author}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={
            isFavorite
              ? `Remove ${photo.author} from favourites`
              : `Add ${photo.author} to favourites`
          }
          aria-pressed={isFavorite}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
            isFavorite
              ? "bg-rose-50 text-rose-600"
              : "bg-gray-100 text-gray-500 hover:bg-rose-50 hover:text-rose-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default PhotoCard;
