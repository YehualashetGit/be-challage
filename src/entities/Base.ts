/*
 * @format
 */
import { v4 as uuid } from "uuid";
export type UUID = typeof uuid;

export abstract class Base {
  id: UUID;
  createdAt: Date;
  updatedAt: Date;
}
