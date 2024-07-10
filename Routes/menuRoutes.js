const express=require('express');
const router=express.Router();
const menu=require('./../models/menu');

router.post('/',async(req,res)=>{
    try {
      const data = req.body // ASSUMING IT IS CONTAINING PERSONS DATA
  
      // CREATE A NEW PERSON DOCUMENT USING MONGOOSE MODEL:
      const newMenu = new menu(data);
       // Save newPerson to database:
       const response = await newMenu.save();
       console.log("Data saved succesfully:");
       res.status(200).json(response);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  router.get('/',async(req,res)=>{
    try {
      const data=await menu.find();
      console.log("Data fetched succesfully:");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  // PARAMETRISED API CALLS:
  router.get('/:Taste',async(req,res)=>{
  try {
    const TasteType=req.params.Taste;
    if (TasteType=='sweet'||TasteType=='spicy'||TasteType=='sour') {
     const response= await menu.find({taste:TasteType});
     console.log("Data fetched...");
     res.status(200).json(response);
    } else {
     res.status(404).json({Error:'Invalid choice'});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({Error:'Internal server error:'});
  }

  })

  module.exports=router;