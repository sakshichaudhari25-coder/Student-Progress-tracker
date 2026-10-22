import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import Tracker from "../model/tacker.js";

dotenv.config();

const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static("frontend"))

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("MongoDB connected");
})
.catch((error)=>{
    console.log("MongoDbB connection Error:",error);
    
})
app.post("/student-progress",async(req,res)=>{
    try{
    const {name,course,completionPercentage}=req.body

    const newTracker=new Tracker({
        name:name,
        course:course,
        completionPercentage:Number(completionPercentage)
    })
    await newTracker.save()

    res.json({
        message: "Student progress added successfully",
        data: newTracker
    })

    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"Failed to add student progress"
        })
    }
})

app.get("/student-progress",async(req,res)=>{
    try{
        const progress=await Tracker.find();
        res.json(progress)
    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Failed to get student progress"
        })
        
    }
})

app.delete("/student-progress/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid student progress ID"
            })
        }
        const deleteProgress=await Tracker.findByIdAndDelete(id);

        if(!deleteProgress){
            return res.status(404).json({
                message:"Student progress not found"
            })
        }

        res.status(200).json({
            message:"Student Progress deleted Successfully"
        })
    }catch (error){
        console.log("Delete Progress Error:". error);

        res.status(500).json({
            message:"Failed TO delete student Progress"
        })
        
    }
})
    app.listen(5000,()=>{
        console.log("Server is running on http://localhost:5000");       
})

