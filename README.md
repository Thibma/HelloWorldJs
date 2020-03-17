# Thibault BALSAMO

Ce dépot contient un serveur web / API en Node.js.

Ce serveur répond :
- "Hello World" quand on envoie une requête HTTP GET à la racine.
- "Quelle est votre nom ?" quand on envoie une requête HTTP GET à /hello.
- Votre nom si vous spécifiez un nom à la requête HTTP GET à /hello.
- "Nous sommes à Paris" quand on envoie une requête POST GET à /chat avec un body "ville".
- "Il fait beau" quand on envoie une requête HTTP POST à /chat avec un body "meteo".
- "Merci pour cette information !" quand on lui envoie une requête POST /chat à sauvegarder sous la forme "clé = valeur"
- "clé: valeur" quand on on lui envoie une requête POST /chat du JSON sauvegardé précédemment.
- "Je ne connais pas" quand on envoie autre chose dans le body de /chat

## Installation et exécution

```
$ git clone https://github.com/Thibma/HelloWorldJs.git
$ cd HelloWorldJs.git
$ npm install # pour installer les dépendances
$ npm start # pour exécuter le serveur
# presser ctrl-c pour quitter le serveur
```

## Comment tester le serveur

```
$ curl http://localhost:3000/ # doit retourner le texte “Hello World”
```
