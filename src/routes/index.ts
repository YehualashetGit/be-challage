/*
 * @format
 */

import { Router } from "express";
import { MilestoneService } from "src/services";
import { TaskService } from "src/services/task.service";
import { MilestoneRouter } from "./milestone";

const taskService = new TaskService();
const milestoneService = new MilestoneService(taskService);
const milestoneRoute = new MilestoneRouter(milestoneService);

const routes = Router();

routes.use("/milestone", milestoneRoute.router);
export default routes;
