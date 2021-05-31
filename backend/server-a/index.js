const http = require("./app");
const config = require("./utils/config");

http.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`); //eslint-disable-line
});
