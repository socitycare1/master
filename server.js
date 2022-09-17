const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true, parameterLimit: 5000000 }));
app.get("/", cors(), (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./nodejs/app/routes/user.routes.js")(app);
 require("./nodejs/app/routes/maintinance.routes.js")(app);
// require("./nodejs/app/routes/company.routes.js")(app);
// require("./nodejs/app/routes/contactus.routes.js")(app);
// require("./nodejs/app/routes/category.routes.js")(app);
// set port, listen for requests
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
