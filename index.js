const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;  // Use dynamic port from environment

// Fake user data
let user = {
  coins: 100,
  inventory: []
};

const items = ['T-Shirt', 'Hoodie', 'Cap', 'Sneakers', 'Beanie'];

app.get('/user', (req, res) => {
  res.json(user);
});

app.get('/spin', (req, res) => {
  if (user.coins < 10) {
    return res.status(400).json({ message: 'Not enough coins' });
  }

  user.coins -= 10;
  const item = items[Math.floor(Math.random() * items.length)];
  user.inventory.push(item);

  res.json({
    item,
    coins: user.coins
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
