const { type } = require('express/lib/response');
const mongoose = require('mongoose');


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
    }

})

// CREATE PERSON MODEL:
const person=mongoose.model('person',personSchema);
module.exports=person;
