import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    category: String,
    one: Number,
    two: Number,
    three: Number,
    four: Number,
    five: Number,
    six: Number,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;