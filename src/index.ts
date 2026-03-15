import { config } from "dotenv";

config();

import { prisma } from "./db/db";
import { server } from "./server";

const PORT = process.env.PORT || 4000;

// Server Listening
const httpServer = server.listen(PORT, () => {
  console.log(`Server is running at port - ${PORT}`);
});

// Graceful Shutdown
async function shutdown() {
  console.log("Graceful shutdown...");

  httpServer.close(async () => {
    console.log("HTTP server closed");

    await prisma.$disconnect();

    console.log("DB disconnected");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
