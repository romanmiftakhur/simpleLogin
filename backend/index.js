const express = require('express');
const db = require('./config');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes');
const User = require('./models/userModel');

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

db.authenticate().then(() => {
    console.log('Connected to database');
}).catch((err) => {
    console.log(err)
});

app.use(cors({ credentials: true, origin:'http://localhost:3000' }));

app.use(cookieParser());

//parser Content-Type : application/json
app.use(express.json());

//route
app.use(adminRoutes);

app.listen(port, () => console.log(`Server in running at port: ${port}`));