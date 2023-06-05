"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover"
import { signIn, signOut, useSession } from "next-auth/react"

import { Button } from "./ui/button"

export default function AccountMenu() {
  const { data: session, status } = useSession()

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

  return (
    <Popover>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent>
        <div
          className="z-10 mb-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
          role="menu"
        >
          <div className="p-2">
            {[
              [`About`, `/about`],
              [`Account`, `/account`],
              [`Profile`, `/u/${session.user?.id}`],
            ].map(([name, url]) => (
              <Link
                href={url}
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="p-2">
            <Button
              className="gap-2 w-full"
              variant={`ghost`}
              role="menuitem"
              onClick={() => signOut()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Sign out
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
