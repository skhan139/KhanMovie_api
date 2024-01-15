const express = require('express');
fs = require('fs'),
morgan = require('morgan'),
path = require('path');

const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

let moviesDB = [
    {
        id: 1,
        title: 'The Batman',
        url: '/movies/The%20Batman'
    
    },
    {
        id: 2,
        title: 'Aquaman',
        url: '/movies/Aquaman'
    },
    {
        id: 3,
        title: 'American Psycho',
        url: '/movies/American%20Psycho'
    },
    {
        id: 4,
        title: 'Fight Club',
        url: '/movies/Fight%20Club'
    },
    {
        id: 5,
        title: 'American Assassin',
        url: '/movies/American%20Assassin'
    },
    {
        id: 6,
        title: 'The Dark Knight Rises',
        url: '/movies/The%20Dark%20Knight%20Rises'
    },
    {
        id: 7,
        title: 'The Patriot',
        url: '/movies/The%20Patriot'
    },
    {
        id: 8,
        title: 'Gladiator',
        url: '/movies/Gladiator'
    },
    {
        id: 9,
        title: 'John Wick',
        url: '/movies/John%20Wick'
    },
    {
        id: 10,
        title: 'Jason Bourne',
        url: '/movies/Jason%20Bourne'
    }
]
let movieDetails = [
    {
        id: 1,
        title: 'The Batman',
        director: 'Matt Reeves',
        genre: 'Action/Crime',
        releaseYear: 2022,
        imageUrl: '',
        featured: true
    },
    {
        id: 2,
        title: 'Aquaman',
        director: 'James Wan',
        genre: 'Action/Fantasy',
        releaseYear: 2018,
        imageUrl: '',
        featured: true
    },
        {
        id: 3,
        title: 'American Psycho',
        director: 'Mary Harron',
        genre: 'Crime/Drama',
        releaseYear: 2000,
        imageUrl: '',
        featured: true
    },
        {
        id: 4,
        title: 'Fight Club',
        director: 'David Fincher',
        genre: 'Drama',
        releaseYear: 1999,
        imageUrl: '',
        featured: true
    },
        {
        id: 5,
        title: 'American Assassin',
        director: 'Michael Cuesta',
        genre: 'Action/Thriller',
        releaseYear: 2017,
        imageUrl: '',
        featured: true
    },
        {
        id: 6,
        title: 'The Dark Knight Rises',
        director: 'Christopher Nolan',
        genre: 'Action/Adventure',
        releaseYear: 2012,
        imageUrl: '',
        featured: true
    },
        {
        id: 7,
        title: 'The Patriot',
        director: 'Roland Emmerich',
        genre: 'Action/Drama',
        releaseYear: 2000,
        imageUrl: '',
        featured: true
    },
        {
        id: 8,
        title: 'Gladiator',
        director: 'Ridley Scott',
        genre: 'Action/Drama',
        releaseYear: 2000,
        imageUrl: '',
        featured: true
    },
        {
        id: 9,
        title: 'John Wick',
        director: 'Chad Stahelski',
        genre: 'Thriller',
        releaseYear: 2014,
        imageUrl: '',
        featured: true
    },
        {
        id: 10,
        title: 'Jason Bourne',
        director: 'Paul Greengrass',
        genre: 'Thriller',
        releaseYear: 2017,
        imageUrl: '',
        featured: true
    }

];

let genres = [
    {
        title: 'action',
        description: 'a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.'
    }
];
let directors = [
    {
        name: "Matt Reeves",
        bio: "Matthew George Reeves is an American screenwriter, director, and producer. Reeves began his career as a screenwriter for the films Under Siege 2: Dark Territory (1995) and The Pallbearer (1996), the latter of which marked his feature-length directorial debut.",
        birthYear: 1966,
        deathYear: null
    },
    {
        name: "James Wan",
        bio: "James Wan is an Australian filmmaker. He has primarily worked in the horror genre as the co-creator of the Saw and Insidious franchises and the creator of The Conjuring Universe.",
        birthYear: 1977,
        deathYear: null
    },
     {
        name: "Mary Harron",
        bio: "Mary Harron is a Canadian filmmaker and screenwriter known for her work in independent cinema. She gained critical acclaim for directing films like 'American Psycho' and 'I Shot Andy Warhol.'",
        birthYear: 1953,
        deathYear: null
    },
    {
        name: "David Fincher",
        bio: "David Fincher is an American director and producer known for his work on films like 'Fight Club, 'Se7en', and 'The Social Network.' He is renowned for his distinct visual style and storytelling.",
        birthYear: 1962,
        deathYear: null
    },
    {
        name: "Michael Cuesta",
        bio: "Michael Cuesta is an American film and television director known for his work on projects like 'L.I.E.' and directing episodes of TV series such as 'Homeland' and 'Dexter' ",
        birthYear: 1963,
        deathYear: null
    },
    {
        name: "Christopher Nolan",
        bio: "Christopher Nolan is a British-American filmmaker known for his work on complex and visually stunning films such as 'The Dark Knight Trilogy,'' and 'Interstellar.' ",
        birthYear: 1970,
        deathYear: null
    },
    {
        name: "Roland Emmerich",
        bio: "Roland Emmerich is a German film director and producer known for his work on big-budget disaster and science fiction films such as 'Independence Day' and '2012.' ",
        birthYear: 1955,
        deathYear: null
    },
    {
        name: "Ridley Scott",
        bio: "Sir Ridley Scott is an English film director and producer known for his influential work in both science fiction ('Blade Runner,' 'Alien') and historical epics ('Gladiator,' 'Exodus: Gods and Kings')",
        birthYear: 1937,
        deathYear: null
    },
    {
        name: "Chad Stahelski",
        bio: "Chad Stahelski is an American film director and stuntman known for his work on the 'John Wick' film series. He has a background in martial arts and stunt coordination.",
        birthYear: 1968,
        deathYear: null
    },
    {
        name: "Paul Greengrass",
        bio: "Paul Greengrass is an English film director known for his contributions to the action thriller genre. He directed films like 'The Bourne Supremacy' and 'United 93' ",
        birthYear: 1955,
        deathYear: null
    },
];

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.json(moviesDB);
});
app.get('/movies/:title', (req, res) => {
    res.json(movieDetails.find((movie) => 
    { return movie.title === req.params.title }));
});

app.get('/genres/:title', (req, res) => {
    res.json(genres.find((genre) => 
    { return genre.title === req.params.title }));
});

app.get('/directors/:name', (req, res) => {
    res.json(directors.find((director) => 
    { return director.name === req.params.name }));
});

app.post('/users', (reg,res) => {
    res.send('Successful POST request, creating new user');
});

app.put('/users/:username', (req, res) => {
    res.send('Successful PUT request upadating user\'s username');
});

app.put('/users/:username/favorites/:movie-id', (req, res) => {
    res.send('Successful PUT request adding movie to user\'s favorites list');
});

app.delete('/users/:username/favorites/:movie-id', (req, res) => {
    res.send('Successful DELETE request removing movie from user\'s favorites movie list');
});

app.delete('/users/:username', (req, res) => {
    res.send('successful DELETE request removing user from list of users');
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