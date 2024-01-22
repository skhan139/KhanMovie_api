const express = require('express'),
 morgan = require('morgan'),
 bodyParser = require('body-parser'),
 uuid = require('uuid');
const app = express();
app.use(bodyParser.json()); //any time using req.body, the data will be expected to be in JSON format
// log all requests
app.use(morgan('common'));
// Users
let users = [
    {
        id: 1,
        name: 'Alex',
        favoriteMovies: ['American Psycho']
    },
    {
        id: 2,
        name: 'Kelly',
        favoriteMovies: []
    }
]
// Movies
let topMovies = [
    {
        title: 'American Psycho',
        year: '2000',
        genre: {
            genreName: 'Crime/Drama',
            description: 'Crime and Drama genres in film explore the psychological and criminal aspects of characters lives. Crime delves into unlawful activities, investigations, and mysteries, while Drama adds depth through character development, emotions, and intricate storytelling.'
        },
        director: {
            directorName: 'Mary Harron',
            birth: '1953'
        }
    },
    {
        title: 'Fight Club',
        year: '1999',
        genre: {
            genreName: 'Drama',
            description: 'Drama in film examines human experiences, emotions, and relationships. It often delves into complex themes, character development, and societal issues, providing thought-provoking narratives.'
        },
        director: {
            directorName: 'David Fincher',
            birth: '1962'
        }
    },
    {
        title: 'American Assassin',
        year: '2017',
        genre: {
            genreName: 'Action/Thriller',
            description: 'Action features intense and stylishly choreographed sequences, while Thriller adds suspense and intrigue. This combination delivers a captivating cinematic experience with high-stakes situations.'
        },
        director: {
            directorName: 'Chad Stahelski',
            birth: '1968'
        }
    },
    {
        title: 'The Dark Knight Rises',
        year: '2012',
        genre: {
            genreName: 'Action/Adventure',
            description: 'Action combines high-stakes sequences with dynamic elements, while Adventure explores journeys, challenges, and heroic quests. Together, they create an exciting and visually captivating cinematic experience.'
        },
        director: {
            directorName: 'Christopher Nolan',
            birth: '1970'
        }
    },
    {
        title: 'The Patriot',
        year: '2000',
        genre: {
            genreName: 'Action/Drama',
            description: 'Action provides thrilling combat and sequences, while Drama adds emotional depth and explores character motivations. This combination creates a compelling narrative with intense action and character-driven storytelling.'
        },
        director: {
            directorName: 'Roland Emmerich',
            birth: '1955'
        }
    },
    {
        title: 'Gladiator',
        year: '2000',
        genre: {
            genreName: 'Action/Drama',
            description: 'Action provides thrilling combat and sequences, while Drama adds emotional depth and explores character motivations. This combination creates a compelling narrative with intense action and character-driven storytelling.'
        },
        director: {
            directorName: 'Ridley Scott',
            birth: '1937'
        }
    },
    {
        title: 'John Wick',
        year: '2014',
        genre: {
            genreName: 'Action/Thriller',
            description: 'Action features intense and stylishly choreographed sequences, while Thriller adds suspense and intrigue. This combination delivers a captivating cinematic experience with high-stakes situations.'
        },
        director: {
            directorName: 'Chad Stahelski',
            birth: '1968'
        }
    },
    {
        title: 'Jason Bourne',
        year: '2016',
        genre: {
            genreName: 'Action/Thriller',
            description: 'Action features intense and stylishly choreographed sequences, while Thriller adds suspense and intrigue. This combination delivers a captivating cinematic experience with high-stakes situations'
        },
        director: {
            directorName: 'Paul Greengrass',
            birth: '1955'
        }
    },
    {
        title: 'The Batman',
        year: '2022',
        genre: {
            genreName: 'Crime, Drama',
            description: 'Crime and Drama genres in film explore the psychological and criminal aspects of characters lives. Crime delves into unlawful activities, investigations, and mysteries, while Drama adds depth through character development, emotions, and intricate storytelling.'
        },
        director: {
            directorName: 'Matt Reeves',
            birth: '1966'
        }
    },
    {
        title: 'Aquaman',
        year: '2023',
        genre: {
            genreName: 'Adventure, Fantasy',
            description: 'The Adventure/Fantasy genre combines elements of thrilling journeys, magical realms, and epic quests. It often involves characters embarking on extraordinary adventures in fantastical settings filled with mythical creatures, magic, and otherworldly landscapes.'
        },
        director: {
            directorName: 'James Wan',
            birth: '1977'
        }
    }
]
// CREATE new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('Users need names.')
    }
})
// UPDATE user information
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    let user = users.find( user => user.id == id );
    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('There is no such user')
    }
})
// CREATE new favorite movie for user
app.post('/users/:id/:movieTitle', (req, res) => {
    const id = req.params.id;
    const movieTitle = req.params.movieTitle;
    let user = users.find( user => user.id == id );
    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(movieTitle + ' has been added to user ' + id + '\'s array');
    } else {
        res.status(400).send('There is no such user')
    }
})
// DELETE favorite movie for user
app.delete('/users/:id/:movieTitle', (req, res) => {
    const id = req.params.id;
    const movieTitle = req.params.movieTitle;
    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(movieTitle + ' has been removed from user ' + id + '\'s array');
        res.status(200).send(movieTitle + ' has been removed from user ' + id + '\'s array.');
    } else {
        res.status(400).send('There is no such user')
    }
})

// DELETE user
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    let user = users.find( user => user.id == id );


    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send('User ' + id + ' has been deleted.');
    } else {
        res.status(400).send('There is no such user')
    }
})
// READ index page
app.get('/', (req, res) => {
    res.send('Welcome to my movie page!');
});
// READ movie list
app.get('/movies', (req, res) => {
    res.status(200).json(topMovies);
});
// READ movie by title
app.get('/movies/:title', (req, res) => {
    const title = req.params.title;
    const movie = topMovies.find( movie => movie.title === title );
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('There is no such movie.')
    }
})
// READ genre by name
app.get('/movies/genre/:genreName', (req, res) => {
    const genreName = req.params.genreName;
    const genre = topMovies.find( movie => movie.genre.genreName === genreName ).genre;
    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('There is no such genre.')
    }
})
// READ director by name
app.get('/movies/directors/:directorName', (req, res) => {
    const directorName = req.params.directorName;
    const director = topMovies.find( movie => movie.director.directorName === directorName ).director;
    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('There is no such director.')
    }
})
app.use(express.static('public'));
// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// listen for request
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
})