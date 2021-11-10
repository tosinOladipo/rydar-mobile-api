//Imports
const express = require('express');
const env = require("dotenv");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user');
const riderRoutes = require('./routes/rider');
const companyRoutes = require('./routes/company');
const shipmentRoutes = require('./routes/shipment');
const attendanceRoutes = require('./routes/attendance');
const userAuth = require('./middleware/userAuth');
const companyAuth = require('./middleware/companyAuth');
const riderAuth = require('./middleware/riderAuth');



//Environment variable or you can say constants
env.config();


// Middlewares
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/attendance', attendanceRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/riders', riderRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

//Error Handler
app.use((req, res, next) => {
  const err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message } });
});


// Mongodb connection and app-listening settings
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.vvlm7.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log('connected to mongodb');
    return app.listen(process.env.PORT);
  })
    .then(() => console.log(`server running at ${process.env.PORT}`))
    .catch(err => console.log(err.message));

