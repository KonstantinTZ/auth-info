const express = require('express');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose')
const app = express();
const authRouter = require('./authRouter')

app.use(express.json())
app.use("/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.2cjha4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()