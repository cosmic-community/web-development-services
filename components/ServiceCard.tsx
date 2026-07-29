import Link from 'next/link'
import type { Service } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface ServiceCardProps {
  service: Service
  showFeaturedBadge?: boolean
}

export default function ServiceCard({ service, showFeaturedBadge = false }: ServiceCardProps) {
  const description = getMetafieldValue(service.metadata?.description)
  const icon = getMetafieldValue(service.metadata?.icon)
  const keyBenefits = getMetafieldValue(service.metadata?.key_benefits)

  const benefitLines = keyBenefits
    ? keyBenefits.split('\n').filter((line) => line.trim()).slice(0, 3)
    : []

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="card p-6 h-full flex flex-col group-hover:border-accent-200 transition-all duration-200">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {icon ? (
            <div className="text-4xl">{icon}</div>
          ) : (
            <div className="w-12 h-12 rounded-xl bg-accent-100 text-accent-600 flex items-center justify-center text-xl">
              🛠️
            </div>
          )}
          {showFeaturedBadge && service.metadata?.featured && (
            <span className="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-600 transition-colors">
          {service.title}
        </h3>

        {description && (
          <p className="text-primary-500 text-sm mb-4 flex-grow line-clamp-3">
            {description}
          </p>
        )}

        {/* Benefits Preview */}
        {benefitLines.length > 0 && (
          <ul className="space-y-2 mb-4">
            {benefitLines.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-primary-600">
                <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0">
                  ✓
                </span>
                <span className="truncate">{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Featured Image */}
        {service.metadata?.featured_image && (
          <div className="rounded-lg overflow-hidden mb-4 h-36">
            <img
              src={`${service.metadata.featured_image.imgix_url}?w=600&h=288&fit=crop&auto=format,compress`}
              alt={service.title}
              width={600}
              height={288}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4">
          <span className="text-accent-600 font-medium text-sm group-hover:text-accent-700 transition-colors">
            Learn More →
          </span>
        </div>
      </div>
    </Link>
  )
}