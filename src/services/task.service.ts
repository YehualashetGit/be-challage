import { Task } from "../entities/Task";
import { uuidGenerator } from "../lib/uuidGenerator";

export class TaskService {
  async create(task: Task): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: uuidGenerator(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newTask;
  }
}
