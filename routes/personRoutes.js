const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const {jwtAuthMiddleware, generateToken}=require('./../jwt');
//person data
router.post('/signup',async (req,res)=>{
    try{
        const data=req.body;
    const newPerson=Person(data);
    const response= await newPerson.save();
    console.log("data saved");
    
    const payload={
        id: response.id,
        username: response.username
    };
    console.log(JSON.stringify(payload));
    const token=generateToken(response.username);
    console.log("Token is : ",token);

    res.status(200).json({response: response,token: token});
    }
    catch(error){
      console.log(error)
    }

})
router.post('/login',async(req,res)=>{
    try{
        const{username,password}=req.body;
        const user=await Person.findOne({username:username});
        if(!user || !(await user.comparePassword(password))){
            return rs.status(401).json({error:"Invalid"});
        }
        const payload={
            id: user.id,
            username: user.username,
        }
        const token=generateToken(payload);
        res.json({token});
    }catch(err){
        
        res.json({err});
    }
})
router.get('/',jwtAuthMiddleware , async(req,res)=>{
    try{
   const data=await Person.find();
   console.log("Data fetched");
   res.json(data);
    }catch(err){
    console.log("error fetching data",err);
    res.json(err);
    }
})
router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userData=req.user;
        const userId=userData.id;
        const user=await Person.findById(userId);
        res.status(200).json({user});
    }catch(err){
        res.status(500).json({err:"Invalid"});
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