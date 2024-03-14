# Virtual Event Management

### A backend system for a virtual event management platform focusing on user registration, event scheduling, and participant management, all managed through in-memory data structures. The system will feature secure user authentication, allowing users to register and log in using bcrypt for password hashing and JWT for session management. Event management capabilities such as creation, update, and deletion is only accessible to an authorized user. Nodemailer is used for sending email on successful event registration. 

## Technologies Used

- NodeJS
- Typescript
- Express.js
- npm packages

## Endpoints

- `POST /api/v1/register`: Register a new user.
- `POST /api/v1/login`: Log in a user.
- `GET /api/v1/events`: Fetches list of events.
- `GET /api/v1/events/:id`: Fetches a single event.
- `POST /api/v1/events`: Create a new event.
- `PUT /api/v1/events/:id`: Update an event.
- `DELETE /api/v1/events/:id`: Delete an events.
- `POST /api/events/:id/register`: Event registration, send email on successful registration.

## Setup Instructions

1. Clone the repository git clone <repository-url> (repository-url: https://github.com/etee/virtual-event-management.git)
2. Create a .env folder at the root of the directory, by replicating the content of .env.example
3. Navigate to project directory `cd <project-directory>`
4. Execute this command in a terminal/command-prompt `docker build . -t <project-directory>:v1`
5. docker `run -d -p <dokcer-port>:<project-port> <project-directory>:v1` (Eg: `docker run -d -p 127.0.0.1:8080:3000 virtual-event-management:v1`)
6. Make all the api calls on port `https://localhost:8080`

> [!NOTE]
>  Nodemailer uses gmail service, if you are using 2FA add `Your App Password` in the provided `EMAIL_PASS`, follow this guide for more help https://help.warmupinbox.com/en/articles/4934806-configure-for-google-workplace-with-two-factor-authentication-2fa.

