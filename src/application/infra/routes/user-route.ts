import { Router } from "express";
import { adapterRoute } from "@/adapters";

import {
  CreateUserController,
  DeleteUserController,
  FindUserByIdController,
  ListUsersController,
  UpdateController,
} from "@/application/controllers";
import { redisConfig } from "@/config/redis-config";
import { RedisCache } from "../cache";

const router = Router();

const cacheService = new RedisCache(redisConfig);

router.post("/", adapterRoute(new CreateUserController(cacheService)));
router.get("/", adapterRoute(new ListUsersController(cacheService)));
router.put("/:id", adapterRoute(new UpdateController(cacheService)));
router.delete("/:id", adapterRoute(new DeleteUserController(cacheService)));
router.get("/:id", adapterRoute(new FindUserByIdController(cacheService)));

export default router;
