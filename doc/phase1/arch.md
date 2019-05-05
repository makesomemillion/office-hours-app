# Architecture

## Client Web Applications

We will be using Angular to build our web apps.
To break up the system we will split the project into three web apps:

1. **Login web app.**
   - Logs in user and directs them to either the instructor or student web app.
   - Allows users to sign up.
2. **Instructor web app.**
   - Instructors can view, create, edit and delete courses, course offerings and sections.
   - Instructors can view, create, edit and delete office hour blocks and meetings.
   - Instructors can view, create, edit and delete notes on meetings, and their own comments on meetings.
3. **Student web app.**
   - Students can view the courses, course offerings and sections that they are enrolled in.
   - Students can view office hour blocks for the sections they are enrolled in.
   - Students can book meetings within office hour blocks at available slots.
   - Students can view, edit and delete meetings they created.
   - Students can view, create, edit and delete comments on meetings they are involved in.

As these are all Angular web apps, they will be using **TypeScript** as the primary language.

The Angular apps will be organized in the following way:

- The login web app will be the primary application.
- The instructor and student web apps will be lazy-loaded modules within the login web app,
  that will be loaded and routed to as necessary.

Communication from the Angular web apps to the HTTP REST API will be done
using Angular's built-in [`HttpClient`](https://angular.io/guide/http).

To facilitate good AI design, our Angular web apps will be making use of
the [Angular Material component framework](https://material.angular.io/) and
the [Foundation front-end framework](https://foundation.zurb.com/).

Since the project will be separated into multiple web apps
they will each have their own app specific code.
However to follow the DRY principle and for better maintainability
we will want to share code between our three Angular client apps,
and also, separately, between our three NodeJS servers.
We will do this by placing the shared code in a shared code folder,
accessible by both apps/servers.

## Back-End Servers

Our client web applications will communicate with the following three back-end servers:

1. **Login server.**
   - Handles user log in, sign up and authentication.
2. **University server.**
   - Handles data endpoints (HTTP REST API) related to the overall university:
     students, instructors, courses, sections, etc.
3. **Office hours server.**
   - Handles data endpoints (HTTP REST API) specifically related to the office hours system:
     office hour blocks, booked meetings, comments, notes, etc.

All our servers will use **TypeScript** as the primary language.

Our HTTP REST API servers will be **NodeJS servers** that use **Express** for handling API calls.

For the REST API calls, a **MongoDB database**, hosted on **[mLab](https://mlab.com/)**, will be queried (through **Mongoose**).