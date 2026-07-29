import type { Metadata } from 'next'
import { getTestimonials } from '@/lib/cosmic'
import TestimonialCard from '@/components/TestimonialCard'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Hear what our clients have to say about working with us.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  const featured = testimonials.filter((t) => t.metadata?.featured)
  const rest = testimonials.filter((t) => !t.metadata?.featured)
  const sorted = [...featured, ...rest]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-sm font-medium mb-6">
              Client Voices
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h1>
            <p className="text-xl text-primary-300">
              Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped grow.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      {featured.length > 0 && (
        <section className="py-16 bg-accent-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-8">Featured Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.slice(0, 3).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Reviews Coming Soon</h2>
              <p className="text-primary-500">Client testimonials are being collected.</p>
            </div>
          ) : (
            <>
              {rest.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <h2 className="text-2xl font-bold text-primary-900 mb-8">More Reviews</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((testimonial) => (
                      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                  </div>
                </div>
              )}
              {featured.length > 0 && rest.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-primary-500">Showing all featured reviews above.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Stats */}
      {sorted.length > 0 && (
        <section className="py-16 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-400 mb-2">{sorted.length}</div>
                <div className="text-primary-400">Client Reviews</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-400 mb-2">
                  {sorted.filter((t) => (t.metadata?.rating ?? 0) >= 5).length}
                </div>
                <div className="text-primary-400">5-Star Ratings</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-400 mb-2">
                  {sorted.length > 0
                    ? (
                        sorted.reduce((sum, t) => sum + (t.metadata?.rating ?? 5), 0) /
                        sorted.length
                      ).toFixed(1)
                    : '5.0'}
                </div>
                <div className="text-primary-400">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-400 mb-2">100%</div>
                <div className="text-primary-400">Would Recommend</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}