import { Milestone } from "src/entities/Milestone";
import { uuidGenerator } from "src/lib/uuidGenerator";

export const data: Milestone[] = [
  {
    id: uuidGenerator(),
    name: "Milestone 1",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isCompleted: false,
  },
  {
    id: uuidGenerator(),
    name: "Milestone 2",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isCompleted: false,
  },
  {
    id: uuidGenerator(),
    name: "Milestone 3",
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isCompleted: false,
  },
];
