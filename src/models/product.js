import { number } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    original_price: Number,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    description: String,



},
    { timestamps: true, versionKey: false });


productSchema.plugin(mongoosePaginate)
export default mongoose.model("Product", productSchema)