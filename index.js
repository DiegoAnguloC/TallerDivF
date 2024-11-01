const express = require ('express');
const app= express(); 
const PORT= 8080;

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.get('/',(req, res)=> {
    res.sendFile(__dirname + '/public/templates/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor: en http://localhost:${PORT}`);
});
