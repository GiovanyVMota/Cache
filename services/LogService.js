import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class LogService {
  constructor() {
    // Inicialização, se necessário
  }

  log(message) {
    // Implemente o que for necessário para registrar logs
    console.log(message);
  }

  async create({ method, route, timestamp }) {
    await prisma.log.create({
      data: { method, route, timestamp },
    });
  }
}
