import {asyncHandler} from '../utils/asynchandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"hii i am vaibhav kumar founder and ceo of blocksex"
    })
    // get user details from frontend 
    // validation - not empty 
    // check if user already exits: username , email
    // check for image , avatar 
    // upload then to cloudnary, avatar
    // create user object - create entry in db 
    // send response back to frontend
    // send token back to frontend
    // remove password and refresh token feild from response 
    // check user creation
    // return res

    const {fullname , email, username , password} = req.body
    console.log("email:", email);
    if (
        [fullname, email, username , password].some((feild) => feild?.trim() === "")
    ) {
        throw new Error(400,"All feild are requird");
        
    }

    const existedUser = await User.findOne({
        $or:[{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path 
    const coverlocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const cover = await uploadOnCloudinary(coverlocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar upload failed");
    }


    const user = await User.create({
        fullname,
        avatar:avatar.url,
        cover:cover?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken -createdAt -updatedAt"
    )

    if(!createduser){
        throw new ApiError(404, "User not found");
    }
    return res.status(201).json(
        new ApiResponse(200, createduser,"user registered successfully ")
    );


})

export {registerUser}