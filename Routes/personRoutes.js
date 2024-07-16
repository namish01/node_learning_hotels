const express=require('express');
const router=express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt')

// POST TO LOGIN:
router.post('/login',async (req,res)=>{
try {
  const {username,password}=req.body;
  const user=await person.findOne({username:username});
  if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({Error:'Invalid user id and password'});

} 
const payload={
  id:user.id,
  username:user.username
}
const token=generateToken(payload);
res.json({token});
}
catch (error) {
  console.log(error);
  return res.status(500).json({Error:'Internal server error:'});
}
});
// POST ROUTE TO ADD A PERSON:
router.post('/signup', async (req, res) => {
    try {
  
      const data = req.body// ASSUMING IT IS CONTAINING PERSONS DATA
  
      // CREATE A NEW PERSON DOCUMENT USING MONGOOSE MODEL:
      const newPerson = new person(data);
  
      // Save newPerson to database:
      const response = await newPerson.save();
      console.log("Data saved succesfully:");

      const payload={
        username:response.username,
        id:response.id
      }
      const token=generateToken(payload);
      console.log("Token is :" ,token);
      res.status(200).json({response:response,token:token});
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
      const data=await person.find();
      console.log("Data fetched succesfully:");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  // PARAMETRISED API CALLS:
router.get('/:worktype',async(req,res)=>{
    try {
      const worktype=req.params.worktype;// Extract the worktype from the url parameter:
      if(worktype=='chef' ||worktype=='waiter'||worktype=='manager'){
        const response=await person.find({work:worktype});
        console.log("response fetched:...")
        res.status(200).json(response);
      }else{
        res.status(404).json({error:'invalid work type:...'})
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' }); 
    }
  })

  router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const updatedData = req.body;
  
      // Find the document by ID and update it with the new data
      const response = await person.findByIdAndUpdate(personId, updatedData, {
        new: true,
        runValidators: true,
      });
  
      if (!response) {
        return res.status(404).json({ Error: 'Person not found' });
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
      const response = await person.findByIdAndDelete(personId);
      if (!response) {
        return res.status(404).json({ Error: 'Person not found' });
      }
      console.log('Data deleted succesfully:');
      res.status(200).json({message:'person deleted successfully:...'});
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports=router;