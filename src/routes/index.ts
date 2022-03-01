/*
 * @format
 */

import { Router } from "express";
import Task from "src/routes/task";
import Milestone from "src/routes/milestone";
const routes = Router();

routes.use("/task", Task);
routes.use("/milestone", Milestone);
export default routes;
