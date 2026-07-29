export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-accent-200 border-t-accent-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-primary-500 font-medium">Loading...</p>
      </div>
    </div>
  )
}