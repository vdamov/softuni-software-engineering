const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const memeSchema = new Schema({
    url: {
        type: Schema.Types.String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {type: Schema.Types.Date, default: Date.now},
    vote: {type: Schema.Types.ObjectId, ref: 'Vote'},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
memeSchema.plugin(mongoosePaginate);

const Meme = mongoose.model('Meme', memeSchema);


module.exports = Meme;