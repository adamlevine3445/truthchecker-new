console.log('Script is running');

const express = require('express');
console.log('Express loaded');

const cors = require('cors');
console.log('CORS loaded');

const app = express();
const port = 3000;

console.log('Starting server setup...');

app.use(cors());
app.use(express.json());

console.log('Middleware set up.');

app.post('/analyze', (req, res) => {
  console.log('Received analyze request');
  console.log('Request body:', req.body);

  const content = req.body.content || '';
  
  // Define suspicious words (you can expand this list)
  const suspiciousWords = ['fake', 'hoax', 'conspiracy'];

  // Convert content to lowercase and split into words
  const words = content.toLowerCase().split(/\W+/);

  // Find suspicious words in the content
  const detectedWords = words.filter(word => suspiciousWords.includes(word));

  // Determine if the content might contain false information
  const isFalseInfo = detectedWords.length > 0;

  // Prepare the response
  const response = {
    isFalseInfo,
    detectedWords,
    details: isFalseInfo 
      ? `Potential false information detected. Suspicious words found: ${detectedWords.join(', ')}`
      : 'No indicators of false information detected.'
  };

  res.json(response);
});

app.get('/', (req, res) => {
  console.log('Received GET request on root');
  res.send('Server is running');
});

console.log('Routes defined. Attempting to start server...');

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
