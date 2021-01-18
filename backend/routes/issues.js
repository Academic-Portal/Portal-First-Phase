const express = require("express");
const router = express.Router();
const Issue = require('../models/Issue');
const Comment = require('../models/Comment');

// @desc Process add form
//@route POST /stories

router.post('/', async (req, res) => {
    try {
        await Issue.create(req.body);
    } catch (err) {
        console.error(err);
    }
});


// @desc show all stories
//@route GET /stories

router.get('/', async (req, res) => {
    try {
        const issues = await Issue.find()
            .sort({createdAt: 'desc'})
            .lean();
        res.json(issues);
    } catch (err) {
        console.error(err);
    }
});


// @desc Process add comment for single issue
//@route POST /issues/id

router.post('/:id', async (req, res) => {
    try {
        await Comment.create(req.body);
        res.json(req.body);
    } catch (err) {
        console.error(err);
    }
});


// @desc show all stories
//@route GET /stories

router.get('/:id', async (req, res) => {
    try {
        const comments = await Comment.find({issueId: req.params.id})
            .sort({createdAt: 'desc'})
            .lean();
        res.json(comments);
    } catch (err) {
        console.error(err);
    }
});

// @desc Delete story
//@route DELETE /issues/:id

router.delete('/:id', async (req, res) => {
    try {
        const deletedIssue = await Issue.remove({_id: req.params.id});
        res.json(deletedIssue);
    } catch (error) {
        console.log(err);
        return res.json({msg: "404 error"});
    }
});


module.exports = router;