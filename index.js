const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//Route setup
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/html/index.html");
  console.log(req.query.debug);
});
app.get('/main.css', (req, res) => {
  res.sendFile(process.cwd() + "/css/main.css");
});
app.get('/index.js', (req, res) => {
  res.sendFile(process.cwd() + "/js/index.js");
});
app.get('*', (req, res) => {
  res.sendFile(process.cwd() + "/html/404.html");
})
//Start server
app.listen(port, (req, res) => {
console.log(`server listening on port: ${port}`)
 });
