# SupGo - Le twisto du futur

## Andrew MAHÉ - Gwenegan AFFAGARD - Pierre-André MAYOUX

## Setup
```bash
git clone https://github.com/roxasenjoy/SupGo.git
cd SupGo
npm install
npx hardhat run --network goerli scripts/deploy.js
npm start
```

Une fois le projet en votre possession.

Une fois dans le repo du projet, aller dans le fichier se trouvant à l'emplacement suivant :"src/components/Navbar.js" et changer la valeur de la ligne 13 avec votre adresse de Wallet MetaMask afin d'avoir les droits admin.

Lancer la commande "npm install" pour initialiser le projet. Puis "npm start" pour lancer le projet.

Une fois le projet lancé, ouvrir son navigateur favoris et se rendre à l'adresse suivante : "localHost:3000".


## Application 

Prenons l’exemple d’un utilisateur qui utiliserait notre marketplace :

En se rendant à l’adresse de celui-ci, il tombera sur la page principale qui est la marketplace.

L’utilisateur s'identifie alors avec le bouton en haut à droite « connecter ».

Une fois identifié l’utilisateur aura accès à tous les tickets et cartes privilèges qui ont été créées auparavant par l’admin de la marketplace depuis l’onglet « ajouter un ticket » disponible uniquement pour un compte admin.

Imaginons maintenant que l’utilisateur achète une carte privilège de 50%, il aura alors une réduction de 50% lors de son prochain achat de ticket (évidemment cela ne fonctionne pas sur une nouvelle carte privilège).

Une fois la carte privilège et le ticket acheté ceux-ci disparaissent des tickets disponibles à l’achat.

L’heureux propriétaire d’un ticket et d’une carte privilège peut alors consulter ses biens dans l’onglet « Mes tickets ».


### Informations générales
- Pour deployer le contract : npx hardhat run --network goerli scripts/deploy.js
- Pour récupérer les images : https://app.pinata.cloud/pinmanager
- Pour récupérer la clé ALCHEMY : https://dashboard.alchemy.com/
- Pour récupérer des Goerli : https://goerlifaucet.com/


-----------------------------------------------------------------------
# EXPLICATION DU PROJET
1 - Project overview
You are part of SupRailRoad & co and as such are task to provide a PoC for a solution being designed to be use by all people using the company (train, subway, bus ...)
With this new era of technology, the company want to ditch the old paper ticket and provide a full solution allowing people to order reduction cards but also ticket. This need to be using blockchain technology as this is to be used by all companies in Europe and not just your country.

The project can be done by teams of 3 peoples maximum

This project is about building both the frontend and the contracts needed. If one is missing your grade will automatically be 0

 

2 - Features
Your project is to build a website and smart contracts allowing you and your customers to buy privilege card and book a trip. In a certain way this can be seen as using some functionalities of OpenSea (or other NFT trading solutions)

Here are the basics overview of the functionalities. Of course, quality and security are directly impacting your production

Privilege card

allow "admin" to create multiples cards
each card available in a certain amount
each card with a specific name, price, number of card, image and description
allow user to "buy" them
User

can buy a  privilege card
card can be listed on a specific page
card can be sold to someone else (and /or sent)
Ticket

users can buy a train / bus / subway ticket
base price for the ticket is the same
a reduction is applied based on the cards owned by the user
only the card with the biggest advantage is used (so 3 cards with 10% / 25% / 50% in the account, only the 50% is used)
tickets are not refundable
 

3 - Tips
Contracts

Start building on default contract and expend around it.
No need to implement all feature before trying to build your interface
Depending on the number of tests and how you build your solution it can take time to have enough "free ETH" to run everything on a test network (you are limited to 0.1 eth/day from the faucets)
try to test the contracts and deploys
Frontend

You are free to design your own interface but it is expected to be usable without to much hasle
Quality of your code will matter
Try to think about optimization (both on how to work with the contract but also on your frontend code)
Think about your users ! Display error, warning and helps
Documentation

Write a good and easy to follow documentation
Think about edge cases and display that you were able to think about them
Writing automated tests is a great way to display that your features are working
If you use different tool, explain which one and why. And don't forget to add a readme for the setup
 

4 - Deliverables
 

You need to submit an archive containing the source code of your project both frontend and contract. You also need to provide a full documentation of your solution and how to install it if necessary. In case of missing information (or not working) you will lose some points

The end date is 13th December at 23h59

 

5 - Graded items
Contract: 8pts

Frontend: 8pts

Documentation: 4pts

