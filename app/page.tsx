import Link from 'next/link'
import {
  getFeaturedServices,
  getTeamMembers,
  getFeaturedTestimonials,
  getCaseStudies,
} from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import TeamMemberCard from '@/components/TeamMemberCard'
import CaseStudyCard from '@/components/CaseStudyCard'

export default async function HomePage() {
  const [featuredServices, teamMembers, featuredTestimonials, caseStudies] =
    await Promise.all([
      getFeaturedServices(),
      getTeamMembers(),
      getFeaturedTestimonials(),
      getCaseStudies(),
    ])

  const displayedServices = featuredServices.length > 0 ? featuredServices : []
  const displayedTeam = teamMembers.slice(0, 4)
  const displayedTestimonials = featuredTestimonials.length > 0
    ? featuredTestimonials.slice(0, 3)
    : []
  const displayedCaseStudies = caseStudies.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-sm font-medium mb-6">
              Professional Web Development
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              We Build{' '}
              <span className="text-gradient">Digital Experiences</span>{' '}
              That Drive Growth
            </h1>
            <p className="text-xl text-primary-300 mb-10 max-w-2xl">
              From stunning websites to complex web applications, our expert team delivers
              solutions that help your business thrive in the digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="btn-primary text-lg px-8 py-4">
                Explore Our Services
              </Link>
              <Link href="/case-studies" className="btn-outline text-lg px-8 py-4">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="relative border-t border-white border-opacity-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Projects Delivered', value: '150+' },
                { label: 'Happy Clients', value: '80+' },
                { label: 'Years Experience', value: '10+' },
                { label: 'Team Members', value: `${teamMembers.length > 0 ? teamMembers.length : '20'}+` },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-primary-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {displayedServices.length > 0 && (
        <section className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                Comprehensive web development solutions tailored to your business needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/services" className="btn-primary">
                View All Services
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {displayedCaseStudies.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Featured Work</h2>
              <p className="section-subtitle">
                Real results for real clients — see how we've helped businesses succeed
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCaseStudies.map((study) => (
                <CaseStudyCard key={study.id} caseStudy={study} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/case-studies" className="btn-primary">
                View All Case Studies
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {displayedTeam.length > 0 && (
        <section className="py-20 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="section-subtitle">
                Talented professionals passionate about crafting exceptional digital experiences
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {displayedTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/team" className="btn-primary">
                Meet the Full Team
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {displayedTestimonials.length > 0 && (
        <section className="py-20 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-primary-400 max-w-2xl mx-auto">
                Don&apos;t just take our word for it — hear from the businesses we&apos;ve helped grow
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} dark />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/testimonials" className="btn-outline">
                Read More Reviews
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-accent-100 mb-10">
            Let&apos;s discuss your project and create a digital solution that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/team"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent-700 font-semibold rounded-lg hover:bg-accent-50 transition-colors duration-200 text-lg"
            >
              Get In Touch
            </Link>
            <Link href="/case-studies" className="btn-outline text-lg px-8 py-4">
              See Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}