const express = require('express');
fs = require('fs'),
morgan = require('morgan'),
path = require('path');

const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let topTenMovies = [
    {
        title: 'The Batman',
        Director: 'Matt Reeves'
    },
    {
        title: 'Aquaman',
        Director: 'James Wan'
    },
    {
        title: 'American Psycho',
        Director: 'Mary Harron'
    },
    {
        title: 'Fight Club',
        Director: 'David Fincher'
    },
    {
        title: 'American Assassin',
        Director: 'Michael Cuesta'
    },
    {
        title: 'The Dark Knight Rises',
        Director: 'Christopher Noloan'
    },
    {
        title: 'The Patriot',
        Director: 'Roland Emmerich'
    },
    {
        title: 'Gladiator',
        Director: 'Ridley Scott'
    },
    {
        title: 'John Wick',
        Director: 'Chad Stahelski'
    },
    {
        title: 'Jason Bourne',
        Director: 'Paul Greengrass'
    }
]
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(topTenMovies);
});

app.get('/', (req, res) => {
    res.send('Welcome to Movie Flix')
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
});

app.listen(8080, () => {
    console.log('The movie app has loaded and is listening on port 8080');
});