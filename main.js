const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let data = [];

app.get('/data', (req, res) => {
  res.json(data);
});

app.post('/data', (req, res) => {
  const newData = req.body.data;
  if (typeof newData === 'string') {
    data.push(newData);
    res.status(201).json({ message: 'Data added successfully.' });
  } else {
    res.status(400).json({ message: 'Data must be a string of exactly 10 characters.' });
  }
});

app.delete('/data', (req, res) => {
  const index = data.findIndex(item => item === req.body.data);
  if (index !== -1) {
    data.splice(index, 1);
    res.json({ message: 'Data deleted successfully.' });
  } else {
    res.status(404).json({ message: 'Data not found.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
