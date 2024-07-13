const bcryptjs = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer')

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({
            email: req.body.email
        });
        if (existingUser) {
            return res
                .status(200)
                .send({
                    message: "User already exists",
                    success: false
                });
        }

        // const salt = await bcryptjs.genSalt(10);/
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        const hashedConfirmPassword = bcryptjs.hashSync(req.body.confirmPassword, 10);

        if (req.body.password !== req.body.confirmPassword) {
            return res
                .status(400)
                .send({
                    message: "Passwords do not match",
                    success: false
                });
        }

        const otp = otpGenerator.generate(6, {
            digits: true,
            uppercase: false,
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false
        });

        const newUser = new userModel({
            name: req.body.name,
            email: req.body.email,
            profileImage: req.body.profileImage,
            password: hashedPassword,
            confirmPassword: hashedConfirmPassword,
            otp: otp
        });

        await newUser.save();

        const token = jwt.sign({
            _id: newUser._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        // const transporter = nodemailer.createTransport({     host:
        // 'smtp.ethereal.email',     port: 587,     auth: {         user:
        // 'leonie.murphy83@ethereal.email',         pass: 'BSjQmZ3g4UCxtkR4wv'     }
        // }); const mailOptions = {     from: "r dev",     to: req.body.email,
        // subject: "OTP for account verification",     text: `Your OTP is ${otp}` };
        // transporter.sendMail(mailOptions, (error, info) => {     if (error) {
        // console.log(error);         return res.status(500).send({
        // message: "Error in sending mail",             success: false         });
        // }     res.status(201).send({         message: "Mail sent successfully",
        //   success: true     }); });

        return res
            .status(201)
            .send({
                message: "Registered successfully",
                success: true,
                data: {
                    user: newUser,
                    token: token
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
};

const getUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({
            _id: req.body.userId
        })
        if (!user) {
            return res
                .status(200)
                .send({
                    message: "User doesn't exists",
                    success: false
                });
        } else {
            return res
                .status(200)
                .send({
                    message: "user data fetched succesfully",
                    data: {
                        user
                    },
                    success: true
                });
        }

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Auth error",
                success: false
            });
    }

}

const getAllUserController = async (req, res) => {
    try {
        const users = await userModel.find()
        if (!users) {
            return res
                .status(200)
                .send({
                    message: "Users doesn't exists",
                    success: false
                });
        } else {
            return res
                .status(200)
                .send({
                    message: "users Lst",
                    data: {
                        users
                    },
                    success: true
                });
        }

    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({
                message: "Auth error",
                success: false
            });
    }

}
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({
            email: req.body.email
        }).select('+password');
        if (!user) {
            return res
                .status(200)
                .send({
                    message: "User doesn't found",
                    success: false
                });
        }
        const isMatch = bcryptjs.compareSync(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(201)
                .send({
                    message: "password dot not matched",
                    success: false
                });
        }

        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res
            .status(201)
            .send({
                message: "login successfully",
                success: true,
                data: {
                    user: user,
                    token: token
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
};
// updateUserController
const updateUserController = async (req, res) => {
    const {   name,
        email,
        city,
        country,
        zipCode,
        state,
        userId,street,houseNo,
        profileImage} = req.body;
        try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res
                .status(200)
                .send({
                    message: "User doesn't found",
                    success: false
                });
        }
       
        user.name = name || user.name;
        user.email = email || user.email;
        user.city = city || user.city;
        user.country = country || user.country;
        user.zipCode = zipCode || user.zipCode;
        user.state = state || user.state; 
        user.profileImage = profileImage || user.profileImage;
        user.street = street || user.street; 
        user.houseNo = houseNo || user.houseNo;


        await user.save()

        
        return res
            .status(201)
            .send({
                message: "user upadated successfully",
                success: true,
                data: {
                    user: user,
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
};



module.exports = {
    registerController,
    getUserController,loginController,updateUserController,getAllUserController
}