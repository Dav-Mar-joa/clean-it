const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const checklistRoutes = require('./routes/checklist');
app.use('/checklist', checklistRoutes); // <- ici on change le point de montage

const ChecklistItem = require('./models/Checklist');
const Commentaires = require('./models/Commentaires');

// Route principale
// app.get('/', async (req, res) => {
//   try {
//     const checklist = await ChecklistItem.find();
//     // console.log("------------- ", checklist);
//     res.render('index', { checklist: checklist || [] });
//   } catch (error) {
//     console.error('Erreur lors du chargement de la checklist :', error);
//     res.render('index', { checklist: [] });
//   }
// });

app.get('/', async (req, res) => {
  try {
    const checklist = await ChecklistItem.find();
    const commentaires = await Commentaires.find();  // Récupère les commentaires
    res.render('index', { checklist: checklist || [], commentaires: commentaires || [] });
  } catch (error) {
    console.error('Erreur lors du chargement de la checklist :', error);
    res.render('index', { checklist: [], commentaires: [] });
  }
});


// Route POST pour cocher/décocher un item
app.post('/toggle/:id', express.urlencoded({ extended: true }), async (req, res) => {
  const item = await ChecklistItem.findById(req.params.id);
  item.done = !item.done;
  await item.save();
  res.redirect('/');
});

// Route POST pour réinitialiser tous les items (les remettre à false)
app.post('/reset', express.urlencoded({ extended: true }), async (req, res) => {
  try {
    const items = await ChecklistItem.find();
    for (const item of items) {
      item.done = false;
      await item.save();
    }
    res.redirect('/');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation :', error);
    res.redirect('/');
  }
});

app.post('/commentaires', async (req, res) => {
  console.log("Données reçues dans le formulaire : ", req.body); // Affiche les données reçues
  const date = new Date().toLocaleString();
  console.log(date);
  try {
    const nouveauCommentaire = new Commentaires({
      texte: req.body.commentaires,
      date: date
    });
    await nouveauCommentaire.save();
    res.redirect('/');
  } catch (error) {
    console.error('Erreur lors de l\'ajout d\'un commentaire :', error);
    res.redirect('/');
  }
});

app.get('/commentaires', async (req, res) => {
  try {
    const commentaires = await Commentaires.find();
    res.render('index', { commentaires });
  } catch (error) {
    console.error('Erreur lors du chargement des commentaires :', error);
    res.render('index', { commentaires: [] });
  }
});

app.post('/commentaires/supprimer/:id', async (req, res) => {
  try {
    await Commentaires.findByIdAndDelete(req.params.id);
    res.redirect('/');  // Redirige vers la page principale après la suppression
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire :', error);
    res.redirect('/');  // En cas d'erreur, redirige quand même vers la page principale
  }
});



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
