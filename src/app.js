const express = require("express"); // import from node modules

const app = express(); // calling the express
app.use((req, res) => {
  res.send("server is updating automatically");
});

app.listen(2000, () => {
  console.log("server is successfully updated on port 2000");
});
