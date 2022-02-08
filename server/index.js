require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-shirobooking.wq7xs.mongodb.net/shirobooking?retryWrites=true&w=majority`)

        console.log("MongoDB connected...");
    } catch (error) {
        console.log("ERROR when connect to MongoDB.", error);
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())
const authRoute =  require('./routes/auth')
app.use('/api/auth', authRoute)
app.use('/api/manga', require('./routes/manga'))
app.use('/api/anime', require('./routes/anime'))
app.get('/', (req, res) => {
    return res.json("cccccccccccccccccccccccccccc")
})
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})