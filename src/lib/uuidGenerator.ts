import { v4 as uuid } from "uuid";

export function uuidGenerator(): string {
  return uuid();
}
