const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

// Rutas de páginas principales basadas en la estructura
const routes = {
    home: '/index.html',
    articles: '/templates/articulos/articulos.html',
    readArticles: '/templates/articulos/leer_articulos.html',
    tutorials: '/templates/tutorial/tutorial.html',
    textualTutorials: '/templates/tutorial/leer_tutorial_escrito_mobile.html',
    videoTutorials: '/templates/tutorial/tutoria_video-mobile.html',
    authors: '/templates/autores/autores.html',
    successCases: '/templates/c_exito/casos_de_exitos.html',
    information: '/templates/informacion/informacion.html',
    login: '/templates/log_in/log_in.html',
    signup: '/templates/sign-up/sign_up.html'
};

const articulos = require('./public/assets/jsons/articulos.json');

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.home));
});

// Rutas específicas para las demás páginas
app.get('/articulos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.articles));
});

app.get('/articulos/leer', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.readArticles));
});

app.get('/tutoriales', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.tutorials));
});

app.get('/tutoriales/textuales', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.textualTutorials));
});

app.get('/tutoriales/videos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.videoTutorials));
});

app.get('/autores', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.authors));
});

app.get('/casos-de-exito', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.successCases));
});

app.get('/informacion', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.information));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.login));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', routes.signup));
});

app.get('/articulos/:id', (req, res) => {
    const articuloId = parseInt(req.params.id, 10); // Convertir ID a número
    const articulo = articulos.find(a => a.id === articuloId);

    if (articulo) {
        res.json(articulo); // Devuelve el artículo como JSON
    } else {
        res.status(404).send('Artículo no encontrado');
    }
});


// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución: http://localhost:${PORT}`);
    //console.log(`Servidor en: http://your-ip-address:${PORT}`);
});
