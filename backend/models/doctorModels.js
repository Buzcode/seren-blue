import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:string , required:true},
    email:{type:string , required:true , unique:true},
    password:{type:string , required:true},
    image:{type:string , required:true},
    speciality:{type:string , required:true},
    degree:{type:string , required:true},
    experience:{type:string , required:true},
    about:{type:string , required:true},
    available:{type:Boolean , required:true},
    fee:{type:Number , required:true},
    address:{type:object , required:true},
    date:{type:number , required:true},
    slots_booked:{type:object , default:{}},
},{minimize:false})

const doctorModels = mongoose.model.doctor || mongoose.model('doctor' , doctorSchema)

export default doctorModels