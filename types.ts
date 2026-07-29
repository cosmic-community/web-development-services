export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Service {
  id: string
  slug: string
  title: string
  type: 'services'
  created_at: string
  modified_at: string
  metadata: {
    description?: string
    icon?: string
    featured_image?: CosmicImage
    key_benefits?: string
    featured?: boolean
  }
}

export interface TeamMember {
  id: string
  slug: string
  title: string
  type: 'team-members'
  created_at: string
  modified_at: string
  metadata: {
    job_title?: string
    bio?: string
    photo?: CosmicImage
    email?: string
    linkedin_url?: string
    department?: string
  }
}

export interface CaseStudy {
  id: string
  slug: string
  title: string
  type: 'case-studies'
  created_at: string
  modified_at: string
  metadata: {
    client_name?: string
    summary?: string
    challenge?: string
    solution?: string
    results?: string
    hero_image?: CosmicImage
    related_service?: Service
    published_date?: string
  }
}

export interface Testimonial {
  id: string
  slug: string
  title: string
  type: 'testimonials'
  created_at: string
  modified_at: string
  metadata: {
    quote?: string
    client_name?: string
    client_title?: string
    company_name?: string
    client_photo?: CosmicImage
    rating?: number
    related_case_study?: CaseStudy
    featured?: boolean
  }
}