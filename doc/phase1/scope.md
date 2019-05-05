# Scope

## Learning Goals

1. Learn to build and test **Angular applications**.
   1. While our team is split half and half between React and Angular,
      for this application,
      we’ve decided to use Angular as we feel it is easier to follow Angular guidelines,
      thus allowing for better teamwork and less confusion.
      Also provides an opportunity for members unfamiliar with it to learn Angular
      and can easily get feedback from members with more experience.
   2. Angular also works well with Typescript,
      and members on the team have expressed a
      desire to work with Typescript over Javascript.
   3. Angular provides a robust testing environment we can leverage
      to test our front-end applications.
      Currently, none of our members are very familiar
      with testing client code for our web apps,
      but a few have shown interest in learning about it
      and setting up Travis CI to automatically test
      our front-end code when we push to GitHub.
   4. This also provides a useful experience for members
      that have previously worked in React to compare the two.
2. Build a **MongoDB Database**.
   1. Wanted to experiment with the possible advantages of NoSQL Databases,
      as we have only learned about SQL Databases in our courses such as CSC343/443.
   2. Some members have set up MongoDB databases in the past,
      but have limited experience applying it in a fully integrated setting.
3. **Integrate front-end with the back-end**.
   1. Members on the team have often only touched either the front or back-end,
      but have limited or no experience integrating them together.
   2. Some members are interested in learning about Express or Node
      specifically to integrate the front and back-ends together.
4. Utilize **Trello** to manage tasks.
   1. Members have used Github Issues in the past,
      but wanted to expand knowledge on other possible technologies
      for Agile Task management such as Trello.
   2. This way we can compare and contrast
      the advantages and disadvantages between the two.

## Scope (In Terms of Use Cases)

Below is the list of use cases provided,
we’ve highlighted the ones our team would like to implement,
and crossed out the ones we feel are extraneous and do not offer much towards our learning goals.

### Instructor

1. ~~Manage preferences~~
   1. ~~Set Default reminder schedule for student~~
   2. ~~Set Default reminder schedule for instructor~~
2. **Create new class**
   1. **Import classlist (csv file from CDF or quercus)**
   2. **Import classlist (csv file from CDF or quercus)**
3. **Create office hours interval**
   1. **One time**
   2. **Repeating**
   3. ~~Set default reminder for student meetings in interval~~
   4. ~~Set default instructor reminder for meetings, intervals~~
4. **Delete interval with no meetings**
   1. **With meetings, what?**
5. **Manage meetings in intervals**
   1. **Reschedule meetings to another interval**
   2. **Cancel/Delete meetings**
   3. **Move meeting earlier or later within the interval**
6. **Create, delete, edit meeting comments (shared with student)**
7. **Create, delete, edit meeting notes (NOT shared with student)**
8. **Instructor Manage notes (Notes private to instructor)**
   1. **Create note about student meeting**
   2. **Find a note made about a student**
   3. **Find a comment made for a student**
   4. **Delete a note**
   5. **Edit a note**
9. **Instructor Manage Comments (Comments associated with meeting, shared with student)**
   1. **Create comment**
   2. **Edit comment**
   3. **Delete comment**
   4. **Find comment**
10. ~~Generate persistent link to share meetings and/or intervals (eg in a quercus announcement or email)~~
11. ~~Sync/Export intervals and meetings to personal electronic calendar(s)~~
12. ~~Instructor notify system that meetings are running late~~
    1. ~~Will start x minutes later than scheduled?~~
    2. ~~Will have to cancel meetings following some time?~~

### Student

12. **Choose meeting slot**
13. **Cancel meeting slot**
14. **Edit meeting slot**
15. ~~Efficiently Inform instructor when running late for meeting. System should adapt.~~
16. ~~Configure reminders~~
17. **Student Manage Comments**
    1. **Create comment**
       1. **Including in advance! (Propose agenda or ask questions)**
    2. **Delete, Edit comments**
    3. **Find comments**
18. ~~Sync/Export meetings to personal electronic calendar(s)~~

## Consensus

For the scope of our project and our learning goals,
we came into consensus through discussion during one of our in-class meetings.

The first day when we found out who are team will consist of,
we discussed, in brief, what technologies and architecture we would like our project to
include/consist of.
This was later expanded on during our first actual meeting.

Later, during the same meeting,
we slowly went through each item in the list of use cases we were given,
and discussed whether that item should be in the scope of our project.
For each item, we discussed how it relates to our learning goals,
the difficulty and achievability of the item,
how the item may be implemented using the technologies we wanted to use,
and how the item would integrate with the other items in terms of the user interface and user flow.
Through this discussion, we were able to come to a majority consensus on each item.