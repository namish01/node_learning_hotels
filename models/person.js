const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const bcrypt=require('bcrypt');


// Define the person schema:
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Address: {
        type: String
    },
    Salary: {
        type: Number,
        required: true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

});
personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')) return next();
    try {
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(person.password,salt);
        person.password=hashPassword;
        next();
    } catch (error) {
        return next(error);
    }
})
personSchema.methods.comparePassword=async function(candidatePassword){
    try {
        const ismatch=bcrypt.compare(candidatePassword,this.password);
        return ismatch;
    } catch (error) {
        throw error;
    }
}

// CREATE PERSON MODEL:
const person=mongoose.model('person',personSchema);
module.exports=person;
