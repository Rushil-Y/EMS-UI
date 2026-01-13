const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// application middlewares
app.use(express.static("public"));

if (require.main === module) {
  // Running locally → start server
  app.listen(PORT, () => {
    console.log(`App is running : http://localhost:${PORT}/`);
  });
}

module.exports = app;
