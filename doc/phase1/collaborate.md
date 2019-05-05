# Collaborate

## Team's Competencies and Constraints

### Anson

- Experience with React.
- PEY experience in SQL databases
- On campus Mon, Wed, Fri 10 am–5 pm. Otherwise always available on Slack.

### David

- Experience with Angular, TypeScript and NodeJS.
- On campus most days 10 am–4 pm. Otherwise always available on Slack.

### Kamal

- Experience with Angular and JavaScript.
- PEY Experience in back-end development.

### Lukas

- Experience with React
- PEY experience in front-end development

### Max

- New to web development.
- Experience with HTML, CSS, JavaScript.
- Live on campus. Always available on Slack.

### Nasir

- Experience with Angular, NodeJS and Dotnet.

## Meetings So Far

### Feb 11th – In-Class – Everyone

- Decided technologies to use.
- Decided on roles.
- Decided on Trello for issues managing.
- Decided on Gitflow for Github workflow.

### Feb 15th – In-Class – Everyone

- Reviewed assignment requirements.
- Decided scope.
- Discussed web app split.
- Decided on MongoDB.
- Created and assigned Trello tasks.

### Feb 27th – In-Class – Everyone

- Sum up P1 and project setup.
- Decide on testing and CI.

### Frequent Communication On Slack – Everyone

We frequently communicated on Slack to keep each other up to date on our plans,
what people were doing, to ask for advice and plan architecture.

## Communication Strategy

### Messaging

We plan to frequently use Slack for messaging and communication.
It will be used for individual messaging, group messages, questions,
scrum updates, and online voice chat.

### Planned Meetings

We will meet on Mondays and Fridays between 4-5pm in WB130.
While it is recommended for everyone to join,
if a team member is unable to make a meeting due to other commitments
(assignments, tests, etc.),
they may simply message the group on Slack
and provide any updates they feel are relevant.
Additional meetings may be scheduled as required, and will be planned through Slack.

### Shared Documents

We will use a shared Google Drive Folder for documents and artifacts
as all group members are familiar and comfortable using this service.
Google Docs provides the convenience for all members to
view and edit changes live from any browser.
When our documents are completed,
they will be converted to Markdown and pushed to our Github repository.

We will also use the Wiki on our GitHub repository to store some information,
such as development tips and guides specific to our use case.

## Software Development Strategy

We will use an Agile approach using Trello to
track task creation, assignment, and completion.

## Work Division Strategy

### Roles

We have divided the work between individuals with general roles
of front-end, full-stack, and back-end.
Specifics on endpoints, front-end pages, routing, etc…
will be decided and assigned during meeting and tracked using Trello.

- Front-end: Lukas and Anson.
- Back End: Nasir and Max.
- Full-stack: Kamal and David.
- Testing: Anson.
- CI: Anson.

## GitHub Strategy

We will be using GitHub to track code changes,
following the [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
GitHub workflow strategy.

We will have three levels of branches in our repository:

- `master` branch for reviewed and tested code, stable.
- `dev` branch for merging features, testing they work as intended, and regression testing.
- `feature/*` branches for implementing new features.

Individuals will be allowed to push to the feature branch they are working on,
but directing pushing to the `dev` and `master` branches will not be allowed.
When a feature is completed,
the developer working on it will
create a pull request from their `feature/*` branch to the `dev` branch,
and approval from one other developer is required before they can merge.
Similarly, merging to `master` will require an approved pull request from `dev` to `master`.

## Progress Tracking

We will use the Kanban boards on Trello for task creation, assignment and progress tracking.

Tasks are sorted into four columns on the Kanban board:

- Backlog: tasks that should be completed but not necessarily for the current phase.
- Next: tasks that should be completed by the end of the current phase, before the deadline.
- In Progress: tasks that someone has started working on.
- Staged: tasks that have been completed and are awaiting approval.
- Approved: tasks that have been completed and approved.
- Production: tasks that have been completed, approved and pushed into the `master` branch.
