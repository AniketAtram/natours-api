const app = require("./app");

const PORT = "3000";
const HOST_NAME = "127.0.0.1";

app.listen(PORT, HOST_NAME, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://${HOST_NAME}:${PORT}`);
});
