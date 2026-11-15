import express , {Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import {connectDB} from './config/database'
import userRoutes from './routes/user.routes'

dotenv.config()

connectDB();

const app=express()
const PORT=process.env.PORT||3000

app.use(cors())
app.use(express.json())

app.get('/',(req:Request,res:Response)=>{
    res.send("welcomeee....to HomePlate...")
})

app.use('/api/users',userRoutes)


app.listen(PORT,()=>{
    
    console.log(`server is listening to http://localhost:${PORT}`)
})


