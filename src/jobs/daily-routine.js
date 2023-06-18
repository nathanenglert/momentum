;(async () => {
  const baseUrl = "http://localhost:3000"
  const userId = "cliypz5go0000uylmgnvklzbv"
  const response = await fetch(`${baseUrl}/api/habit?userId=${userId}`)
  const habits = await response.json()

  for (const index in habits) {
    const habit = habits[index]
    await fetch(`${baseUrl}/api/habit/${habit.id}`, { method: "POST" })
  }
})()
