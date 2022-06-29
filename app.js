const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
  const fName=  req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME: fName,
          LNAME: lName,
        }
      }
    ]
  }

app.post("/failure",function(req,res){
  res.redirect("/");
})

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/2b2517bab1";
  const options = {
    method:"POST",
    auth: "KS:24eafd2b1552d693e0b2aa025d9aede0-us14", //add your API key
  }


const request=  https.request(url,options,function(response){

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})



app.listen(process.env.PORT || 3000,function(){
  console.log("Server is runnning at port 3000");
})


// 24eafd2b1552d693e0b2aa025d9aede0-us14

// List id
// 2b2517bab1
