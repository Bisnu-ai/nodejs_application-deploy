import express from 'express'
import env from 'dotenv'
const app =express();
const PORT = process.env.PORT ?? 8080;


app.get('/',(req,res)=>{
    return res.json({msg: 'HELLO FROM THE SERVER'})
})


app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`); 
})