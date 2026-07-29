import type { Metadata } from 'next'
import { getServices } from '@/lib/cosmic'
import ServiceCard from '@/components/ServiceCard'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our full range of professional web development services.',
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-sm font-medium mb-6">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-primary-300">
              End-to-end web development solutions to help your business thrive in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛠️</div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Services Coming Soon</h2>
              <p className="text-primary-500">We&apos;re updating our services. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} showFeaturedBadge />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Process</h2>
            <p className="section-subtitle">
              A proven methodology that delivers results on time and on budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discover', desc: 'We learn about your goals, audience, and requirements.' },
              { step: '02', title: 'Design', desc: 'We craft beautiful, functional designs you will love.' },
              { step: '03', title: 'Develop', desc: 'Our engineers build your solution with clean, robust code.' },
              { step: '04', title: 'Deploy', desc: 'We launch, monitor, and support your project long-term.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">{item.title}</h3>
                <p className="text-primary-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}