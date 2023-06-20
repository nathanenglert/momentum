;(async () => {
  const baseUrl = "http://localhost:3000"
  const userId = "clj3ankex0000uywne7pn1a3s"
  const response = await fetch(`${baseUrl}/api/habit?userId=${userId}`)
  const habits = await response.json()

  for (const index in habits) {
    const habit = habits[index]
    const response = await fetch(`${baseUrl}/api/habit/${habit.id}`, {
      method: "POST",
    })
    console.log(`${habit.id} >> ${response.status}`)
  }
})()
