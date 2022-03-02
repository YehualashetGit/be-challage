import express, { Request, Response } from "express";
import { MilestoneService } from "src/services";

export class MilestoneRouter {
  public router: express.Router;

  constructor(private readonly milestoneService: MilestoneService) {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getOne);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
    this.router.get("/:id/tasks", this.getTasks);
    this.router.post("/:id/addTask", this.addNewTask);
    this.router.post("/:id/done", this.markAsDone);
    this.router.post("/:id/undone", this.markAsUndone);
    this.router.get("/:id/getTaskById", this.getTaskById);
    this.router.post("/:id/removeTask", this.removeTask);
    this.router.get("/:id/getCompletedTask", this.getCompletedTask);
    this.router.get("/:id/getUncompletedTask", this.getUncompletedTask);
    this.router.get("/:id/getCompletedTasksCount", this.getCompletedTasksCount);
    this.router.get(
      "/:id/getUncompletedTasksCount",
      this.getUncompletedTasksCount
    );
    this.router.get(
      "/:id/getCompletedTasksPercentage",
      this.getCompletedTasksPercentage
    );
    this.router.get(
      "/:id/getUncompletedTasksPercentage",
      this.getUncompletedTasksPercentage
    );
  }

  public getAll = async (req: Request, res: Response) => {
    try {
      const milestones = await this.milestoneService.getAll();
      res.status(200).json(milestones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getOne = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.getById(req.params.id);
      res.status(200).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.create(req.body);
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public addNewTask = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.addTask(
        req.params.id,
        req.body.taskName
      );
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public markAsDone = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.completeTask(
        req.params.id,
        req.body.taskId
      );
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public markAsUndone = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.uncompleteTask(
        req.params.id,
        req.body.taskId
      );
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getCompletedTask = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.getCompletedTasks(
        req.params.id
      );
      res.status(200).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUncompletedTask = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.getUncompletedTasks(
        req.params.id
      );
      res.status(200).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getCompletedTasksCount = async (req: Request, res: Response) => {
    try {
      const count = await this.milestoneService.getCompletedTasksCount(
        req.params.id
      );
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUncompletedTasksCount = async (req: Request, res: Response) => {
    try {
      const count = await this.milestoneService.getUncompletedTasksCount(
        req.params.id
      );
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getCompletedTasksPercentage = async (req: Request, res: Response) => {
    try {
      const percentage =
        await this.milestoneService.getCompletedTasksPercentage(req.params.id);
      res.status(200).json({ percentage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getUncompletedTasksPercentage = async (
    req: Request,
    res: Response
  ) => {
    try {
      const percentage =
        await this.milestoneService.getUncompletedTasksPercentage(
          req.params.id
        );
      res.status(200).json({ percentage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.milestoneService.getTasks(req.params.id);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getTaskById = async (req: Request, res: Response) => {
    try {
      const task = await this.milestoneService.getTaskById(
        req.params.id,
        req.body.taskId
      );
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public removeTask = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.removeTask(
        req.params.id,
        req.body.taskId
      );
      res.status(201).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  public update = async (req: Request, res: Response) => {
    try {
      const milestone = await this.milestoneService.update(
        req.params.id,
        req.body
      );
      res.status(200).json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      await this.milestoneService.delete(req.params.id);
      res.status(200).json({ message: "Milestone deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
