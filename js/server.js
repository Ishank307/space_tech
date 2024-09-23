// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (use your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/space-news', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Define your news article schema and model
const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  datePublished: Date
});

const Article = mongoose.model('Article', articleSchema);

// Search route
app.get('/search', async (req, res) => {
  const query = req.query.q;
  
  try {
    // Search for articles where the title or description contains the search term
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
