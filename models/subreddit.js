import mongoose from "mongoose";

const subredditSchema =  mongoose.Schema({
    
    name: { type: String, required: true },
    userid: { type: String, required: true },
})

const Subreddit = mongoose.models.subreddit || mongoose.model("subreddit", subredditSchema);

export default Subreddit;