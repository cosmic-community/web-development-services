'use client'

import type { TeamMember } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TeamMemberCardProps {
  member: TeamMember
  showDepartment?: boolean
}

export default function TeamMemberCard({ member, showDepartment = true }: TeamMemberCardProps) {
  const jobTitle = getMetafieldValue(member.metadata?.job_title)
  const bio = getMetafieldValue(member.metadata?.bio)
  const email = getMetafieldValue(member.metadata?.email)
  const linkedinUrl = getMetafieldValue(member.metadata?.linkedin_url)
  const department = getMetafieldValue(member.metadata?.department)

  return (
    <div className="card overflow-hidden group">
      {/* Photo */}
      <div className="relative h-52 bg-primary-100 overflow-hidden">
        {member.metadata?.photo ? (
          <img
            src={`${member.metadata.photo.imgix_url}?w=400&h=416&fit=crop&auto=format,compress&face=true`}
            alt={member.title}
            width={400}
            height={416}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-200 to-accent-100">
            <span className="text-6xl text-primary-400">👤</span>
          </div>
        )}
        {/* LinkedIn Overlay */}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-accent-600 hover:text-accent-700"
            aria-label={`${member.title} on LinkedIn`}
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-primary-900 text-lg leading-tight">{member.title}</h3>
        {jobTitle && (
          <p className="text-accent-600 font-medium text-sm mt-0.5">{jobTitle}</p>
        )}
        {showDepartment && department && (
          <span className="inline-block mt-2 px-2 py-0.5 bg-primary-100 text-primary-600 text-xs rounded-full">
            {department}
          </span>
        )}
        {bio && (
          <p className="text-primary-500 text-sm mt-3 line-clamp-3">{bio}</p>
        )}

        {/* Contact Links */}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 mt-4 text-sm text-accent-600 hover:text-accent-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {email}
          </a>
        )}
      </div>
    </div>
  )
}
