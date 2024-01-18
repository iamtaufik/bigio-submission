const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use('/api/v1', require('./routes/index.route'));
app.use(require('./middlewares/errorHandling'));
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    data: null,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
