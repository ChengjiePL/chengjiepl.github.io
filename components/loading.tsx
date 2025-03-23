interface LoadingProps {
  section?: string
}

export default function Loading({ section }: LoadingProps = {}) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative flex flex-col items-center gap-2">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <span className="text-sm text-muted-foreground">{section ? `Loading ${section}...` : "Loading..."}</span>
      </div>
    </div>
  )
}

