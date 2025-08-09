export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <div className="text-center p-8">
        <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">The page you are looking for does not exist.</p>
      </div>
    </div>
  )
}


