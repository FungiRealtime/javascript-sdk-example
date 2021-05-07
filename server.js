const cors = require("cors");
const express = require("express");
const { Client } = require("@fungi-realtime/node");

let app = express();
let port = 3000;

let client = new Client({
  httpEndpoint: "http://localhost:8080",
  key: "app-test-key",
  secret: "app-test-secret",
});

app.use(cors());
app.use(express.json());

app.post("/send-message", async (req, res) => {
  let { content, sentAt } = req.body;
  await client.trigger("messages", "new-message", { content, sentAt });
  return res.json({ content, sentAt });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
