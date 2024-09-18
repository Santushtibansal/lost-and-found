// register and login authentication with jwt token

const User = require('../models/User');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// register an user
exports.register = async(req,res)=>{
  console.log("api hit")
    const {username,email,password} = req.body;
    try{

      const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
  
      if (existingUser && existingEmail) {
        return res.status(400).json({ message: 'Both username and email already exist' });
      } else if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      } else if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }


        const user = new User({username,email,password});
        await user.save();
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{ expiresIn: '1h' });
        res.status(201).json({token});
    }
    catch(error){
      console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


//login api(first find the user exists or not){  get api (with findone)}
exports.login= async(req,res)=>{
  console.log("login api");
  const{username,password}= req.body;
  try{
    //comapre username
    let user=await User.findOne({email:username});
    if(!user){
      user= await User.findOne({username:username})
    }
    if(!user){
      return res.status(400).json({error:'invalid username entered'});

    }

    //compare password
    if(password!==user.password){
      return res.status(400).json({error:'invalid password entered'});
    }
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:'server error'});
  }
}

