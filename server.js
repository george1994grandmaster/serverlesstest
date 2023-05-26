const express = require('express');
const app = express();
const data = require('./data.json');
const fs = require('fs');

app.use(express.json());
app.use(express.static(__dirname));

// GET endpoint to retrieve the data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// POST endpoint to update the data
app.post('/api/data', (req, res) => {
  // Update the data with the request payload
  data.users.push(req.body);

  // Save the updated data to the data.json file
  fs.writeFile('./data.json', JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});