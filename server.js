import app from './app.js'
import env from 'dotenv'
env.config()
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost'

app.listen(PORT,HOST,(err)=>{
    if (err){
        console.error(err.message)
    }else{
        console.log(`http://${HOST}:${PORT}`)
    }
})