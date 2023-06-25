import AccountMenu from "./account-menu"

export function SiteHeader() {
  return (
    <header className="absolute bottom-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-center space-x-4">
          <nav className="flex items-center space-x-1">
            <AccountMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}
