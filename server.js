const express = require('express')
const bodyParser = require('body-parser')
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

    else {
        res.send("Merci de spécifier un body correct (ville/météo)")
    }
})

app.listen(port, function() {
    console.log("Example app listening on port 3000!")
})