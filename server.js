const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()

var port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send("Hello World !")
})

app.get('/hello', function(req, res) {
    var nom = req.query.nom
    if (nom == undefined) {
        res.send("Quel est votre nom ?")
    }
    
    else {
        res.send("Bonjour " + nom + " !")
    }
})

app.post('/chat', function(req, res) {
    var msg = req.body.msg
    console.log(msg)
    if (msg == "ville") {
        res.send("Nous sommes à Paris.")
    }

    else if (msg == "meteo") {
        res.send("Il fait beau")
    }

    else if (msg.includes("=")) {
        var split = msg.split('=')
        var key = split[0]
        key = key.split(" ").join("")
        var value = split[1]
        value = value.split(" ").join("")

        var obj = {}
        obj[key] = value

        var json = JSON.stringify(obj)

        fs.writeFileSync("reponses.json", json, 'utf8')

        res.send("Merci pour cette information !")
    }

    else {
        var rawData = fs.readFileSync("reponses.json")
        var data = JSON.parse(rawData)
        if (data[msg] != null) {
            res.send(msg + " :" + data[msg])
        }
        else {
            res.send("Je ne connais pas " + msg + "...")
        }
    }
})

app.listen(port, function() {
    console.log("Example app listening on port 3000!")
})