import { parseArgs } from "node:util"
import { PrismaClient } from "@prisma/client"
import { add } from "date-fns"

const prisma = new PrismaClient()
const options = {
  environment: { type: "string" },
}

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options })

  switch (environment) {
    case "development":
      break
    case "production":
      break
    default:
      break
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
