import mongoose from "mongoose";

const msgCollection = 'messages'

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true},
    message: {type: String, required:true},
},{timestamps: true}
)

export const messagesModel = mongoose.model(msgCollection, messageSchema, 'messages')