import { app } from "./config/express";
import { API_PORT } from "./const";
import { initServer } from "./init";
const port = API_PORT;

initServer();

app.get("/ping", async (_, res) => {
  res.send("Pong");
});

app.listen(port, () => {
  return console.log(
    `Dashboard server is listening at http://localhost:${port}`,
  );
});
