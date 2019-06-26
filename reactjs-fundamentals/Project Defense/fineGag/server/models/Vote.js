const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({

    meme: {
        type: Schema.Types.ObjectId,
        ref: 'Meme',
        required: true,
        unique: true
    },
    rating: {type: Schema.Types.Number, default: 0},
    voters: {
        up: [{type: Schema.Types.ObjectId, ref: 'User'}],
        down: [{type: Schema.Types.ObjectId, ref: 'User'}],
    }
});


const Vote = mongoose.model('Vote', voteSchema);


module.exports = Vote;