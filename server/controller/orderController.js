const OrderModel = require("../models/orderModel");

const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY)

const createOrderController = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;

        // Ensure you've properly initialized the stripe object
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: "Paid for food"
                    },
                    unit_amount: totalAmount * 100,
                },
                quantity: 1
            }],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        // Await stripe.checkout.sessions.create()
        if (session.id) {
            const newOrder = new OrderModel({
                user,
                items,
                totalAmount
            });

            const saveOrder = await newOrder.save();

            // Update order after saving it
            await OrderModel.findByIdAndUpdate(saveOrder._id, {
                payment: true
            });

            return res.status(200).send({
                message: "Order created successfully",
                success: true,
                data: saveOrder,
                sessionId: session.id
            });
        } else {
            return res.status(200).send({
                message: "Payment not successful",
                success: false
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        });
    }
};

//  createOrderControllerCOD
const createOrderControllerCOD = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;

      
            const newOrder = new OrderModel({
                user,
                items,
                totalAmount
            });

            const saveOrder = await newOrder.save();

            

            return res.status(200).send({
                message: "Order created successfully",
                success: true,
                data: saveOrder
            });
       
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Internal server error",
            success: false
        });
    }
};

const getAllOrderController = async (req, res) => {

    try {
        const orders = await OrderModel.find().populate({ path: 'items.food' }).populate({ path: 'user', options: { strictPopulate: false } })
        return res
            .status(200)
            .send({
                message: "All order List  error",
                success: true,
                data: orders
            });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Internal server error",
                success: false
            });
    }

}

const getSingleOrderController = async (req, res) => {

    try {
        const {
            userId
        } = req.body;
        const userOrders = await OrderModel.find({
            user: userId
        }).populate({ path: 'items.food' }).populate({ path: 'user', options: { strictPopulate: false } })
        return res
            .status(200)
            .send({
                message: "order List of the user",
                success: true,
                data: userOrders
            });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Internal server error",
                success: false
            });
    }

}
const markOrderDeliveredController = async (req, res) => {

    try {
        const {
            orderId
        } = req.body;
        const userOrders = await OrderModel.findByIdAndUpdate({
            _id: orderId
        }, {
            status: "Delivered",
            payment:true
        });
        return res
            .status(200)
            .send({
                message: "order delivered succesfully",
                success: true,
            });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Internal server error",
                success: false
            });
    }

}

module.exports = {
    createOrderController,
    getAllOrderController,
    getSingleOrderController,
    markOrderDeliveredController,
    createOrderControllerCOD
}