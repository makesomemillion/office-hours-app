# API

## OpenAPI File

The API is written in this [OpenAPI YAML file](https://github.com/csc302-spring-2019/proj-Book-Me/blob/develop/spec/api.yaml) and can be viewed via the [Swagger UI](https://petstore.swagger.io/).
To view the file in the Swagger UI, please open the YAML file on GitHub, click on "Raw", copy that URL, and then paste it into the Swagger UI.

## General Overview

Our application's front-end and back-ends will communicate via an HTTP REST API.
There will be two back-end servers that will serve HTTP endpoints.
`server-university` will deal with the people (instructors, teaching assistants and students), courses,
course offerings and course offering sections.
`server-office-hours` will deal with office hour blocks, booked meetings, comments and notes.

## Matching Use Case Requirements

The list below shows which API endpoints match the requirements of the use cases that are in our scope.
Note that the numbering matches the numbering of the use cases.

### Instructor Use Cases

- #2. **Creating courses.**
     `POST /courses`, `POST /offerings` and `POST /sections`.
- #3. **Creating office hour blocks.**
     `POST /blocks`.
- #4. **Deleting office hour blocks.**
     `DELETE /block/{blockId}`.
- #5. **Manage booked meetings.**
     `PATCH /meetings/{meetingId}`, `DELETE /meetings/{meetingId}`.
- #6. **Create, delete, edit meeting comments.**
     `POST /meetings/{meetingId}/comments`, `DELETE /meetings/{meetingId}/comments/{commentId}`
     and `PATCH /meetings/{meetingId}/comments/{commentId}`.
- #7. **Create, delete, edit meeting notes.**
     `POST /meetings/{meetingId}/notes`, `DELETE /meetings/{meetingId}/notes/{noteId}`
     and `PATCH /meetings/{meetingId}/notes/{noteId}`.
- #8. **Manage notes.**
    `POST /meetings/{meetingId}/notes/{noteId}`, `GET /meetings/{meetingId}/comments`,
    `GET /notes?filter=X&student=X`,
    `DELETE /meetings/{meetingId}/notes/{noteId}` and `PATCH /meetings/{meetingId}/notes/{noteId}`.
- #9. **Manage comments.**
    `POST /meetings/{meetingId}/comments/{commentId}`, `GET /comments?filter=X&student=X`,
    `DELETE /meetings/{meetingId}/comments/{commentId}` and `PATCH /meetings/{meetingId}/comments/{commentId}`.

### Student Use Cases

- #12. **Book meeting.**
      `POST /meetings`.
- #13. **Cancel booked meeting.**
      `PATCH /meetings/{meetingId}` (edit the `isCancelled` property).
- #14. **Edit booked meeting.**
      `PATCH /meetings/{meetingId}`.
- #17. **Manage comments.**
      `POST /meetings/{meetingId}/comments/{commentId}`, `GET /meetings/{meetingId}/comments`,
      `DELETE /meetings/{meetingId}/comments/{commentId}` and `PATCH /meetings/{meetingId}/comments/{commentId}`.