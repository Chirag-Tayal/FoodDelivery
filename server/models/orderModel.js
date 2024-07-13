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

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        req: true
    },
    items:[{
        food:{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                req: true 
        }, qty:{
            type:Number,
            required:true
        }
    }],
    totalAmount: {
        type: Number,
        required: true

    },
    payment: {
        type: Boolean,
        default: false

    },
    status: {
        type: String,
        enum:["Pending","Delivered"],
        default: "Pending"

    },
    createdAt: {
        type: Date, 
        default: Date.now()

    },
   
    
}, {
    timestamps: true
})

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;