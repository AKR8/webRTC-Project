const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const helmet = require('helmet');
const path = require('path');

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

app.use(express.static(path.join(__dirname, '../webrtc-project/dist/webrtc-project/')));

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname,'../webrtc-project/dist/webrtc-project/index.html'));
});

const server = app.listen(3500,()=>{
    console.log('Node server is running.. 3500');
})