import mongoose from "mongoose";

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100},
    description: {type: String, required:true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true}
},{timestamps: true}
)

export const productModel = mongoose.model(productCollection, productSchema)