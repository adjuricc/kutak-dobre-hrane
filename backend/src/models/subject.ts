import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Subject = new Schema({
    name: {
        type: String
    }
});

export default mongoose.model('Subject', Subject, 'subjects');