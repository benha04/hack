import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    PlayerID: String,
    assists: Number,
    deaths: Number,
    gold_earned: Number,
    kills: Number,
    vision_score: Number,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;