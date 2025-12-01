const express = require('express');
const dbConnect = require('./Models/dbConnect')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080;
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRoute')
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json())
app.use(cors({
    origin: [
        "http://localhost:5173", // React dev server (for local testing)
        "https://authentication-nilesh.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));


// dbConnect()

app.use('/auth', AuthRouter)
app.use('/product', ProductRouter )

app.get('/ping', (req, res) =>{
    res.send("PING")
})
app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`)
    dbConnect()
})

module.exports = app
