# SupGo - Le twisto du futur

## Setup
```bash
git clone https://github.com/roxasenjoy/SupGo.git
cd SupGo
npm install
npm start
```


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


