import mongoose from 'mongoose'


const itemSchema=mongoose.Schema({
    item:{
        type: String,
        required: true
    },
    cost:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
},{
    timestamps:true
})

const Item=mongoose.model('Item', itemSchema)

export default Item;