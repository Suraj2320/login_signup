const userModel =require("../model/userModel")
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const AWS = require('aws-sdk');

const signUp=async (req,res)=>{
    const {firstname,lastname,mobileNumber,password}=req.body
//console.log(firstname,lastname,password);
const hash=await argon2.hash(password)
try{
    const user=new userModel({firstname,lastname,mobileNumber,password:hash})
    await user.save()    
    return res.status(201).send("user created")
}
catch(e){
    console.log(e.message)
    return res.send(e.message)
}
}

const logIn=async (req,res)=>{
    
    const {mobileNumber,password}=req.body;
    
    const user=await userModel.findOne({mobileNumber});
  console.log(user,password)
  if(user){
    if( await argon2.verify(user.password,password)){
        const token=jwt.sign({id:user._id,firstname:user.firstname,lastname:user.lastname,mobileNumber:user.mobileNumber},"SECRET",{expiresIn:"24 hours"})
        const refreshToken=jwt.sign({id:user._id,firstname:user.firstname,lastname:user.lastname,mobileNumber:user.mobileNumber},"REFRESH",{expiresIn:"7 days"})
        return res.status(201).send({message:"login sucess",token,refreshToken,user})
    }
    else{
        return res.status(401).send("wrong credentials")
    }
  }
  else{
    return res.status(401).send("wrong credentials")
}

}

const getUser = async (req, res) => {
    const allUsers= await userModel.find()
  
    return res.send(allUsers)
  }




// const uploadTos3=async (req,res)=>{ 
// const s3 = new AWS.S3({
//     accessKeyId: "AKIA3KZVK3RM64YWWI",
//     secretAccessKey: "DemXhC26QSU0EdnN1wtzjb7tnvVt7FXqijBVPi5e",
// });

// const bucketName = 'equip9-testing';
// const keyName = '9921179262';
// const filePath = "C:\Users\suraj\Desktop\surapawar.jpeg"
// const uploadFile = (filePath,bucketName,keyName) => {
//     var fs = require('fs');
//     // Read the file
//     const file = fs.readFileSync(filePath);

//     // Setting up S3 upload parameters
//     const uploadParams = {
//         Bucket: bucketName, // Bucket into which you want to upload file
//         Key: keyName, // Name by which you want to save it
//         Body: file // Local file 
//     };

//     s3.upload(uploadParams, function(err, data) {
//         if (err) {
//             console.log("Error", err);
//         } 
//         if (data) {
//             console.log("Upload Success", data.Location);
//         }
//     });
// };








module.exports ={logIn,signUp,getUser}