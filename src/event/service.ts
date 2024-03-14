import uniqid from "uniqid";
import { readFromDatabase, writeToDatabase } from "../utils/file-transactions";
import * as Constants from "../constants";
import sendRegistrationEmail from "../config/nodemailer.config";
const jwt = require("jsonwebtoken");

const createEventService = async (request: any) => {
  if (request.user && request.user.role === Constants.USER_ROLE_ORGANIZER) {
    const id = uniqid();
    const event = { ...request.body, id, participants: [] };
    const dataFromDB = await readFromDatabase();
    dataFromDB.events = dataFromDB.events || [];
    dataFromDB.events.push(event);
    try {
      await writeToDatabase(dataFromDB);
      return {
        status: Constants.HTTP_CODES.CREATED,
        message: Constants.SUCCESSFUL_EVENT_CREATION,
      };
    } catch {
      return {
        status: Constants.HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: Constants.ERR_INTERNAL_SERVER_ERROR,
      };
    }
  } else {
    return {
      status: Constants.HTTP_CODES.FORBIDDEN,
      message: Constants.ERR_UNAUTHORIZED_EVENT_CREATION,
    };
  }
};

const getEventsService = async (request: any) => {
  try {
    const dataFromDB = await readFromDatabase();
    if (dataFromDB.events.length === 0) {
      return {
        status: Constants.HTTP_CODES.NO_CONTENT,
        message: Constants.SUCCESSFUL_EVENT_RETRIEVAL,
        events: [],
      };
    }
    return {
      status: Constants.HTTP_CODES.OK,
      message: Constants.SUCCESSFUL_EVENT_RETRIEVAL,
      events: dataFromDB.events,
    };
  } catch {
    return {
      status: Constants.HTTP_CODES.INTERNAL_SERVER_ERROR,
      message: Constants.ERR_INTERNAL_SERVER_ERROR,
    };
  }
};

const updateEventService = async (request: any) => {
  if (
    request.user &&
    (request.user.role === Constants.USER_ROLE_ORGANIZER ||
      request.user.role === Constants.USER_ROLE_MODERATOR)
  ) {
    try {
      const dataFromDB = await readFromDatabase();
      const eventIndex = dataFromDB.events.findIndex(
        (event) => event.id === request.params.id
      );
      if (eventIndex === -1) {
        return {
          status: Constants.HTTP_CODES.NOT_FOUND,
          message: Constants.ERR_EVENT_NOT_FOUND,
        };
      }
      dataFromDB.events[eventIndex] = {
        ...dataFromDB.events[eventIndex],
        ...request.body.eventData,
      };
      await writeToDatabase(dataFromDB);
      return {
        status: Constants.HTTP_CODES.OK,
        message: Constants.SUCCESSFUL_EVENT_UPDATE,
      };
    } catch {
      return {
        status: Constants.HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: Constants.ERR_INTERNAL_SERVER_ERROR,
      };
    }
  } else {
    return {
      status: Constants.HTTP_CODES.FORBIDDEN,
      message: Constants.ERR_UNAUTHORIZED_EVENT_UPDATE,
    };
  }
};

const registerEventService = async (request: any) => {
  const dataFromDB = await readFromDatabase();
  const eventIndex = dataFromDB.events.findIndex(
    (event) => event.id === request.params.id
  );
  if (eventIndex === -1) {
    return {
      status: Constants.HTTP_CODES.NOT_FOUND,
      message: Constants.ERR_EVENT_NOT_FOUND,
    };
  }
  dataFromDB.events[eventIndex]["participants"] =
    dataFromDB.events[eventIndex]["participants"] || [];
  const eventStartTime = new Date(
    dataFromDB.events[eventIndex].dateTime
  ).getTime();
  const currentDateTime = new Date().getTime();
  if (eventStartTime < currentDateTime) {
    return {
      status: Constants.HTTP_CODES.BAD_REQUEST,
      message: Constants.ERR_EVENT_STARTED,
    };
  }
  const registeredParticipant = dataFromDB.events[
    eventIndex
  ]?.participants.findIndex(
    (participant) => participant.email === request.user.email
  );
  if (registeredParticipant !== -1) {
    return {
      status: Constants.HTTP_CODES.FORBIDDEN,
      message: Constants.ERR_USER_ALREADY_REGISTERED_FOR_EVENT,
    };
  }
  if (
    dataFromDB.events[eventIndex].capacity ===
    dataFromDB.events[eventIndex].participants.length
  ) {
    return {
      status: Constants.HTTP_CODES.BAD_REQUEST,
      message: Constants.ERR_EVENT_CAPACITY_FULL,
    };
  }
  const { id, email, fullName } = request.user;

  dataFromDB.events[eventIndex].participants.push({ id, email, fullName });

  await writeToDatabase(dataFromDB);
  sendRegistrationEmail({
    email,
    fullName,
    eventName: dataFromDB.events[eventIndex].name,
    eventDateTime: dataFromDB.events[eventIndex].dateTime,
    eventLink: dataFromDB.events[eventIndex].link,
  });
  return {
    status: Constants.HTTP_CODES.OK,
    message: Constants.SUCCESSFUL_EVENT_REGISTRATION,
  };
};

const getEventByIdService = async (request: any) => {
  const dataFromDB = await readFromDatabase();
  const eventIndex = dataFromDB.events.findIndex(
    (event) => event.id === request.params.id
  );
  if (eventIndex === -1) {
    return {
      status: Constants.HTTP_CODES.NOT_FOUND,
      message: Constants.ERR_EVENT_NOT_FOUND,
    };
  }
  return {
    status: Constants.HTTP_CODES.OK,
    message: Constants.SUCCESSFUL_EVENT_RETRIEVAL,
    event: dataFromDB.events[eventIndex],
  };
};

const deleteEventService = async (request: any) => {
  if (request.user && request.user.role === Constants.USER_ROLE_ORGANIZER) {
    try {
      const dataFromDB = await readFromDatabase();
      const eventIndex = dataFromDB.events.findIndex(
        (event) => event.id === request.params.id
      );
      if (eventIndex === -1) {
        return {
          status: Constants.HTTP_CODES.NOT_FOUND,
          message: Constants.ERR_EVENT_NOT_FOUND,
        };
      }
      dataFromDB.events.splice(eventIndex, 1);
      await writeToDatabase(dataFromDB);
      return {
        status: Constants.HTTP_CODES.NO_CONTENT,
        message: Constants.SUCCESSFUL_EVENT_DELETE,
      };
    } catch {
      return {
        status: Constants.HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: Constants.ERR_INTERNAL_SERVER_ERROR,
      };
    }
  } else {
    return {
      status: Constants.HTTP_CODES.FORBIDDEN,
      message: Constants.ERR_UNAUTHORIZED_EVENT_DELETE,
    };
  }
};

export {
  createEventService,
  getEventsService,
  getEventByIdService,
  updateEventService,
  registerEventService,
  deleteEventService,
};
