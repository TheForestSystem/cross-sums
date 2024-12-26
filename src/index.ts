import express from 'express';
import path from 'path';
import { isBoardSolved } from './gameLogic';

const app = express();
const port = 8080;

// Serve static files (HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// API endpoint to check if the board is solved
app.post('/check-win', express.json(), (req, res) => {
  const { board } = req.body;
  const solved = isBoardSolved(board);
  res.json({ solved });
});

// Serve the app on port 8080
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
