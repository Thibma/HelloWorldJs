const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const util = require('util')
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
    if (msg == "ville") {
        res.send("Nous sommes à Paris.")
    }

    else if (msg == "meteo") {
        res.send("Il fait beau")
    }

    else if (msg.includes("=")) {
        const [ cle, valeur ] = req.body.msg.split(' = ')
        readValuesFromFile()
            .then(function(values) {
                fs.writeFile('reponses.json', JSON.stringify({
                    ...valeursExistantes,
                    [cle]: valeur
                }), function(err) {
                    if (err) {
                        console.error("Error while saving reponses.json", err)
                        res.send("Il y a eu une erreur dans l\'enregistrement du fichier")
                    }
                    else {
                        res.send("Merci pour cette information !")
                    }       
                })
            })
            .catch(function(err) {
                res.send('error while reading reponses.json', err)
            })    
    }

    else {
        readValuesFromFile()
        .then(function(values) {
            const data = values
            if (data[msg] != null) {
                res.send(msg + " :" + data[msg])
            }
            else {
                res.send("Je ne connais pas " + msg + "...")
            } 
        })
        .catch(function(err) {
            res.send('error while reading reponses.json', err)
        })
    }
})

app.listen(port, function() {
    console.log("Example app listening on port 3000!")
})

function readValuesFromFile() {
    return new Promise (function (resolve, reject) {
        fs.readFile('reponses.json', { encoding: 'utf8' }, function(err, data) {
            if (err) {
                reject(err)
            }
            else {
            valeursExistantes = JSON.parse(data);
            resolve(valeursExistantes)
            }
        })
    })
    
  }