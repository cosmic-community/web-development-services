import type { Metadata } from 'next'
import { getCaseStudies } from '@/lib/cosmic'
import CaseStudyCard from '@/components/CaseStudyCard'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Discover how we\'ve helped businesses achieve their goals through expert web development.',
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-sm font-medium mb-6">
              Our Portfolio
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-primary-300">
              Real stories. Real results. Explore how we&apos;ve helped businesses transform their digital presence.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {caseStudies.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📁</div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Case Studies Coming Soon</h2>
              <p className="text-primary-500">We&apos;re documenting our latest projects. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.id} caseStudy={study} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}