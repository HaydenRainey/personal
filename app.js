const path = require("path")
const port = 8090
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fss = require('fs')  // NEW - this is required
const app = express()  // make express app
const http = require('http').Server(app)  // inject app into the server // inject app into the server

// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
// 2 manage our entries
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request (not required to fully work)
// 6 respond with 404 if a bad URI is requested

// Listen for an application request on port 8081

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view

// 2 include public assets and use bodyParser
// Node uses __dirname for the The directory name of the current module.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
// see https://github.com/expressjs/morgan for more
var accessLogStream = fss.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

// 4 http GET default page at /
app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })

 app.get("/index.html", function(req,res){
   res.render("index.ejs")
 })
 
 // 4 http GET /tic-tac-toe
 app.get("/tic-tac-toe", function (req, res) {
  res.render("tic-tac-toe.ejs")
 })
 
 // 4 http GET /about
 app.get("/about.html", function (req, res) {
  res.render("about.ejs")
 })
 
 // 4 http GET /contact
 app.get("/contact.html", function (req, res) {
  res.render("contact.ejs")
 })

 app.get("/test", function (req,res){
   res.render("W03Tests.html")
 })

 
// 5 http POST /contact
app.post("/contact.html", function (req, res) {
  const name = req.body.inputname;
  const email = req.body.inputemail;
  const company = req.body.inputcompany;
  const comment = req.body.inputcomment;
  const isError = true;
 
  // setup e-mail data with unicode symbols
  const mailOptions = {
    from: '"Denise Case" <denisecase@gmail.com>', // sender address
    to: 'dcase@nwmissouri.edu, denisecase@gmail.com', // list of receivers
    subject: 'Message from Website Contact page', // Subject line
    text: comment,
    err: isError
  }
 
  // logs to the terminal window (not the browser)
  console.log('\nCONTACT FORM DATA: ' + name + ' ' + email + ' ' + comment + '\n');
  })

// 6 this will execute for all unknown URIs not specifically handled
app.get(function (req, res) {
  res.render("404")
 })
 
 // Listen for an application request on designated port
 app.listen(port, function () {
  console.log('Web app started and listening on http://localhost:' + port)
 })

