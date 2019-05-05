# Book-Me Office Hours System: Phase 2 Product Report

## Design

### User Interface

Our application makes use of the [**Angular Material component library**](https://material.angular.io/),
which (for the most part) follows the [**Material Design** guidelines](https://material.io/design/).
We decided to use this library as it has a [good library of functional components](https://material.angular.io/components/categories),
and to help us have a unified user interface design across our application.

### Technical

#### Major Components

Our backend is split into two parts:

- [**server-university**](https://github.com/csc302-spring-2019/proj-Book-Me/tree/master/servers/server-university)
  handles all endpoints related to people involved in the system,
  and the courses, course offerings and course sections.
- [**server-office-hours**](https://github.com/csc302-spring-2019/proj-Book-Me/tree/master/servers/server-office-hours)
  handles all endpoints related to the actual office hours system,
  which includes the office hour blocks, meetings, comments and notes.

Our frontend is also split into two Angular lazy-loaded modules:

- The [**instructor** module](https://github.com/csc302-spring-2019/proj-Book-Me/tree/master/ohs-app/src/app/instructor)
  handles all the pages that an instructor or teaching assistant
  would use to manage office hour bookings and meetings.
  People, courses, course offerings and course section can also be managed from here.
- The [**student** module](https://github.com/csc302-spring-2019/proj-Book-Me/tree/master/ohs-app/src/app/student)
  handles all the pages that a student would use to view available
  office hour blocks, and book and manage meetings.

These two frontend modules [share](https://github.com/csc302-spring-2019/proj-Book-Me/tree/master/ohs-app/src/app)
a lot of code (Angular (UI) "components" and Angular "services"),
to avoid code duplication.

#### Backend

**Express** routes and JavaScript promises are used for handling endpoints on the servers.

Our backend uses a **Mongo NoSQL database** for persisting all the application's data.
Both the servers share a single Mongo database so that references from server-office-hours models
to server-university models are properly stored as references.
This dependency is for things such as storing which class an office hour block is for.
This is a one-way dependency, i.e. server-university models have no knowledge of server-office-hours models. See the diagram below to see the dependencies in our models

![servers](https://www.plantuml.com/plantuml/svg/0/RP7B3i8W44Nt9Fm3wPvVC4RNFXANnWMsGqji8O6fYJ7-krWiZoeRCdSkSowmTYWiZaFF7DWxM4S99Or0SHKEM1L4FchbD-NmKR4d9Solyz6RZRvygwqPhOEoEaZf3-csL4zGeveEllwoZ9Ig1jvzp8cs0y1Yr320nhdS6upiJM_gspnzcOHnlih2BYBbtIpyv0kyu4XX0dcfUZsaODogjiCqDLq-sdDeQlyOudFdo2IM0QDEoHfqux_t3G00)

#### Frontend

Our frontend is split into many **Angular UI components** that allow for isolation
of concern and reusability.

Most of these components use [`ApiService` class](https://github.com/csc302-spring-2019/proj-Book-Me/blob/master/ohs-app/src/app/shared/services/api.service.ts)
to communicate with the backend.

#### Overall Structure

The diagram below shows the overall dependency structure of our application.
The `Component` elements are just examples, but show how there are shared Angular components
and ones specific to the modules.
It also shows that they use `ApiService` to communicate with the backend.

![overall](https://www.plantuml.com/plantuml/svg/0/VLHDJuD04BsJy1z8xnngYxONKwCcNXeFnfFXi6MNkd7P9VlHn9Z-TuTIWO4HBeJtthpPVJDXvpopFbGgCITXcL9n54SrAxxOKIIBGacX_IBvYQC4de-7Mhu9UvA5oA_8ewbgeq6qd20t4sILD-uDrdMGsdaR2czirmNNh7CApKZqzegU9ssS3tnu4rntHxfjI7JRzpYZh1m48smQj8INa_wxZ-rPyzf8xTrxH_vbipTSA8oJjgOi8VNqqmJh2EFN2_tIiDWP4nThpZmxC0VUbT57a_93RxXla2TJX0gksbKCfvoawVreoCC1ZEWreZT0Ar5w95aYIKP9shsPja7hE3taF_HgdixcwIr5Ws3mtGheeS_eyAX0IZcqDSJMq3v3EVOdm3vvmh-h80upsXdIcbJ6qKve3d-VNm00 "overall")

#### API Spec & Testing

We converted our API spec files into the [API Blueprint format](https://apiblueprint.org/)
so that we can use [Dredd](https://dredd.org/en/latest/) for automated schema testing of endpoints.

The API specs can be seen on Apiary: [Book-Me University API](https://bookmeuniversity.docs.apiary.io) and [Book-Me Office Hours API](https://bookmeofficehours.docs.apiary.io).

Our Dredd tests can be simply run with the `npm run test` command.
The results of the test are shown in the terminal, but can also be viewed in an online interface,
for example see [University API test results](https://app.apiary.io/public/tests/run/6e1a8908-ed0c-4952-a1ac-bb50d777f5b4) and [Office Hours API test results](https://app.apiary.io/public/tests/run/d12a3826-4c3a-4e0e-89a8-c0a8d512e9ad).

## Progress

- **Login and registration page, with authentication.**

  Fully functional login page. Logging in gives you a token which is saved in localStorage. The app checks for this token when you enter the website, then directs you to the login page if necessary.

- **Partially implemented sidebar for quick navigation.**

  Users can access different components easily through the sidebar. These include viewing upcoming/past office hours, classes, comments/notes, and people.
  
- **Office hour block and meetings.**

  The homepage of the application shows the user upcoming office hour blocks. From there, instructors can delete blocks or view meetings.

- **User interface for managing of courses.**

  This user interface allows creating, viewing, editing, and deleting of courses, course offerings and course sections with all their associated necessary properties.
  
- **User interface for managing of comments/notes.**
  
  This user interface allows creating, viewing, editing, and deleting of comments or notes.
  This, however, does not work for specific meetings and is just to partially demo and test the
  backend functionality of comments and notes.

- **Material design and theme throughout the entire application.**

  We used Angular Material components and a custom Angular Material theme in order
  to have somewhat cohesive design and colors through our application.

## Technical Highlights

### Interesting Bugs

- **JSON and timestamps.**

  We encountered a minor, but not obvious issue with timestamps and MongoDB. A few of our models include a timestamp field (e.g. office hour block, note) and we used a Date object to store that information. While it looked good locally at the time of creation, we noticed it always got converted to UTC timezone after retrieving the data from our database.

  Reading the documentation for MongoDB, we knew that Date values passed in always get converted to UTC and is stored like that in the database. So the next step was to identify what was happening when we retrieved the Date field from the database. If we got a Date object back, it should show in local time when displayed on the site.

  It turned out that the Angular `HttpClient` was not parsing the string dates into `Date` objects.. Therefore, we [modified our API call](https://github.com/csc302-spring-2019/proj-Book-Me/commit/5ca8fdbcd46eb11998688810cdf7f87a16aa9035) to convert these fields to Date after we retrieved them.

### Challenges

- **Familiarization with the Angular framework.**

  One of the challenges for some members was simply familiarizing themselves with the Angular framework as they had no previous experience working in it. The large complex structure and numerous components seemed overwhelming at first, but after walking through the code a few times, the organizational structure started to make a lot of sense.

- **Larger team and blocking tasks.**

  Since our team consists of six people, many tasks, especially at the beginning of the project
  relied on and blocked each other.
  This caused issues with many team members having to wait until a certain other task was complete,
  leading to a lot of wasted time.

### Learning

- **Angular**

  Using Angular for our frontend allowed us to work efficiently as a team. Components can be build separately and
  then imported to the module that needs it. Moreover, the components are reusable so it follows the Lean Principle.
  Angular is also supported with many extensions and UI component frameworks, such as Angular Material. We use
  Angular Material to create our UI. Angular Material components allows us to quickly build good-looking and functional UIs. Hence, reduced our
  time to build components and we can spend that time on customizing the components to match our theme. Since, Angular
  Material is made specifically for Angular, the components integrate seamlessly with the app.

### Lessons Learned & Observations

- **NoSQL database.**

  For this application we decided to use a NoSQL database, MongoDB,
  for persisting our database.

  However, we realized that it would probably have been better to use a relation database
  (SQL essentially) since the structure of this data is very relational
  (office hour blocks relate to course sections, which relate to course offerings, etc.)
  and as it would have allowed more complex and performant queries
  (such as filtering based on timestamps, joins, etc.).
  
- **Benefits of Typescript**

  Using Typescript proved to be beneficial and enabled us to write code faster. The static typing feature of Typescript made it a lot easier to work with functions as our editor (with a Typescript linter) would show the expected input and output variable types. It also caught type errors allowing us to identify simple mistakes before even running the app, thus saving us time.

## Teamwork & Process

### What Worked Well

- **Using Trello (Kanban board) to distribute and track tasks.**

  Tasks to complete for Phase 2 are all layed out.
  Each member of the team assigns tasks to themselves based on their
  ability to complete the task.
  More experienced members take tasks that are more difficult, leaving more trivial tasks
  to the other members.
  By doing this, no one is working on the same task and each member is responsible for the tasks
  they chose.
  We did however, have some issues with Trello (see in next section).
  
- **Using Slack as our communication tool.**

  Any questions about implementation and challenges faced by less experienced members are shared in the general slack
  channel. The more experienced member can then give tips to help the less experienced members to finish what is required.

  General communication about the progress of our application and on what should be done next was
  also done in the Slack chat.
  
- **Creating new branches for new features.**

  Each new task whether implementing a new feature or fixing bugs will have a new branch. This eliminates the risk of the
  app in develop branch from not working. Once a task is finished, a pull request is made from the branch for merging into
  the develop branch.

### What Needs Improvement

- **Task management.**

  Our group could improve our efficiency by ordering tasks better and considering which ones need to be completed before others. Since we assigned tasks primarily based on difficulty (so less experienced members could still contribute while learning the Angular framework), we did not really consider how certain parts of the site needed to be complete for others to be fully working. As such, we encountered scenarios where a team member was blocked on certain features they were planning to work on, because it depended on another feature that was currently incomplete. We worked around this by implementing the core functionality of the component, while putting in placeholders for variables that we would have gotten from another component. Afterwards we would fix the UI (if necessary) and link up the variables. We aim to avoid this headache for Phase 3.

- **Maintaining the Trello Kanban board.**

  We had problems with teams maintaining the Trello Kanban board and communicating about the
  items in it.
  Since Trello is directly connected to GitHub, while rushing to complete their tasks,
  updating the Trello board was often forgotten.
  Futhermore, as Trello does not have a very good system for discussing the items on it,
  and since, again, it is not connected to GitHub, we had problems with tracking discussions
  about items on the board, as they were often discussed in the Slack chat.

- **Details on pull requests.**

  Using pull requests for integrating changes into the `develop` branch worked well,
  but communicating the changes that were involved in them did not always work so well.
  At the beginning, we used to communicate what changes were made in the Slack chat,
  but this information could easily get lost among other messages.
  Later on, we started writing down these changes, along with providing screenshots, if applicable,
  in the pull request on GitHub.
  For example, see [#19](https://github.com/csc302-spring-2019/proj-Book-Me/pull/19),
  [#29](https://github.com/csc302-spring-2019/proj-Book-Me/pull/29)
  and [#30](https://github.com/csc302-spring-2019/proj-Book-Me/pull/30).

- **Adding deadlines to tasks.**

  For this phase, our more experienced team member have to wait for the less experienced team member to push their code 
  into git before they can start wiring the components of the app together. This puts a lot of burden to our more 
  experienced team member since they might encounter bugs or some functionalities that are not yet implemented. Especially,
  if some of the tasks are completed last minute, they have to stay up late to get the app working properly. So, for the 
  next phase we are planning to add deadlines to tasks to make the development progress go smoothly.
  
- **Adding difficulty level to tasks.**

  During this phase, some of the tasks responsibilities are handed over to the more experienced members because it takes
  too long for a less experienced member to learn and understand a new concept or tool. Transferring tasks creates confusion
  in the team on who is doing what, and more experienced members have new unexpected tasks to finish. In the future, we are
  planning to label tasks with level of difficulty, and maybe some guides or tips included in the task to help the less
  experienced member.
  
- **Transferring responsibility.**

  For the next phase, to avoid giving unexpected tasks to our more experienced member, we are planning to follow a rule:
  If a member is uncertain whether he/she cannot finish by the deadline, inform the more experienced member at least 2 days before the deadline.

## Phase 3 Plans

Our goals for Phase 3:

- **UI improvements.**

  Currently, our user interface is not really intuitive or well-designed
  to make managing office hours efficient.
  We want to improve this as much as possible for Phase 3.

- **Student interface.**

  Many of the components for the student interface are complete,
  but they still need to be brought together for a working student interface.

- **Importing courses and people.**

  Currently, courses/offerings/sections and people can only be added manually.
  For Phase 3, we want there to be a way to "mass import" and possibly even export
  all this data.

- **Implement remaining use cases.**

  Other than the goals outlined above, there are use cases that need to be implemented,
  such as adding comments and notes to meetings, deleting, searching, etc.

  We expect that most of these will get implemented with the UI improvements,
  especially since most of the components and backend logic for them are implemented.