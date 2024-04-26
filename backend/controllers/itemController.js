import asyncHandler from 'express-async-handler'
import Item from '../models/itemModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
//@desc New Item
// rout POST /api/items/newitem
//@access Public
const createNewItem=asyncHandler(async (req,res)=>{
    //console.log(req.body)
    const {item,cost}=req.body
    if (!req?.body?.item || !req?.body?.cost) {
        return res.status(400).json({'message':'Item and cost are required'})
      }

    let token;
    token=req.cookies.jwt
    const decoded=jwt.verify(token, process.env.JWT_SECRET)
    //console.log(decoded)
    const emailx=await User.findById(decoded.userId).select('email')
    const email=emailx.email
    const useritems=await Item.find({email})
    const itemlist=await Item.create({
        item,
        cost,
        email,
    });
    if (itemlist) {
        res.status(201).json({
            id:itemlist.id,
            item:itemlist.item,
            cost:itemlist.cost,
        }) 
    } else {
        res.status(400);
        throw new Error ('Invalid item data')
    }
    //res.status(200).json({message:`item=${item}, cost=${cost}`})
})

const getItems=asyncHandler(async (req,res)=>{
    const token=req.cookies.jwt
    const decoded=jwt.verify(token, process.env.JWT_SECRET)
    if (!token){
        return res.status(204).json({'message':'No such user'})
    }
    //console.log(decoded)
    const emailx=await User.findById(decoded.userId).select('email')
    const email=emailx.email
    const useritems=await Item.find({email:email})
    if (!useritems) {
        return res.status(204).json({ "message": `No items` });
    }
     res.status(200).json(useritems)
 })

const updateItem=asyncHandler(async (req, res) => {
  if (!req?.body?.id){
      return res.status(400).json({'message':'ID parameter is required'})
  }
  const id=req.body.id
  const token=req.cookies.jwt
  const decoded=jwt.verify(token, process.env.JWT_SECRET)
  //console.log(decoded)
  const emailx=await User.findById(decoded.userId).select('email')
  const email=emailx.email
  const useritem=await Item.findOne({email:email,_id:id})
  if (!useritem) {
      return res.status(204).json({ "message": `No such item` });
  }
  if (req.body?.item) useritem.item = req.body.item;
  if (req.body?.cost) useritem.cost = req.body.cost;
  const result=await useritem.save()
  res.json(result);
})

const deleteItem=async (req, res) => {
  const id=req.body.id
  //console.log(req.body)
  if (!id) return res.status(400).json({'message':'ID parameter is required'})
  const token=req.cookies.jwt
  //console.log(token)
  const decoded=jwt.verify(token, process.env.JWT_SECRET)
  const emailx=await User.findById(decoded.userId).select('email')
  const email=emailx.email
  const useritem=await Item.findOne({email,_id:id})
  //console.log(useritem)
  if (!useritem) {
      return res.status(204).json({ "message": `No Employee matches ID ${req.body.id}.` });
  }
  const result=await useritem.deleteOne({_id:req.body.id});
  res.json(result);
}


const getAllItems=asyncHandler(async (req, res) => {
    const token=req.cookies.jwt
    
  const allitems=await Item.find()
  if (!allitems) {
      return res.status(204).json({ "message": `No item` });
  }
  //console.log(allitems)
  res.json(allitems);
})

export {createNewItem,updateItem,deleteItem,getItems,getAllItems}