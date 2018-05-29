const express = require('express');
const app = express();
const moment = require('moment');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const appLogger = createLogger({
    format: combine(timestamp(), printf(message => {
        return `${moment().format('YYYY-MM-DD hh:mm:ss')} ${message.level} ${message.message}`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'logs/app.log', level: 'info'})
    ]
});

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    key: 'TrelloSession',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
}));





app.use((req, res, next) => {
    if (req.cookies.TrelloSession && !req.session.user) {
        res.clearCookie('TrelloSession');
    }
    next();
});
const sessionChecker = (req, res, next) => {
    if (req.cookies.TrelloSession && req.session.user) {
        res.redirect('/');
    }
    next();
};


app.get('/api/cards', (req, res) => {
    content = {cards: []}
    mongodb.connect('mongodb://trello:password@localhost:27017/trello', (error, connection) => {
        if (error) {
            appLogger.error(error.toString());
            res.status(500).send({
                error: error.toString()
            });
            return;
        }
        console.log('Connection success');
        database = connection.db('trello');
        database.collection('trello').find({}).toArray((error, cards) => {
            if (error) {
                appLogger.error(error.toString());
                res.status(500).send({
                    error: error.toString()
                });
                return;
            }
            for (i = 0; i < cards.length; i++) {
                content.cards.push({
                    id: cards[i]._id.toString(),
                    header: cards[i].header,
                    description: cards[i].description,
                    due: cards[i].due,
                    state: cards[i].state,
                    owner: cards[i].owner
                });
            }
            res.send(content);
            connection.close();
        });
    });
});

app.post('/api/cards', (req, res) => {
    mongodb.connect('mongodb://trello:password@localhost:27017/trello', (error, connection) => {
        if (error) {
            appLogger.error(error.toString());
            res.status(500).send({
                error: error.toString()
            });
            return;
        }
        database = connection.db('trello');
        database.collection('trello').insertOne(req.body, (error, result) => {
            if (error) {
                appLogger.error(error.toString());
                res.status(500).send({
                    error: error.toString()
                });
                return;
            }
            res.status(201).send({
                error: ''
            });
            connection.close();
        });
    });
});

app.patch('/api/cards/:card', (req, res) => {
    mongodb.connect('mongodb://trello:password@localhost:27017/trello', (error, connection) => {
        if (error) {
            appLogger.error(error.toString());
            res.status(500).send({
                error: error.toString()
            });
            return;
        }
        database = connection.db('trello');
        database.collection('trello').updateOne({
            _id: ObjectID(req.body.id)
        }, {
            $set: {
                header: req.body.header,
                description: req.body.description,
                due: req.body.due,
                state: req.body.state,
                owner: req.body.owner
            }
        }, (error, result) => {
            if (error) {
                appLogger.error(error.toString());
                res.status(500).send({
                    error: error.toString()
                });
                return;
            }
            res.send({
                error: '',
                message: 'req.body.id updated successfully'
            });
            connection.close();
        });
    });
});

app.post('/api/auth', (req, res) => {
    if(req.body.user === 'gopi') {
        res.send({});
    } else {
        res.status(401).send({});
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`));