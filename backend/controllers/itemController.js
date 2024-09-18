const { header } = require('express-validator');
const Item = require('../models/item');
const jwt = require('jsonwebtoken');

exports.itemRegister=async (req,res)=>{
    console.log("item register");
    
    
    try{
        const postedBy = req.user.username; // Username from the logged-in user
        const email = req.user.email; // Email from the logged-in user

        const {title,description,location,status,contact,image,category}=req.body;
        const item=new Item ({
            title,
           postedBy,
            description,
            location,
            status,
            contact:{...contact,email},
            image,
            category
           
        })
        await item.save();
        res.status(201).json({ message: 'Item created successfully', item });
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"server error"});
    }
  
};

    // this should be url to run post api to regiseter new item http://localhost:5000/lostFoundItems/itemregister
// req.body should look like this
// {
//     "title": "Lost Wallet",
//     "description": "A black leather wallet lost near the park.",
//     "location": {
//       "street": "Main Street",
//       "city": "New York",
//       "state": "NY"
//     },
//     "status": "lost",
//     "contact": {
//       "phone": "123-456-7890"
//     },
//     "image": "image_url", 
//     "category": "accessories"
//   }
  
// and header
// Authorization: Bearer <token generated after login>