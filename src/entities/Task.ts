/*
 * @format
 */
import { Base } from "src/entities";

export class Task extends Base {
  name: string;
  isDone: boolean;
  milestoneId: string;
}
