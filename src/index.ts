/*
 * @format
 */
/* tslint:disable: no-console */

import "reflect-metadata";
import http from "http";
import app from "src/routes/app";
import "src/lib/loadEnv";

// Normalize a port into a number, string, or false.
const { PORT } = process.env;
const normalizePort = (val: string): string | number | boolean => {
  const portNo = parseInt(val, 10);
  if (isNaN(portNo)) {
    // named pipe
    return val;
  }
  if (portNo >= 0) {
    // port number
    return portNo;
  }
  return false;
};

/**
 * Listen on provided port, on all network interfaces.
 */

// Get port from environment and store in Express.
const port = normalizePort(PORT || "3000");
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);
server.listen(port);

server.on("error", (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.info("Listening on " + bind);
});
