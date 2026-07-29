import type { Testimonial } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TestimonialCardProps {
  testimonial: Testimonial
  dark?: boolean
  featured?: boolean
}

function StarRating({ rating, dark }: { rating: number; dark?: boolean }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'text-yellow-400'
              : dark
              ? 'text-primary-600'
              : 'text-primary-200'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCard({ testimonial, dark = false, featured = false }: TestimonialCardProps) {
  const quote = getMetafieldValue(testimonial.metadata?.quote)
  const clientName = getMetafieldValue(testimonial.metadata?.client_name)
  const clientTitle = getMetafieldValue(testimonial.metadata?.client_title)
  const companyName = getMetafieldValue(testimonial.metadata?.company_name)
  const rating = testimonial.metadata?.rating ?? 5

  const cardClasses = dark
    ? 'bg-primary-800 border border-primary-700 rounded-xl p-6 h-full flex flex-col'
    : featured
    ? 'bg-white border-2 border-accent-200 rounded-xl p-6 h-full flex flex-col shadow-md'
    : 'card p-6 h-full flex flex-col'

  return (
    <div className={cardClasses}>
      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={rating} dark={dark} />
      </div>

      {/* Quote */}
      {quote && (
        <blockquote className={`text-sm leading-relaxed flex-grow mb-6 ${
          dark ? 'text-primary-300' : 'text-primary-600'
        }`}>
          &ldquo;{quote}&rdquo;
        </blockquote>
      )}

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto">
        {testimonial.metadata?.client_photo ? (
          <img
            src={`${testimonial.metadata.client_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={clientName || 'Client'}
            width={80}
            height={80}
            className="w-11 h-11 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-lg ${
            dark ? 'bg-primary-700' : 'bg-accent-100'
          }`}>
            👤
          </div>
        )}
        <div>
          {clientName && (
            <p className={`font-semibold text-sm ${dark ? 'text-white' : 'text-primary-900'}`}>
              {clientName}
            </p>
          )}
          <p className={`text-xs ${dark ? 'text-primary-400' : 'text-primary-500'}`}>
            {clientTitle && companyName
              ? `${clientTitle}, ${companyName}`
              : clientTitle || companyName || ''}
          </p>
        </div>
        {testimonial.metadata?.featured && !dark && (
          <div className="ml-auto">
            <span className="text-xs bg-accent-100 text-accent-700 px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
    </div>
  )
}