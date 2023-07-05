export function InspirationalQuote({ dict }: { dict: any[] }) {
  const dayOfMonth = new Date().getDate()
  const randomIndex = dayOfMonth % dict.length
  const randomQuote = dict[randomIndex]

  return (
    <blockquote className="border-l-2 pl-6 italic">
      <p>{randomQuote.message}</p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">
        {randomQuote.author}
      </p>
    </blockquote>
  )
}
