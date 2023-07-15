import AccountMenu from "./account-menu"
import NextPageLink from "./nav/next-page-link"
import PreviousPageLink from "./nav/previous-page-link"

export function SiteHeader() {
  return (
    <header className="absolute bottom-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-center space-x-4">
          <nav className="flex items-center space-x-1">
            <PreviousPageLink />
            <AccountMenu />
            <NextPageLink />
          </nav>
        </div>
      </div>
    </header>
  )
}
