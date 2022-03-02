import { Milestone } from "../entities/Milestone";
import { Task } from "../entities/Task";
import { uuidGenerator } from "../lib/uuidGenerator";
import { data } from "../db/data";
import { TaskService } from "./task.service";

interface IUpdateMilestone {
  name: string;
}
export class MilestoneService {
  constructor(private taskService: TaskService) {}

  async getAll(): Promise<Milestone[]> {
    return data;
  }

  async getById(id: string): Promise<Milestone> {
    try {
      const result: Milestone = data.find((m: Milestone) => m.id === id);
      return result ?? null;
    } catch (e) {
      throw new Error(`Milestone with id ${id} not found`);
    }
  }

  async create(milestone: Milestone): Promise<Milestone> {
    const newMilestone: Milestone = {
      ...milestone,
      isCompleted: false,
      id: uuidGenerator(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    data.push(newMilestone);
    return newMilestone;
  }

  async update(
    id: string,
    updateMilestone: IUpdateMilestone
  ): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone = data.find((m: Milestone) => m.id === id);
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    const { name } = updateMilestone;
    const updatedMilestone = {
      ...milestone,
      name,
      updatedAt: new Date(),
    };
    data[index] = updatedMilestone;
    return data[index];
  }

  async delete(id: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    const deleted: Milestone = data[index];
    data.splice(index, 1);
    return deleted;
  }

  async complete(id: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (milestone.isCompleted) {
      throw new Error(`You have already completed this milestone`);
    }
    data[index].isCompleted = true;
    return data[index];
  }

  async uncomplete(id: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    data[index].isCompleted = false;
    return data[index];
  }

  async addTask(id: string, taskName: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    const milestoneIndex = data.findIndex((m: Milestone) => m.id === id);
    if (milestoneIndex === -1) {
      throw new Error(`Milestone with id ${id} not found`);
    }
    if (milestone.isCompleted) {
      throw new Error(`You have already completed this milestone`);
    }
    if (milestoneIndex !== 0) {
      const previousMilestone: Milestone = data[milestoneIndex - 1];
      if (!previousMilestone.isCompleted) {
        throw new Error(`You have to complete previous milestone`);
      }
    }

    const task = await this.taskService.create({
      name: taskName,
      isDone: false,
      milestoneId: id,
    });
    data[index].tasks.push(task);
    return data[index];
  }

  async removeTask(id: string, taskId: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    if (milestone.isCompleted) {
      throw new Error(`You have already completed this milestone`);
    }

    const taskIndex: number = data[index].tasks.findIndex(
      (t: Task) => t.id === taskId
    );
    data[index].tasks.splice(taskIndex, 1);
    return data[index];
  }

  async completeTask(id: string, taskId: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    const taskIndex: number = milestone.tasks.findIndex(
      (t: Task) => t.id === taskId
    );
    if (taskIndex === -1) {
      throw new Error("Task Not Found");
    }
    milestone.tasks[taskIndex].isDone = true;
    if (milestone.tasks.every((t: Task) => t.isDone)) {
      milestone.isCompleted = true;
    }
    return milestone;
  }

  async uncompleteTask(id: string, taskId: string): Promise<Milestone> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    if (milestone.isCompleted) {
      throw new Error(`You have already completed this milestone`);
    }
    const taskIndex: number = data[index].tasks.findIndex(
      (t: Task) => t.id === taskId
    );
    if (taskIndex === -1) {
      throw new Error("Task Not Found");
    }
    milestone.tasks[taskIndex].isDone = false;
    milestone.isCompleted = false;
    return milestone;
  }

  async getTasks(id: string): Promise<Task[]> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    return milestone.tasks;
  }

  async getTaskById(id: string, taskId: string): Promise<Task> {
    const milestone: Milestone = await this.getById(id);
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    const taskIndex: number = milestone.tasks.findIndex(
      (t: Task) => t.id === taskId
    );
    return milestone.tasks[taskIndex];
  }

  async getCompletedTasks(id: string): Promise<Task[]> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    return milestone.tasks.filter((t: Task) => t.isDone);
  }

  async getUncompletedTasks(id: string): Promise<Task[]> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    return milestone.tasks.filter((t: Task) => !t.isDone);
  }

  async getCompletedTasksCount(id: string): Promise<number> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    return milestone.tasks.filter((t: Task) => t.isDone).length;
  }

  async getUncompletedTasksCount(id: string): Promise<number> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    return milestone.tasks.filter((t: Task) => !t.isDone).length;
  }

  async getCompletedTasksPercentage(id: string): Promise<number> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    const completedTasks: number = milestone.tasks.filter(
      (t: Task) => t.isDone
    ).length;
    const uncompletedTasks: number = milestone.tasks.filter(
      (t: Task) => !t.isDone
    ).length;
    return (completedTasks / (completedTasks + uncompletedTasks)) * 100;
  }

  async getUncompletedTasksPercentage(id: string): Promise<number> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    const completedTasks: number = milestone.tasks.filter(
      (t: Task) => t.isDone
    ).length;
    const uncompletedTasks: number = milestone.tasks.filter(
      (t: Task) => !t.isDone
    ).length;
    return (uncompletedTasks / (completedTasks + uncompletedTasks)) * 100;
  }

  async getTasksCount(id: string): Promise<number> {
    const index: number = data.findIndex((m: Milestone) => m.id === id);
    const milestone: Milestone = data[index];
    if (!milestone) {
      throw new Error("Milestone Not Found");
    }
    return data[index].tasks.length;
  }
}
