import * as express from 'express';
import Person from '../models/person';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import CourseSection from '../models/course-section';
import {ObjectID} from 'bson';

const router = express.Router();
const jwtSecret = 'secret';

const PersonModel = new Person().getModelForClass(Person, {schemaOptions: {versionKey: false}});
const CourseSectionModel = new CourseSection().getModelForClass(CourseSection, {schemaOptions: {versionKey: false}});

router.get('/', (req, res) => {
    const filter = req.query.filter;

    PersonModel.find().then(people => res.send({people}));
});

// Register
router.post('/', (req, res) => {
    const person = req.body;
    person._id = mongoose.Types.ObjectId();

    console.log('registering... ', person);

    const personModel = new PersonModel(person);
    personModel.save().then(insertedPerson => res.status(201).send({person: insertedPerson}));
});

// Login
router.post('/login', (req, res) => {
    // console.log('logging in...');
    // console.log(req.body);

    PersonModel.findOne({username: req.body.username, password: req.body.password}).then(
        person => {
            console.log('user found', person);

            if (person) {
                const token = jwt.sign(
                    {
                        username: person.username,
                        accessLevel: person.accessLevel,
                        firstName: person.firstName,
                        lastName: person.lastName,
                        email: person.email,
                        id: person.id
                    },
                    jwtSecret,
                    {
                        expiresIn: 60 * 60 * 24 * 7
                    }
                );

                person.token = token;

                person.save().then(savedPerson => {
                    res.status(200).send(savedPerson);
                });
            } else {
                res.status(400).send(`Incorrect credentials.`);
            }
        },
        (error: any) => {
            console.log(error);
        }
    );
});

// Logout, remove token
router.post('/logout', (req, res) => {
    // console.log('logout user', req.body);

    PersonModel.findOne({username: req.body.username}).then(
        person => {
            if (person) {
                // console.log('found person', person);
                person.token = '';
                person.save().then(savedPerson => {
                    console.log(savedPerson);
                    res.status(200).send();
                });
            } else {
                res.status(400).send(`Could find user with username ${req.body.username}`);
            }
        },
        (error: any) => {
            console.log(error);
        }
    );
});

// Validate Token
router.post('/validate', (req, res) => {
    console.log('validating user', req.body);

    PersonModel.findOne({username: req.body.username}).then(person => {
        if (person) {
            console.log('found person', person);
            jwt.verify(req.body.token, jwtSecret, (err: any, decoded: any) => {
                if (err || person.token !== req.body.token) {
                    res.status(401).send('Token invalid.');
                } else {
                    // valid token, give user new one
                    const newToken = jwt.sign(
                        {
                            username: person.username,
                            accessLevel: person.accessLevel,
                            firstName: person.firstName,
                            lastName: person.lastName,
                            email: person.email,
                            id: person.id
                        },
                        jwtSecret,
                        {
                            expiresIn: 60 * 60 * 24 * 7
                        }
                    );

                    person.token = newToken;
                    person.save().then(savedPerson => {
                        console.log('here');
                        res.status(200).send(savedPerson);
                    });
                }
            });
        } else {
          // valid token, give user new one
          const newToken = jwt.sign(
            {
              username: person.username,
              accessLevel: person.accessLevel,
              firstName: person.firstName,
              lastName: person.lastName,
              email: person.email,
              id: person.id
            },
            jwtSecret,
            {
              expiresIn: 60 * 60 * 24 * 7
            }
          );

          person.token = newToken;
          person.save().then(savedPerson => {
            console.log('here');
            res.status(200).send(savedPerson);
          });
        }
    });
});

router.get('/:personId', (req, res) => {
    const personId = req.params.personId;

    PersonModel.findById(personId).then(person => res.send({person}));
});

router.put('/:personId', (req, res) => {
    const personId = req.params.personId;
    const person = req.body.person;
    delete person._id;

    PersonModel.findByIdAndUpdate(personId, person, {new: true}).then(newPerson => res.send({person: newPerson}));
});

router.delete('/:personId', (req, res) => {
    const personId = req.params.personId;

    PersonModel.findByIdAndDelete(personId).then(person => res.send({person}));
});

router.get('/:personId/sections', (req, res) => {
    const personId = req.params.personId;

    CourseSectionModel
        .aggregate([
            {
                $match: {
                    $or: [ // Person is instructor or TA or student for course section.
                        {instructorsIds: ObjectID.createFromHexString(personId)},
                        {teachingAssistantsIds: ObjectID.createFromHexString(personId)},
                        {studentsIds: ObjectID.createFromHexString(personId)},
                    ]
                }
            }, {
                $lookup: // Join course offering data
                    {
                        from: 'courseofferings',
                        localField: 'courseOffering',
                        foreignField: '_id',
                        as: 'courseOfferingData'
                    }
            }, {
                $unwind: '$courseOfferingData'
            }, {
                $lookup: // Join course data
                    {
                        from: 'courses',
                        localField: 'courseOfferingData.course',
                        foreignField: '_id',
                        as: 'courseData'
                    }
            }, {
                $unwind: '$courseData'
            }
        ])
        .then(sections => res.send({courseSections: sections}));
});

export default router;
