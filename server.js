const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const posts = require("./routes/api/posts");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//DB Props
const db = require("./config/keys").mongodbURI;

//connect to Db
mongoose
<<<<<<< HEAD
<<<<<<< HEAD
=======
  .set("useFindAndModify", false)
>>>>>>> 90bf76297c61a7bdd143e664c671fea10a38a393
=======
>>>>>>> origin/develop
  .connect(db)
  .then(() => console.log("you are connected to mongoDB"))
  .catch(err => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

//routing to files
app.use("/api/posts", posts);
app.use("/api/profiles", profiles);
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runnig on port ${port}`));
