const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
//person data
router.post('/',async (req,res)=>{
    try{
        const data=req.body;
    const newPerson=Person(data);
    const response= await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
    }
    catch(error){
      console.log("error in saving data")
    }

})
router.get('/', async(req,res)=>{
    try{
   const data=await Person.find();
   console.log("Data fetched");
   res.json(data);
    }catch(err){
    console.log("error fetching data",err);
    res.json(err);
    }
})
router.get('/:workType',async(req,res)=>{
    try{
       const workType=req.params.workType;
       if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
       const response=await Person.find({work: workType});
       res.json(response);
       }
       else{
        res.status(404).json({error:'invalid work type'});
       }
    }catch(err)
    {
        console.log("error fetching ",err);
        res.status(500).json({err:"server errorrr"});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true,
        })
        res.json(response);
    }
    catch(err){
        console.log("error fetching ",err);
        res.status(500).json({err:"server errorrr"});
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        console.log('Deleted');
        res.json("deleted")
    }
    catch(err){
        console.log("error fetching ",err);
        res.status(500).json({err:"server errorrr"});
    }
})
module.exports=router;