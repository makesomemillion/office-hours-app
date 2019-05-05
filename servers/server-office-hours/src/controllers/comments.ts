import * as express from 'express';
import Comment from '../models/comment';

const router = express.Router();

const CommentModel = new Comment().getModelForClass(Comment, {schemaOptions: {versionKey: false}});

router.get('/', (req, res) => {
    const filter = req.query.filter;
    const studentId = req.query.student;

    CommentModel
        .find()
        .then(comments => res.send({comments}));
});

router.put('/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const comment = req.body.comment;
    delete comment._id;

    CommentModel
        .findByIdAndUpdate(commentId, comment, {new: true})
        .then(newComment => res.send({comment: newComment}));
});

router.delete('/:commentId', (req, res) => {
    const commentId = req.params.commentId;

    CommentModel
        .findByIdAndDelete(commentId)
        .then(comment => res.send({comment}));
});

export default router;
