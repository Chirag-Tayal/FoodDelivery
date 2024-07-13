const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        req: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        comments: {
            tye: String,
            required: true
        }

    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        req: true
    },
    weight:{
        type:Number,
        required:true
    },
    reviews:[reviewSchema],
    special:{
        type:Boolean,
        default:false
    },
    foodImage:{
        type : String,
        required:true

    }
}, {timestamps: true})

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;