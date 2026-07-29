import type { Metadata } from 'next'
import { getTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the talented people behind our web development services.',
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers()

  const departments = Array.from(
    new Set(
      teamMembers
        .map((m) => m.metadata?.department)
        .filter((d): d is string => Boolean(d))
    )
  )

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent-500 bg-opacity-20 border border-accent-400 border-opacity-30 rounded-full text-accent-300 text-sm font-medium mb-6">
              The People Behind the Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h1>
            <p className="text-xl text-primary-300">
              Talented professionals united by a passion for building exceptional digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">👥</div>
              <h2 className="text-2xl font-bold text-primary-900 mb-2">Team Coming Soon</h2>
              <p className="text-primary-500">Team profiles are being updated.</p>
            </div>
          ) : departments.length > 1 ? (
            departments.map((dept) => {
              const deptMembers = teamMembers.filter(
                (m) => m.metadata?.department === dept
              )
              return (
                <div key={dept} className="mb-16">
                  <h2 className="text-2xl font-bold text-primary-900 mb-8 pb-4 border-b border-primary-200">
                    {dept}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {deptMembers.map((member) => (
                      <TeamMemberCard key={member.id} member={member} showDepartment={false} />
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Life at Our Company</h2>
              <p className="text-primary-600 mb-6">
                We foster a culture of continuous learning, collaboration, and innovation.
                Our team members are empowered to do their best work in an environment
                that values creativity and professional growth.
              </p>
              <ul className="space-y-4">
                {[
                  'Remote-friendly work environment',
                  'Continuous learning & development',
                  'Collaborative, inclusive culture',
                  'Competitive compensation & benefits',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-700">
                    <span className="w-6 h-6 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6 text-center">We&apos;re Hiring!</h3>
              <p className="text-primary-600 text-center mb-6">
                Interested in joining our team? We&apos;re always looking for talented
                people who are passionate about web development.
              </p>
              <div className="text-center">
                <a
                  href="mailto:careers@webdevservices.com"
                  className="btn-primary inline-flex"
                >
                  View Open Positions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}