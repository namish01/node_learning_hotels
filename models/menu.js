const { truncate } = require('lodash');
const mongoose = require('mongoose');

// Define the person schema:
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required :true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        defualt:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

// CREATE PERSON MODEL:
const menu=mongoose.model('menu',menuSchema);
module.exports=menu;

