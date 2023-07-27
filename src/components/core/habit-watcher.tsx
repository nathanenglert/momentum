"use client"

import { useEffect } from "react"
import { isToday } from "date-fns"
import Cookies from "js-cookie"

async function checkRoutine() {
  console.log("Checking routine...")
  const routineCookie = Number.parseInt(Cookies.get("routine")!)
  if (!!routineCookie && isToday(routineCookie)) return

  console.log("Updating habits...")
  const userId = "clj3ankex0000uywne7pn1a3s"
  const response = await fetch(`/api/habit?userId=${userId}`)
  const habits = await response.json()

  for (const index in habits) {
    const habit = habits[index]
    const response = await fetch(`/api/habit/${habit.id}`, {
      method: "POST",
    })
    console.log(`${habit.id} >> ${response.status}`)
  }

  Cookies.set("routine", Date.now().toString())
}

export function HabitWatcher() {
  useEffect(() => {
    checkRoutine()
  }, [])

  return null
}
