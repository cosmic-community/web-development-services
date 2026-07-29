import { createBucketClient } from '@cosmicjs/sdk'
import type { Service, TeamMember, CaseStudy, Testimonial } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getFeaturedServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'services', 'metadata.featured': true })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Service
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw error
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as TeamMember[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'case-studies' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(2)
    const studies = response.objects as CaseStudy[]
    return studies.sort((a, b) => {
      const dateA = new Date(a.metadata?.published_date || a.created_at || '').getTime()
      const dateB = new Date(b.metadata?.published_date || b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'case-studies', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(2)
    return response.object as CaseStudy
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw error
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(2)
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials', 'metadata.featured': true })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(2)
    return response.objects as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}