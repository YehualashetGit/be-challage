/*
 * @format
 */
import path from "path";
import { config } from "dotenv";

config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV || "local"}`),
});
