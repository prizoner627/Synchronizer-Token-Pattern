const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const uuidv1 = require("uuid/v1");
const uuidv4 = require("uuid/v4");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

let SESSION_IDS = []; //store session id and csrf token

//login route
app.post("/login", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  };

  if (user.username === "root" && user.password === "toor") {
    console.log("valid creds");

    const SESSION_ID = uuidv1(); //generate session id
    const CSRF_TOKEN = uuidv4(); //generate csrf token

    //store tokens
    SESSION_IDS = {
      SESSION_ID,
      CSRF_TOKEN
    };
    console.log("Session id and Token : ", SESSION_IDS);

    //set cookie
    res.cookie("session-id", SESSION_IDS.SESSION_ID, {
      maxAge: 172800000,
      httpOnly: true, //set to false if got problem
      path: "/",
      secure: false,
      sameSite: true
    });

    res.sendStatus(200);
  } else {
    console.log("invalid creds");
    res.send("Invalid Credentials");
    res.status(403);
  }
});

//check if token is valid
function validToken(req, res, next) {
  const csrfToken = req.body.csrfToken;
  if (csrfToken === SESSION_IDS.CSRF_TOKEN) {
    console.log("CSRF Token matched");
    return next();
  } else {
    res.send("Invalid CSRF Token");
    res.status(403);
  }
}

//message route
app.post("/message", validToken, (req, res) => {
  user = {
    message: req.body.message
  };
  if (user.message) {
    res.status(200);
    res.send("Message Recieved with Valid CSRF Token");
  }
});

//token route
app.post("/token", (req, res) => {
  const sessionId = req.cookies["session-id"];
  //change to req.body.cookie if not working propoerly
  console.log("recieved session ID : ", sessionId);
  console.log("stored session ID : ", SESSION_IDS.SESSION_ID);

  if (sessionId && SESSION_IDS.SESSION_ID) {
    if (SESSION_IDS.SESSION_ID === sessionId) {
      console.log("Session Id matched");
      res.send(SESSION_IDS.CSRF_TOKEN);
      res.status(200);
    } else {
      console.log("Session Id not matched");
      res.status(403).json({ error: "Unauthorized" });
    }
  }
  //compare session id
});

//logout route
app.post("/logout", (req, res) => {
  SESSION_IDS.SESSION_ID = ""; //set session id to empty
  SESSION_IDS.CSRF_TOKEN = ""; //set token to empty

  res.clearCookie("session-id");
  console.log(SESSION_IDS.SESSION_ID);
  console.log(SESSION_IDS.CSRF_TOKEN);
  res.send("logout");
  res.status(200);
});

app.listen(4000, () => {
  console.log("Sever is listning");
});
