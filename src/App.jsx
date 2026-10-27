import Gallery from "./components/Gallery";

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">
            Discover
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Photo Gallery
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            A collection of photographs from creators around the world.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Gallery />
      </section>
    </main>
  );
}

export default App;
