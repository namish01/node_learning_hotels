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

  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const updatedData = req.body;
  
      // Find the document by ID and update it with the new data
      const response = await menu.findByIdAndUpdate(personId, updatedData, {
        new: true,
        runValidators: true,
      });
  
      if (!response) {
        return res.status(404).json({ Error: 'item not found' });
      }
      console.log('Data updated');
      res.status(200).json(response);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      // Find the document by ID and update it with the new data
      const response = await menu.findByIdAndDelete(personId);
      if (!response) {
        return res.status(404).json({ Error: 'item not found' });
      }
      console.log('item deleted succesfully:');
      res.status(200).json({message:'item deleted successfully:...'});
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports=router;