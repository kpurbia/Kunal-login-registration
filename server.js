const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

//Middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Configure static middleware for getting static html css and js files
app.use(express.static("public"));

//HTTP Request Handling Mapping
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/home', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + "/public/register.html")
})

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + "/public/login.html")
})

app.get('/about', (req, res)=>{
    res.sendFile(__dirname + "/public/about.html")
})

app.get('/contact', (req, res)=>{
    res.sendFile(__dirname + "/public/contact.html")
})

app.get('/welcome', (req, res)=>{
    res.sendFile(__dirname + "/public/welcome.html")
})


//Setting APIs for Register
app.post("/api/register", (req, res)=>{
    let userInfo = req.body;
    // userInfo.id = 1;
    // console.log(userInfo);
    let fileName = "cred.json";
    if(userInfo.password1 === userInfo.password2){
        fs.readFile(fileName, (err, data)=>{
            let stringData = data.toString();
            let credFile = JSON.parse(stringData);
            userInfo.id = credFile.length + 1;
            console.log(userInfo);

            //Pushing new user into credentials
            credFile.push(userInfo);
            //Converting file to json
            stringData = JSON.stringify(credFile);
            fs.writeFile(fileName, stringData, (err)=>{
                res.redirect("/welcome");
            })
       })
    } else{
        res.send("Passowrd not matched reload homepage again.");
    }
})



//Setting APIs for Login
app.post("/api/login", (req, res)=>{
    let userInfo = req.body;
    //console.log(userInfo.password);
    let fileName = "cred.json";
    fs.readFile(fileName, (err, data)=>{
        let stringData = data.toString();
        let credFile = JSON.parse(stringData);
        var foundPerson = {};
        foundPerson = credFile.find((person)=>(person.email===userInfo.email && person.password1 === userInfo.password));
        if(foundPerson){
            //res.send(foundPerson)
            res.redirect("/welcome");
        } else{
            res.redirect("/register");
        }
    })
})


//Server Listening
app.listen(7000, ()=>{
    console.log("Express webserver is listening on port 7000");
})