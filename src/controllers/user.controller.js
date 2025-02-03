import {asyncHandler} from '../utils/asynchandler.js';

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"hii i am vaibhav kumar founder and ceo of blocksex"
    })
})

export {registerUser}