const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.json())

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))