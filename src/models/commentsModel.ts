
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    MovieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

});

export default mongoose.model('comment', commentSchema);