// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const ChecklistItem = require('./models/Checklist');

const checklistData = [
    { texte: "Appliquer du détartrant dans les toilettes et laisser agir pendant au moins 30 minutes." },
    { texte: "Dépoussiérer les surfaces – le plumeau se trouve sous l’évier de la cuisine." },
    { texte: "Nettoyer le coin cuisine – le vinaigre ménager et l’éponge sont disponibles sous l’évier." },
    { texte: "Vérifier l’état de propreté du micro-ondes et du réfrigérateur." },
    { texte: "Nettoyer la petite table blanche et les sets de table sur le bar avec du vinaigre." },
    { texte: "Retirer les draps usagés et les ranger dans un des placards au pied du lit." },
    { texte: "Retirer les serviettes sales ainsi que le tapis de douche de la salle de bain." },
    { texte: "Nettoyer la salle de bain (lavabo, robinet, vitre, douche) avec du vinaigre – éponge disponible derrière la colonne du lavabo." },
    { texte: "Brosser l’intérieur des toilettes après 30 minutes, puis nettoyer avec une lingette – lingettes disponibles sous l’évier." },
    { texte: "Passer l’aspirateur – il est rangé dans les combles." },
    { texte: "Faire le lit." },
    { texte: "Disposer les serviettes propres sur les porte-serviettes." },
    { texte: "Placer le tapis de bain propre à cheval sur la paroi de la douche." },
    { texte: "Vider la poubelle et installer un nouveau sac vert – les sacs sont sous l’évier." },
    { texte: "Laver le sol – le balai serpillère et le seau sont devant les combles, le produit se trouve sous l’évier." }
  ];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await ChecklistItem.deleteMany({});
  await ChecklistItem.insertMany(checklistData);
  console.log("Checklist insérée avec succès !");
  mongoose.disconnect();
}).catch(err => {
  console.error("Erreur lors de l’insertion :", err);
});
