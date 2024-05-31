const express = require('express')
const app = express()
const port = 5000

const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    const hour = date.getHours();

    
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Si c'est dans les heures ouvrables, passer au middleware suivant
    } else {
        res.status(403).send('Désolé, l\'application est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).');
    }
};

app.use(checkWorkingHours);


app.get('/service', (req, res) => {
    res.send('Bienvenue sur l\'application web.');
});

app.get('/accueil', (req, res) => {
    res.send('Bienvenue ');
});

app.get('/contact', (req, res) => {
    res.send('Bienvenue sur l\'application web.');
});


app.use(express.static(path.join(__dirname, 'public')));

// Route pour servir le fichier HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'accueil', 'service', 'contact'));
});


app.listen(port, () => {
  console.log(`server app listening on port ${port}`)
})