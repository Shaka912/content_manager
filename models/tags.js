import mongoose from "mongoose";

const tagSchema =  mongoose.Schema({
    
    name: { type: String, required: true },
    userid: { type: String, required: true },
})

const Tags = mongoose.models.Tags || mongoose.model("Tags", tagSchema);

export default Tags;
