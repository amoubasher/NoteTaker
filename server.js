const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const PORT = process.env.PORT || 3001;
const app = express();


// Install all middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Middleware for the custom api route we created
app.use('/api/notes', apiRoutes);

// Get request for the notes page
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})


// Generate server
app.listen(PORT, () => console.log(`Your app is running at http://localhost:${PORT}`))