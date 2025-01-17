const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem');
//menu data
router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=MenuItem(data);
        const response= await newMenu.save();
        console.log("Item saved");
        res.status(200).json(response);
    }
    catch(error){
      console.log("error in saving data")
    }
})
router.get('/', async(req,res)=>{
    try{
   const data=await MenuItem.find();
   console.log("Menu fetched");
   res.json(data);
    }catch(err){
    console.log("error fetching Menu",err);
    res.json(err);
    }
}) 
router.get('/:tasteType',async(req,res)=>{
    try{
       const tasteType=req.params.tasteType;
       if(tasteType=='sweet'|| tasteType=='sour'|| tasteType=='spicy'){
       const response=await MenuItem.find({taste: tasteType});
       res.json(response);
       }
       else{
        res.status(404).json({error:'invalid taste type'});
       }
    }catch(err)
    {
        console.log("error fetching ",err);
        res.status(500).json({err:"server errorrr"});
    }
})

module.exports=router;