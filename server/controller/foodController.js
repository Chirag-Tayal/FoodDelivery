const FoodModel = require("../models/FoodModel");
const categoryModel = require("../models/categoryModel");

const createFoodController = async (req, res) => {

    try {

        const {
            name,
            price,
            description,
            category,
            weight,
            foodImage,
            special
        } = req.body;
        const newFood = new FoodModel(
            req.body
        )
        newFood.save();

        return res
            .status(201)
            .send({
                message: "Food created successfully",
                success: true,
                data: {
                    Food: newFood,
                }
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


// createCategoryController

// const createCategoryController = async (req, res) => {

//     try {

//         const {
//             name
//         } = req.body;
//         const isCat = await categoryModel.findOne({name:name});
//         if(isCat){
//             return res
//             .status(201)
//             .send({
//                 message: "Category Exsted",
//                 success: false, 
//             });

//         }
//         const newCat = new categoryModel(
//             {name : name}
//         );

//         newCat.save();

//         return res
//             .status(201)
//             .send({
//                 message: "Category created successfully",
//                 success: true,
//                 data: {
//                     name: newCat,
//                 }
//             });

//     } catch (error) {
//         console.error(error);
//         return res
//             .status(500)
//             .send({
//                 message: "Internal server error",
//                 success: false
//             });
//     }

// }
const getAllFoodController = async (req, res) => {
    

    try { 
        if(req.query.category === 'All'){

            const foodItems = await FoodModel.find().populate('category')
    
            return res
                .status(200)
                .send({
                    message: "All food items list",
                    success: true,
                    data: {
                        Foods: foodItems,
                    }
                });
        }else{
            const category = await categoryModel.findOne({name : req.query.category}) ; 
            if (!category) {
                return res.status(404).json({
                    message: `Category '${req.query.category}' not found.`,
                    success: false
                });
            }

            const foodItems = await FoodModel.find({category : category?._id}).populate('category') 
    
            return res
                .status(200)
                .send({
                    message: `${category} Food item list.`,
                    success: true,
                    data: {
                        Foods: foodItems,
                    }
                });
        }


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
const getANewFoodController = async (req, res) => {
    

    try { 

        const foodItems = await FoodModel.find().populate('category').sort({ createdAt: -1 }).limit(8);

    
            return res
                .status(200)
                .send({
                    message: "New food items list",
                    success: true,
                    data: {
                        Foods: foodItems,
                    }
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

// special
const getSpecialFoodController = async (req, res) => {
    

    try { 

        const foodItems = await FoodModel.find({special : true}).populate('category');

    
            return res
                .status(200)
                .send({
                    message: "Special food items list",
                    success: true,
                    data: {
                        Foods: foodItems,
                    }
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
// Get Food item

const getFoodItemController = async (req, res) => {
    

    try {
        const {id} = req.params;
            const foodItem = await FoodModel.findOne({_id : id}).populate('category')
    
            if(foodItem){
                return res
                .status(200)
                .send({
                    message: "Item Details",
                    success: true,
                    data: {
                        FoodItem: foodItem,
                    }
                });

            }else{
                return res
                .status(200)
                .send({
                    message: "Item doesnot exist",
                    success: false,
                });

            }
      


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
// createCategoryController

const createCategoryController = async (req, res) => {

    try {


        const category = await categoryModel.findOne({name: req.body.name})
        if(category){
            return res
            .status(201)
            .send({
                message: "category already exist",
                success: false
            });
        }

        const newCategory = new categoryModel({
            name : req.body.name
        })

        newCategory.save();

        return res
            .status(200)
            .send({
                message: "category created succesfully",
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

// getAllcategoriesController
const getAllcategoriesController = async (req, res) => {

    try {


        const categories = await categoryModel.find()

        return res
            .status(200)
            .send({
                message: "All categories list",
                success: true,
                data: {
                    categories: categories,
                }
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
    createFoodController,
    getAllFoodController,
    createCategoryController,getAllcategoriesController,
    getFoodItemController,getANewFoodController,getSpecialFoodController
}