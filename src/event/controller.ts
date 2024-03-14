import { Request, Response } from "express";
import {
  createEventService,
  deleteEventService,
  getEventByIdService,
  getEventsService,
  registerEventService,
  updateEventService,
} from "./service";

const getEventCtrl = async (req: Request, res: Response) => {
  const getEvents = await getEventsService(req);
  if (getEvents?.events) {
    return res.status(getEvents.status).json(getEvents.events);
  }
  return res.status(getEvents.status).json(getEvents.message);
};

const getEventByIdCtrl = async (req: Request, res: Response) => {
  const getEvents = await getEventByIdService(req);
  if (getEvents?.event) {
    return res.status(getEvents.status).json(getEvents.event);
  }
  return res.status(getEvents.status).json(getEvents.message);
};

const createEventCtrl = async (req: Request, res: Response) => {
  const createdEvent = await createEventService(req);
  return res.status(createdEvent.status).json(createdEvent.message);
};

const updateEventCtrl = async (req: Request, res: Response) => {
  const updateEvent = await updateEventService(req);
  return res.status(updateEvent.status).json(updateEvent.message);
};

const registerEventCtrl = async (req: Request, res: Response) => {
  const registerEvent = await registerEventService(req);
  return res.status(registerEvent.status).json(registerEvent.message);
};

const deleteEventCtrl = async (req: Request, res: Response) => {
  const deleteEvent = await deleteEventService(req);
  return res.status(deleteEvent.status).json(deleteEvent.message);
};
export {
  getEventCtrl,
  getEventByIdCtrl,
  createEventCtrl,
  updateEventCtrl,
  registerEventCtrl,
  deleteEventCtrl,
};
