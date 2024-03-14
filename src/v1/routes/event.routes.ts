import express from "express";
import {
  createEventCtrl,
  getEventByIdCtrl,
  getEventCtrl,
  registerEventCtrl,
  updateEventCtrl,
  deleteEventCtrl
} from "../../event/controller";
import { eventCreationValidator } from "../../middlewares/validator";
import { verificationToken } from "../../middlewares/auth";

const eventRouter = express.Router();
eventRouter.use(express.json());

eventRouter.get("/", verificationToken, getEventCtrl);
eventRouter.get("/:id", verificationToken, getEventByIdCtrl);
eventRouter.post("/", [eventCreationValidator, verificationToken], createEventCtrl);
eventRouter.put("/:id", verificationToken, updateEventCtrl);
eventRouter.post("/:id/register", verificationToken, registerEventCtrl);
eventRouter.delete("/:id", verificationToken, deleteEventCtrl);

export default eventRouter;
