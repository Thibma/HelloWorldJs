const express = require('express')
const app = express()

var port = process.env.PORT || 3000;

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

app.listen(port, function() {
    console.log("Example app listening on port 3000!")
})