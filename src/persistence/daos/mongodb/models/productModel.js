import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100},
    description: {type: String, required:true},
    price: {type: Number, required: true},
    thumbnail:{type: String, required: true},
    code:{type: String, required: true},
    stock: {type: Number, required: true},
    status:{type: Boolean, required: true}

},{timestamps: true}
)
productSchema.plugin(mongoosePaginate)
export const productModel = mongoose.model(productCollection, productSchema)

