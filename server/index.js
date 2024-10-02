const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

//1. Middlewares
app.use(cors());
app.use(express.json());

//2. .env variables
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGO_URI; 

//3. Routes

//4. Database connection
mongoose
  .connect('mongodb://localhost:27017/task-manager') // Correct way to connect
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Database connection failed: ", error));

//5. Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status;

  res.status(err.statusCode).json({
      status: err.status,
      message: err.message
  });
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
