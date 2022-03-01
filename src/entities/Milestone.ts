/*
 * @format
 */
import { Base } from "src/entities";
import { Task } from "./Task";

export class Milestone extends Base {
  name: string;
  isCompleted: boolean;
  tasks: Task[];
}
