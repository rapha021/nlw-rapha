import Fastify from "fastify"
import { PrismaClient } from "@prisma/client"
import cors from "@fastify/cors"

const prisma = new PrismaClient({
  log: ["query"],
})

const bootstrap = async () => {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count()

    return { count }
  })

  await fastify.listen({ port: 3000 })
}

bootstrap()
