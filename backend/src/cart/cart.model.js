import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    listings: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'listings' }]
});

const User = mongoose.model("user", cartSchema);

export default User;
