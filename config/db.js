import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
      const conn = await mongoose.connect(process.env.MONGO_URL)
      console.log(`Connected To Mongodb Database ${mongoose.connection.host}` .bgMagenta.white)
    } catch (error) {
       console.log(`MongoDb Error ${error}` .bgRed.white)
    }  
}

export default connectDb;