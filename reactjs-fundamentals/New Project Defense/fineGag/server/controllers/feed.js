const Meme = require('../models/Meme');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const fs = require('fs');

module.exports = {
    getMemes: (req, res) => {
        const nextPage = Number(req.query.nextPage);
        Meme.paginate({}, {
            limit: 5,
            sort: {date: -1},
            populate: [
                {path: 'vote', select: ['voters.up', 'voters.down', 'rating']},
                {
                    path: 'comments',
                    populate: {path: 'author', select: 'username'},
                    select: ['date', 'value']
                },

                {
                    path: 'author',
                    select: 'username'
                }],
            page: nextPage
        })
            .then((memes) => {
                res
                    .status(200)
                    .json({message: 'Fetched memes successfully.', memes});
            })
            .catch((error) => {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                res.status(error.statusCode).json({error});
            });
    },
    addComment: async (req, res) => {
        try {
            const memeId = req.body.memeId;
            const userId = req.body.userId;
            const commentValue = req.body.value;

            const meme = await Meme.findOne({_id: memeId});
            const comment = await Comment.create({
                author: userId,
                value: commentValue
            });
            meme.comments.push(comment._id);
            meme.save();
            res.status(201).json({message: 'Your comment was created.', comment})
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({error});

        }

    },
    deleteComment: async (req, res) => {
        try {
            const memeId = req.body.memeId;
            const commentId = req.body.commentId;

            const meme = await Meme.findOne({_id: memeId});

            await meme.updateOne({$pull: {comments: commentId}});
            await Comment.deleteOne({_id: commentId});

            res.status(200).json({message: 'The comment was deleted.'});


        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({error});

        }

    },
    deleteMeme: async (req, res) => {
        try {
            const memeId = req.body.memeId;

            const meme = await Meme.findOne({_id: memeId});
            await fs.unlinkSync('./public' + meme.url);
            await Vote.deleteOne({meme: memeId});
            await Comment.deleteMany({_id: {$in: meme.comments}});
            await Meme.deleteOne({_id: memeId});


            res.status(200).json({message: 'The meme was deleted successfully.'});


        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({error});

        }

    },

    addMeme: async (req, res) => {
        try {
            for (let i = 0; i < Object.keys(req.files).length; i++) {
                let file = req.files[i];
                let fileUrl = './public/images/' + +new Date() + file.name;

                file.mv(fileUrl);
                fileUrl = fileUrl.substring(8);
                let meme = await Meme.create({
                    url: fileUrl,
                    author: req.body.userId
                });
                const vote = await Vote.create({meme: meme._id});
                meme.vote = vote.id;
                meme.save();
            }
            res.status(201)
                .json({
                    message: 'Meme created!'
                });


        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            res.status(error.statusCode).json({error});
        }
    },
    addVote: async (req, res) => {
        try {
            const voteType = req.body.voteType;
            const memeId = req.body.memeId;

            const vote = await Vote.findOne({meme: memeId});
            const hasVoted = vote.voters.up.some(id => id.toString() === req.body.userId.toString())
                || vote.voters.down.some(id => id.toString() === req.body.userId.toString());
            if (!hasVoted) {
                vote.voters[voteType].push(req.body.userId);
                if (voteType === 'up') {
                    vote.rating += 1;
                } else if (voteType === 'down') {
                    vote.rating -= 1;
                }
                vote.save();
                res.status(200).json({message: 'You voted succesfully!'})
            }

        } catch (error) {
            res.status(401).json({message: 'Vote was not registered.', error})
        }
    },


};