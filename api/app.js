const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const DepartmentController = require('./controllers/departmentController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);

mongoose.connect(
    'mongodb://localhost:27017/cadastroproduto',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use('/departments', DepartmentController)

app.listen(3000, () => console.log('App running in port 3000'));