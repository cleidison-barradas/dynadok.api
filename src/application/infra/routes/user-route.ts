import { Router } from "express";
import { adapterRoute } from "@/adapters";

import {
  CreateUserController,
  DeleteUserController,
  FindUserByIdController,
  ListUsersController,
  UpdateController,
} from "@/application/controllers";

const router = Router();

router.post("/", adapterRoute(new CreateUserController()));
router.get("/", adapterRoute(new ListUsersController()));
router.put("/:id", adapterRoute(new UpdateController()));
router.delete("/:id", adapterRoute(new DeleteUserController()));
router.get("/:id", adapterRoute(new FindUserByIdController()));

export default router;
