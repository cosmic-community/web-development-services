// app/services/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getServiceBySlug, getServices, getMetafieldValue } from '@/lib/cosmic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.title,
    description: getMetafieldValue(service.metadata?.description).slice(0, 160),
  }
}

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const description = getMetafieldValue(service.metadata?.description)
  const icon = getMetafieldValue(service.metadata?.icon)
  const keyBenefits = getMetafieldValue(service.metadata?.key_benefits)
  const benefitLines = keyBenefits
    ? keyBenefits.split('\n').filter((line) => line.trim())
    : []

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center text-primary-300 hover:text-white mb-8 transition-colors"
          >
            ← Back to Services
          </Link>
          <div className="flex items-start gap-6">
            {icon && (
              <div className="text-6xl flex-shrink-0">{icon}</div>
            )}
            <div>
              {service.metadata?.featured && (
                <span className="inline-block px-3 py-1 bg-accent-500 bg-opacity-30 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-xs font-medium mb-3">
                  Featured Service
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
              {description && (
                <p className="text-xl text-primary-300 max-w-2xl">{description}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {service.metadata?.featured_image && (
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={`${service.metadata.featured_image.imgix_url}?w=900&h=450&fit=crop&auto=format,compress`}
                  alt={service.title}
                  width={900}
                  height={450}
                  className="w-full object-cover"
                />
              </div>
            )}

            {benefitLines.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-primary-900 mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {benefitLines.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </span>
                      <span className="text-primary-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-4">Get Started</h3>
              <p className="text-primary-500 mb-6">
                Ready to get started with {service.title}? Our team is here to help.
              </p>
              <Link href="/team" className="btn-primary w-full text-center">
                Contact Us
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-4">Explore More</h3>
              <div className="space-y-3">
                <Link href="/services" className="block text-accent-600 hover:text-accent-700 font-medium">
                  ← All Services
                </Link>
                <Link href="/case-studies" className="block text-accent-600 hover:text-accent-700 font-medium">
                  View Case Studies
                </Link>
                <Link href="/testimonials" className="block text-accent-600 hover:text-accent-700 font-medium">
                  Client Testimonials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}