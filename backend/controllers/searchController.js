const Item = require('../models/item');

exports.searchByCategory=async(req,res)=>{
   try {const category = req.params.category;
    const items = await Item.find({category});

    if(items.length==0){
        return res.status(404).json({message:'not valid items present'});
    }

    res.status(200).json({items});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:'api not working'});
    }
}