export default function ServicesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-white bg-opacity-20 rounded-full mb-6" />
            <div className="h-12 w-80 bg-white bg-opacity-20 rounded-lg mb-4" />
            <div className="h-6 w-96 bg-white bg-opacity-10 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="w-12 h-12 bg-primary-100 rounded-xl mb-4" />
                <div className="h-6 bg-primary-100 rounded mb-3 w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-primary-100 rounded" />
                  <div className="h-4 bg-primary-100 rounded w-5/6" />
                  <div className="h-4 bg-primary-100 rounded w-4/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}