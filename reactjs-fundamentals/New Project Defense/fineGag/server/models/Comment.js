const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    meme: {
        type: Schema.Types.ObjectId,
        ref: 'Meme',
        required: true,
        unique: true
    },
    value: {type: Schema.Types.String, required: true},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {type: Schema.Types.Date, default: Date.now}
});


const Comment = mongoose.model('Comment', commentSchema);


module.exports = Comment;