const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT;
const host = process.env.HOST;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:'50mb'}));

app.use(require("./src/controller"));

app.listen(parseInt(port), ()=>{
    console.log(`Server running in ${host}:${port}`);
});