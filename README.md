# Thibault BALSAMO

Ce dépot contient un serveur web / API en Node.js.
Il permet aussi un petit Chat-Bot intelligent.

Ce serveur répond :
- "Hello World" quand on envoie une requête HTTP GET à la racine.
- "Quelle est votre nom ?" quand on envoie une requête HTTP GET à /hello.
- Votre nom si vous spécifiez un nom à la requête HTTP GET à /hello.
- "Merci pour cette information !" quand on lui envoie une requête POST /chat à sauvegarder sous la forme "clé = valeur"
- "clé: valeur" quand on on lui envoie une requête POST /chat du JSON sauvegardé précédemment.
- "Je ne connais pas" quand on envoie autre chose dans le body de /chat
- "Derniers messages supprimés." lorsque l'on envoie une requête DELETE /messages/last.

Le serveur contient aussi une base de donnée en MongoDB permettant de logger chaque interactions entre l'utilisateur et la machine.

## Pré-requis
Installer MongoDB.

## Installation et exécution

```
$ git clone https://github.com/Thibma/HelloWorldJs.git
$ cd HelloWorldJs.git
$ mongod # executer le serveur MongoDB en local
$ npm install # pour installer les dépendances
$ npm start # pour exécuter le serveur
# presser ctrl-c pour quitter le serveur
```

## Comment tester le serveur

```
$ curl http://localhost:3000/ # doit retourner le texte “Hello World”
```
