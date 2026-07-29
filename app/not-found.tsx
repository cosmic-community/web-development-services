import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary-700 mb-4">Page Not Found</h2>
        <p className="text-primary-500 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/services" className="btn-secondary">
            View Services
          </Link>
        </div>
      </div>
    </div>
  )
}