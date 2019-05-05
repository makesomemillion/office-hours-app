import * as express from 'express';
import Note from '../models/note';

const router = express.Router();

const NoteModel = new Note().getModelForClass(Note, {schemaOptions: {versionKey: false}});

router.get('/', (req, res) => {
    const filter = req.query.filter;
    const studentId = req.query.student;

    NoteModel
        .find()
        .then(notes => res.send({notes}));
});

router.put('/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    const note = req.body.note;
    delete note._id;

    NoteModel
        .findByIdAndUpdate(noteId, note, {new: true})
        .then(newNote => res.send({note: newNote}));
});

router.delete('/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    NoteModel
        .findByIdAndDelete(noteId)
        .then(note => res.send({note}));
});

export default router;
