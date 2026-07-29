# Web Development Services

![App Preview](https://imgix.cosmicjs.com/8c600ee0-8ae7-11f1-81f1-4f77b00f7782-autopilot-photo-1580489944761-15a19d654956-1785286252230.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern company website for web development services, powered by [Cosmic](https://www.cosmicjs.com) CMS. Features a professional homepage with hero section, plus dedicated pages for services, team members, case studies, and client testimonials.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured services, team spotlight, testimonials, and case studies
- 🛠️ **Services Showcase** — Grid layout with icons, benefits, and detail pages
- 👥 **Team Members** — Department-filtered cards with photos, bios, and LinkedIn links
- 📁 **Case Studies** — Rich client success stories with challenge, solution, and results
- 💬 **Testimonials** — Star-rated client quotes with photos and company info
- 📱 **Fully Responsive** — Mobile-first design with smooth animations
- ⚡ **Server-Side Rendering** — Fast, SEO-optimized with Next.js 16 App Router
- 🎨 **Modern Design** — Professional dark/light color palette with gradient accents

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a694df0f5196dac6621b367&clone_repository=6a694facf5196dac6621b3bf)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a professional services company with services offered, team members (including photos and bios), case studies, and client testimonials. A company website with services, team members, case studies, and testimonials"

### Code Generation Prompt

> "Build a Next.js application for a company website called 'Web development services'. The content is managed in Cosmic CMS with the following object types: services, team-members, case-studies, testimonials. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A company website with services, team members, case studies, and testimonials"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- **[Cosmic](https://www.cosmicjs.com)** — Headless CMS for content management
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe development

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A [Cosmic](https://www.cosmicjs.com) account with bucket containing `services`, `team-members`, `case-studies`, and `testimonials` object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd web-development-services

# Install dependencies
bun install

# Set up environment variables
# Create a .env.local file with your Cosmic credentials:
# COSMIC_BUCKET_SLUG=your-bucket-slug
# COSMIC_READ_KEY=your-read-key
# COSMIC_WRITE_KEY=your-write-key

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: services } = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Featured Testimonials

```typescript
const { objects: testimonials } = await cosmic.objects
  .find({ type: 'testimonials', 'metadata.featured': true })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Case Study with Related Service

```typescript
const { object: caseStudy } = await cosmic.objects
  .findOne({ type: 'case-studies', slug: 'my-case-study' })
  .depth(2) // Depth 2 to get related service details
```

## Cosmic CMS Integration

This app uses Cosmic's content types:

| Object Type | Description |
|---|---|
| `services` | Service offerings with icons, benefits, featured flag |
| `team-members` | Staff with photos, bios, department, contact info |
| `case-studies` | Client success stories with related service links |
| `testimonials` | Client quotes with ratings, photos, and featured flag |

Content relationships:
- Case studies reference a `related_service` object
- Testimonials can reference a `related_case_study` object
- Featured flags control homepage spotlight sections

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY
```

### Netlify

```bash
# Install Netlify CLI
bun add -g netlify-cli

# Deploy
netlify deploy --build

# Set environment variables in Netlify dashboard
```

### Environment Variables

Set these in your hosting platform's dashboard:

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->