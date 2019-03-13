const Meme = require('../models/Meme');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');

module.exports = {
    getMemes: (req, res) => {
        const nextPage = Number(req.query.nextPage);
        Meme.paginate({}, {
            limit: 5,
            sort: {date: -1},
            populate: [{path: 'vote', select: ['voters.up', 'voters.down', 'rating', 'comments']}, {
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
                next(error);
            });
    },
    addComment: async (req, res) => {
        try {
            const memeId = req.body.memeId;
            const userId = req.body.userId;
            const commentValue = req.body.value;

            const meme = await Meme.findOne({meme: memeId});
            const comment = await Comment.create({
                meme: meme._id,
                author: userId,
                value: commentValue
            });
            meme.comments.push(comment._id);
        } catch (e) {

        }

    },
    addMeme: async (req, res) => {
        try {
            const author = await User.findOne({username: req.body.author});
            for (let i = 0; i < Object.keys(req.files).length; i++) {
                let file = req.files[i];
                let fileUrl = './public/images/' + file.md5 + file.name;

                file.mv(fileUrl);
                fileUrl = fileUrl.substring(8);
                let meme = await Meme.create({
                    url: fileUrl,
                    author: author._id
                });
                const vote = await Vote.create({meme: meme._id});
                meme.vote = vote.id;
                meme.save();
            }
            res.status(201)
                .json({
                    message: 'Meme created!'
                });


        } catch (e) {
            if (!e.statusCode) {
                e.statusCode = 500;
            }
            next(e);

        }
    },
    addVote: async (req, res) => {
        try {
            const voteType = req.body.voteType;
            const memeId = req.body.memeId;
            const username = req.body.user;

            const user = await User.findOne({username});
            const vote = await Vote.findOne({meme: memeId});
            const hasVoted = vote.voters.up.some(id => id.toString() === user._id.toString())
                || vote.voters.down.some(id => id.toString() === user._id.toString());
            if (vote && !hasVoted) {
                vote.voters[voteType].push(user._id);
                if (voteType === 'up') {
                    vote.rating += 1;
                } else if (voteType === 'down') {
                    vote.rating -= 1;
                }
                vote.save();
                res.status(200).json({message: 'Voted succesfully!'})
            }

        } catch (e) {

        }
    },


};