/*
 * @format
 */
import { Base, UUID } from "src/entities";

export class Task extends Base {
  name: string;
  isDone: boolean;
  milestoneId: UUID;
}
