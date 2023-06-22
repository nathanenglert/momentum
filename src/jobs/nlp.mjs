import { PrismaClient } from "@prisma/client"
import nlp from "compromise/three"

const prisma = new PrismaClient()

async function main() {
  console.log(``)

  const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } })

  let count = 0
  for (let i in tasks) {
    const task = tasks[i]
    console.log(`Processing: ${task.title}`)

    const doc = nlp(task.title)
    console.log(`Nouns: [${doc.nouns().out("array")}]`)
    console.log(`Verbs: [${doc.verbs().out("array")}]`)
    console.log(``)

    count++
    if (count == 3) return
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
