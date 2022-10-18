const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static("public"));

app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const https = require("https");

//Mailchimp keys here
var apiKey;
var list_id;

const serverPrefix = 'us13';

app.get("/",(req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req, res) => {
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);
    //console.log(JSON.parse(jsonData));
    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${list_id}`;
    const options = {
        method: "POST",
        auth: "DanielEsparza:" + apiKey
    }
    const name = "<li>item 1</li><li>item 2</li>";
    var mailRequest = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            response.on("data", (data) => {
                var jsonResp = JSON.parse(data);
                //console.log(jsonResp);
                if(jsonResp["error_count"] === 0) {
                    res.render("success", {name:fName});
                } else {
                    //res.render(__dirname + "/failure.html", {name:name});
                    //console.log(JSON.stringify(jsonResp.errors[0]));
                    //res.send("API error");
                    res.render("failure", {name:fName});
                    console.log(jsonResp.errors[0]["error_code"]);
                    console.log(jsonResp.errors[0]["error"]);
                }
            }).on("error", (e) => {
                res.render("failure", {name:fName});
            });
        } else {
            res.render("failure", {name:fName});
        }
    });
    mailRequest.write(jsonData);
    mailRequest.end();
});

app.get("/failure", (req, res) => {
    res.redirect("/");
});

app.get("/success", (req, res) => {
    res.redirect("/");
});


app.listen(3000, (err) => {
    console.log("listening on port 3000");
});
