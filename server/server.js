const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


require('dotenv').config();
require('./config/mongoose.config');
require('./routes/app.routes')(app);

    
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
