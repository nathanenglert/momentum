"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Moon, Sun, ThumbsUp, Trash } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export default function AccountMenu() {
  const { data: session, status } = useSession()
  const { setTheme, theme } = useTheme()
  const [useBro, setUseBro] = useState(Cookies.get("locale") === "bro")
  const router = useRouter()

  if (status === "unauthenticated") {
    return (
      <Button
        className="transition" //group flex shrink-0
        onClick={() => signIn()}
      >
        Sign in
      </Button>
    )
  }

  if (status === "loading" || !session) {
    return <>...</>
  }

  const handleLocaleChange = () => {
    const temp = !useBro
    const newLocale = temp ? "bro" : "en"
    Cookies.set("locale", newLocale)

    setUseBro(temp)
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="transition" variant={`ghost`}>
          <span className="sr-only">Menu</span>
          <Image
            src={session.user?.image ?? "/default-avatar.webp"}
            className="h-10 w-10 rounded-full object-cover"
            alt={session.user?.name || "User's avatar"}
            height={40}
            width={40}
          />

          <p className="ms-2 hidden text-left text-xs sm:block">
            <strong className="block font-medium text-foreground">
              {session.user?.name}
            </strong>

            <span className="text-muted-foreground">{session.user?.email}</span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ms-4 hidden h-5 w-5 text-muted-foreground transition group-hover:text-gray-700 sm:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] mb-2">
        {/* {[
          [`About`, `/about`],
          [`Account`, `/account`],
          [`Profile`, `/u/${session.user?.id}`],
        ].map(([name, url]) => (
          <DropdownMenuItem>
            <Link
              href={url}
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              key={name}
              role="menuitem"
            >
              {name}
            </Link>
          </DropdownMenuItem>
        ))} */}

        <AccountMenuItem onClick={handleLocaleChange}>
          <ThumbsUp size={16} className={cn({ "text-muted": !useBro })} />
          Use Bro
        </AccountMenuItem>

        <AccountMenuItem
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Sun
              size={16}
              className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            />
          ) : (
            <Moon
              size={16}
              className="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            />
          )}
          Toggle theme
        </AccountMenuItem>

        <AccountMenuItem onClick={() => signOut()}>
          <Trash size={16} />
          Sign out
        </AccountMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AccountMenuItem({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <DropdownMenuItem
      className="gap-2 p-2 cursor-pointer"
      onClick={onClick}
      {...props}
    >
      {children}
    </DropdownMenuItem>
  )
}
