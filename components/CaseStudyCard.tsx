import Link from 'next/link'
import type { CaseStudy } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const clientName = getMetafieldValue(caseStudy.metadata?.client_name)
  const summary = getMetafieldValue(caseStudy.metadata?.summary)

  const publishedDate = caseStudy.metadata?.published_date
    ? new Date(caseStudy.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : null

  return (
    <Link href={`/case-studies/${caseStudy.slug}`} className="group block">
      <div className="card overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-primary-100 overflow-hidden">
          {caseStudy.metadata?.hero_image ? (
            <img
              src={`${caseStudy.metadata.hero_image.imgix_url}?w=600&h=288&fit=crop&auto=format,compress`}
              alt={caseStudy.title}
              width={600}
              height={288}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent-100 to-primary-200 flex items-center justify-center">
              <span className="text-5xl">📁</span>
            </div>
          )}
          {/* Service Badge */}
          {caseStudy.metadata?.related_service && (
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 bg-white bg-opacity-90 text-primary-800 text-xs font-medium rounded-full shadow-sm">
                {caseStudy.metadata.related_service.title}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {clientName && (
            <p className="text-accent-600 font-medium text-sm mb-2">{clientName}</p>
          )}
          <h3 className="text-lg font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
            {caseStudy.title}
          </h3>
          {summary && (
            <p className="text-primary-500 text-sm line-clamp-3 flex-grow mb-4">
              {summary}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary-100">
            {publishedDate && (
              <span className="text-primary-400 text-xs">{publishedDate}</span>
            )}
            <span className="text-accent-600 font-medium text-sm group-hover:text-accent-700 transition-colors ml-auto">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}