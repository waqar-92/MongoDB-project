const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'project_mini';

// Connect to DB first, then start the server
async function start() {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db(dbName);
    collection = db.collection('student');

    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}

start().catch(console.error);

//api to retrive data
app.get('/api/loadData', async (req, res)=>{
    try{
        const request = await collection.find({}).toArray()
        res.json(request)

    }catch(err){
        console.error(err)
        res.status(500).json({success:false})

    }
})

//api to add record
app.post('/api/addRecord', async (req,res)=>{

    try{
        const {s_roll,s_name}= req.body

        await collection.insertOne({s_roll,s_name})
        res.status(201).json({success: true , message: 'Record Added'})


    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Server Error'})
    }

})

//api to update record
app.post('/api/update', async (req,res)=>{
    try{

        const {s_roll,s_name} = req.body

        await collection.updateOne({s_roll : s_roll}, {$set: {s_name : s_name}})
        res.status(201).json({success: true, message: 'Recoed Updated'})
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Server Error'})
    }
})

//api to update record
app.post('/api/delete', async (req,res)=>{
    try{

        const {s_roll} = req.body

        await collection.deleteOne({s_roll : s_roll})
        res.status(201).json({success: true, message: 'Recoed Deleted'})
    }catch(err){
        console.error(err)
        res.status(500).json({message: 'Server Error'})
    }
})