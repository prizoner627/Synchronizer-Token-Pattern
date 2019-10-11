# Synchronizer-Token-Pattern

This project demonstrates how to use CSRF Tokens and Session IDs to validate sessions and users using NodeJS.

## Setup

### Requirements

A recent version of NodeJS

### Running the App

Clone this repository Use master branch !

> Steps

* RUN `npm install`

* Navigate to `synchronizer-token-pattern` directory and run `node Server.js`

* Navigate to `synchronizer-token-pattern/Client` directory and run `npm start`

* The app runs on `port 3000`

* Open a web browser and navigate to `http://localhost:3000/`

* User username `root` and password `toor` to log in.

### Description

Upon successful user login, the server generates a Session ID and a CSRF Token for the session. Session ID is set as a browser cookie. When user submits the form, The server validates whether the Session ID and CSRF Token matches. When user logs out Session ID and CSRF Token are deleted from the server making them unusable.

### About Project and Author

I did this as an assignment for the subject Web Security (WS) when I was studying in the second year second semester of Cyber Security degree at Sri Lanka Institute of Information Technology (SLIIT).
