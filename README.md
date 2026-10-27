# Celebrare Photo Gallery

A responsive photo gallery built with **React, Vite, and Tailwind CSS** as part of the Celebrare Frontend React Internship Pre-Screening Assignment.

The application fetches 30 photos from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30), displays them in a responsive grid, supports real-time author search, and allows users to save favourite photos across page refreshes.

## Features

- **Photo Gallery:** Fetches and displays 30 photos from the Picsum Photos API.
- **Responsive Design:** One column on mobile, two columns on tablet, and four columns on desktop.
- **Author Information:** Displays the photographer's name on each photo card.
- **Real-Time Search:** Filters photos by author name as the user types, without additional API requests.
- **Favourites:** Add or remove photos from favourites using a heart button.
- **Persistent Storage:** Saves favourite photo IDs in browser `localStorage`, preserving selections after refresh.
- **Loading State:** Displays a spinner while photos are being fetched.
- **Error Handling:** Displays an error message if the API request fails.
- **Reusable Components:** Separates the gallery layout and individual photo cards.
- **Custom Hook:** Extracts photo-fetching logic into `useFetchPhotos`.
- **React Performance Hooks:** Uses `useCallback` for the search handler and `useMemo` for the filtered photo list.

## Tech Stack

- **React** — UI components and state management
- **Vite** — Development server and build tooling
- **Tailwind CSS** — Responsive styling
- **JavaScript (ES6+)** — Application logic
- **Picsum Photos API** — Photo data source
- **Browser localStorage** — Persistent favourites

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) — preferably a current LTS version
- npm, included with Node.js
- Git, for version control

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/VEDANTDHAVAN/Celebrare-Gallery
```

**2. Navigate to the project directory**

```bash
cd celebrare-gallery
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Open the local URL displayed in your terminal, typically:

```text
http://localhost:5173
```

### Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
celebrare-gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx
│   │   └── PhotoCard.jsx
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favoritesReducer.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## API Used

**Picsum Photos API**

Endpoint:

```text
https://picsum.photos/v2/list?limit=30
```

The API returns a list of photo records containing information such as:

- `id` — Unique photo identifier
- `author` — Photographer's name
- `download_url` — URL used to display the photo

The application fetches the photo list when the Gallery component mounts. Search operations filter the existing data locally rather than making additional API requests.

## Key Implementation Details

### 1. Custom Hook — `useFetchPhotos`

The `useFetchPhotos` hook separates data-fetching logic from the gallery UI.

It returns three values:

- `photos` — The fetched photo records
- `loading` — Indicates whether the request is in progress
- `error` — Contains an error message if fetching fails

The hook uses `useEffect` to initiate the request and handles unsuccessful HTTP responses, network failures, and request cancellation.

### 2. Favourites with `useReducer`

The `favoritesReducer` manages favourite photo IDs through a `TOGGLE_FAVORITE` action.

- If a photo is already a favourite, its ID is removed.
- Otherwise, its ID is added.
- State updates are immutable, returning a new array rather than modifying the existing state.

This centralizes the favourite toggle logic in the reducer, as required by the assignment.

### 3. Persistence with `localStorage`

Favourite IDs are loaded from `localStorage` during reducer initialization.

Whenever the favourites state changes, a `useEffect` saves the updated array using `JSON.stringify`. When the application initializes again, `JSON.parse` restores the saved array.

This allows favourites to persist across browser refreshes on the same browser origin.

### 4. Search with `useCallback`

The `handleSearchChange` function updates the search term as the user types.

`useCallback` preserves the function reference while its dependencies remain unchanged. The handler updates React state, triggering the necessary re-render.

### 5. Filtering with `useMemo`

The `filteredPhotos` calculation filters the fetched photos by author name.

The search is case-insensitive and ignores leading and trailing whitespace. `useMemo` caches the filtered result until the photo list or search term changes.

### 6. Responsive UI with Tailwind CSS

The gallery uses Tailwind's responsive grid utilities:

```jsx
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

This provides one column on mobile, two columns at the `sm` breakpoint, and four columns at the `lg` breakpoint.

Photo cards also use consistent image proportions, rounded corners, subtle shadows, and hover transitions.

## Testing Checklist

- [ ] The application fetches and displays 30 photos.
- [ ] The loading spinner appears while photos are being fetched.
- [ ] An error message is displayed if the API request fails.
- [ ] Each photo card displays the image, author name, and heart button.
- [ ] The layout adapts to mobile, tablet, and desktop.
- [ ] Author search filters results in real time.
- [ ] Searching does not trigger additional API requests.
- [ ] Favourites can be added and removed.
- [ ] Favourite selections persist after refreshing the page.
- [ ] The project builds successfully using `npm run build`.

## Assignment Submission

**Role:** Frontend React Intern

**Company:** Celebrare

**Assignment:** React Photo Gallery

**Repository:** Add your public GitHub repository URL here.

**Screen Recording:** Add your Google Drive or unlisted YouTube recording link here after recording your walkthrough.

**Hardest Part:** Implementing reducer-based favourite management with `localStorage` persistence while keeping the UI synchronized with the saved state.

## Future Improvements

The application intentionally stays within the scope of the screening assignment. No additional features have been included.

## License

This project was created for the Celebrare Frontend React Internship Pre-Screening Assignment.
