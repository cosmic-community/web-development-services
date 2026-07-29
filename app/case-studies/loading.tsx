export default function CaseStudiesLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <div className="bg-hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-6 w-28 bg-white bg-opacity-20 rounded-full mb-6" />
            <div className="h-12 w-72 bg-white bg-opacity-20 rounded-lg mb-4" />
            <div className="h-6 w-96 bg-white bg-opacity-10 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card overflow-hidden animate-pulse">
                <div className="h-48 bg-primary-100" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-primary-100 rounded w-1/3" />
                  <div className="h-5 bg-primary-100 rounded w-3/4" />
                  <div className="h-4 bg-primary-100 rounded" />
                  <div className="h-4 bg-primary-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}