/** The top of an inner page: one h1 and one line saying what the page is for. */
export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="shell pt-10 sm:pt-14">
      <h1 className="headline enter max-w-[22ch]">{title}</h1>
      <p className="lead enter enter-1 mt-5 max-w-[48ch]">{intro}</p>
    </header>
  )
}
