require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { Redis } = require('ioredis');


const {
  PORT,
  REDIS_URL
} = process.env;



const client = new Redis(String(REDIS_URL));

const app = express();
app.use(cors());


app.get("/hi", async (req, res) => {

  const { name } = req.query;

  if (!name) {
    await client.set('name', 'john doe');
  }

  await client.set('name', String(name));

  return res.status(200).json({
    success: true
  });
})


const port = PORT || 3004;
app.listen(port, () => {
  console.log(`running at ${port}`)
})