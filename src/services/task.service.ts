import { Task } from "src/entities/Task";
import { uuidGenerator } from "src/lib/uuidGenerator";

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
