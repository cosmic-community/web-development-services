// app/case-studies/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCaseStudyBySlug, getCaseStudies, getMetafieldValue } from '@/lib/cosmic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case Study Not Found' }
  return {
    title: study.title,
    description: getMetafieldValue(study.metadata?.summary).slice(0, 160),
  }
}

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies()
  return caseStudies.map((s) => ({ slug: s.slug }))
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) notFound()

  const clientName = getMetafieldValue(study.metadata?.client_name)
  const summary = getMetafieldValue(study.metadata?.summary)
  const challenge = getMetafieldValue(study.metadata?.challenge)
  const solution = getMetafieldValue(study.metadata?.solution)
  const results = getMetafieldValue(study.metadata?.results)
  const publishedDate = study.metadata?.published_date
    ? new Date(study.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center text-primary-300 hover:text-white mb-8 transition-colors"
          >
            ← Back to Case Studies
          </Link>
          {study.metadata?.related_service && (
            <span className="inline-block px-3 py-1 bg-accent-500 bg-opacity-30 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-xs font-medium mb-4">
              {study.metadata.related_service.title}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{study.title}</h1>
          {clientName && (
            <p className="text-accent-300 text-lg font-medium mb-4">Client: {clientName}</p>
          )}
          {summary && (
            <p className="text-xl text-primary-300 max-w-3xl">{summary}</p>
          )}
          {publishedDate && (
            <p className="text-primary-400 text-sm mt-4">{publishedDate}</p>
          )}
        </div>
      </section>

      {/* Hero Image */}
      {study.metadata?.hero_image && (
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={`${study.metadata.hero_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
            alt={study.title}
            width={1400}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {challenge && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-lg">⚡</div>
                  <h2 className="text-2xl font-bold text-primary-900">The Challenge</h2>
                </div>
                <div className="prose-custom text-primary-700 pl-13">
                  <p>{challenge}</p>
                </div>
              </div>
            )}

            {solution && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-lg">💡</div>
                  <h2 className="text-2xl font-bold text-primary-900">Our Solution</h2>
                </div>
                <div className="prose-custom text-primary-700">
                  <p>{solution}</p>
                </div>
              </div>
            )}

            {results && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-lg">📈</div>
                  <h2 className="text-2xl font-bold text-primary-900">Results</h2>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                  <p className="text-primary-700">{results}</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-4">Project Details</h3>
              <dl className="space-y-3">
                {clientName && (
                  <div>
                    <dt className="text-sm text-primary-500 font-medium">Client</dt>
                    <dd className="text-primary-900 font-semibold">{clientName}</dd>
                  </div>
                )}
                {study.metadata?.related_service && (
                  <div>
                    <dt className="text-sm text-primary-500 font-medium">Service</dt>
                    <dd className="text-primary-900 font-semibold">
                      <Link
                        href={`/services/${study.metadata.related_service.slug}`}
                        className="text-accent-600 hover:text-accent-700"
                      >
                        {study.metadata.related_service.title}
                      </Link>
                    </dd>
                  </div>
                )}
                {publishedDate && (
                  <div>
                    <dt className="text-sm text-primary-500 font-medium">Published</dt>
                    <dd className="text-primary-900 font-semibold">{publishedDate}</dd>
                  </div>
                )}
              </dl>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-4">Start a Project</h3>
              <p className="text-primary-500 mb-4">
                Inspired by this result? Let&apos;s discuss your project.
              </p>
              <Link href="/team" className="btn-primary w-full text-center">
                Contact Us
              </Link>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-primary-900 mb-4">Explore</h3>
              <div className="space-y-3">
                <Link href="/case-studies" className="block text-accent-600 hover:text-accent-700 font-medium">
                  ← All Case Studies
                </Link>
                <Link href="/services" className="block text-accent-600 hover:text-accent-700 font-medium">
                  Our Services
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