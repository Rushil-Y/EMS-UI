const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

// application middlewares
app.use(express.static("public"));

// application port
app.listen(PORT, () => {
    console.log(`App is running : http://localhost:${PORT}/`);
})