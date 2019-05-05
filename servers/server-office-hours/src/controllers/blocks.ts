import * as express from 'express';
import Block from '../models/block';
import * as mongoose from 'mongoose';
import {ObjectID} from "bson";

const router = express.Router();

const BlockModel = new Block().getModelForClass(Block, {schemaOptions: {versionKey: false}});

router.get('/', (req, res) => {
    const sectionId = req.query.section;

    BlockModel
        .find()
        .then(blocks => res.send({blocks}));
});

router.post('/', (req, res) => {
    const block = req.body.block;
    block._id = mongoose.Types.ObjectId();
    block.courseSections = block.courseSections.map(sectionId => ObjectID.createFromHexString(sectionId));

    const blockModel = new BlockModel(block);
    blockModel
        .save()
        .then(insertedBlock => res.status(201).send({block: insertedBlock}));
});

router.get('/:blockId', (req, res) => {
    const blockId = req.params.blockId;

    BlockModel
        .findById(blockId)
        .then(block => res.send({block}));
});

router.put('/:blockId', (req, res) => {
    const blockId = req.params.blockId;
    const block = req.body.block;
    delete block._id;

    BlockModel
        .findByIdAndUpdate(blockId, block)
        .then(newBlock => res.send({block: newBlock}));
});

router.delete('/:blockId', (req, res) => {
    const blockId = req.params.blockId;

    BlockModel
        .findByIdAndDelete(blockId)
        .then(block => res.send({block}));
});

export default router;
