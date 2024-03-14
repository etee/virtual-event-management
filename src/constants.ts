//HTTP codes
export const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const USER_ROLE_ORGANIZER = 'organizer';
export const USER_ROLE_MODERATOR = 'moderator';
export const USER_ROLE_SPEAKER = 'speaker';

//Error messages
export const ERR_MALFORMED_REQUEST = "Bad request";
export const ERR_EXISTING_USER =
  "User already exists, register with different email id!";
export const ERR_INTERNAL_SERVER_ERROR = "Internal server error";
export const ERR_UNREGISTERED_USER =
  " User not found, please register yourself first!";
export const ERR_INVALID_PASSWORD = "Invalid password!";
export const ERR_MISSING_AUTH_HEADER = "Authorization header not found";
export const ERR_TOKEN_VERIFICATION =
  "Authorization header verification failed";
export const ERR_EVENT_NOT_FOUND = "Event not found";
export const ERR_UNAUTHORIZED_EVENT_CREATION =
  "You are not authorized to create an event";
export const ERR_UNAUTHORIZED_EVENT_UPDATE =
  "You are not authorized to update an event";
export const ERR_EVENT_STARTED = "You can not register for this event, as it has already started";
export const ERR_USER_ALREADY_REGISTERED_FOR_EVENT = "You are already registered for this event";
export const ERR_EVENT_CAPACITY_FULL = "Sorry for inconvenience, maximum capacity of the event is reached.";
export const ERR_UNAUTHORIZED_EVENT_DELETE = "You are not authorized to delete this event";

//Success messages
export const SUCCESSFUL_REGISTRATION = "User created successfully!";
export const SUCCESSFUL_LOGIN = "User logged in successfully!";
export const SUCCESSFUL_EVENT_CREATION = "Event created successfully!";
export const SUCCESSFUL_EVENT_RETRIEVAL = "Events retrieved successfully!";
export const SUCCESSFUL_EVENT_UPDATE = "Event updated successfully!";
export const SUCCESSFUL_EVENT_REGISTRATION = "Registered for event successfully!";
export const SUCCESSFUL_EVENT_DELETE = "Event deleted successfully!";