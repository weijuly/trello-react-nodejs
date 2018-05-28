const express = require('express');
const app = express();
const moment = require('moment');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongodb = require('mongodb').MongoClient;
const morgan = require('morgan');

const appLogger = createLogger({
    format: combine(timestamp(), printf(message => {
        return `${moment().format('YYYY-MM-DD hh:mm:ss')} ${message.level} ${message.message}`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log', level: 'info' })
    ]
});

app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/api/cards', (req, res) => {
    content = {cards:[]}
    mongodb.connect('mongodb://trello:password@localhost:27017/trello', (error, connection) => {
        if(error) {
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
            for(i = 0; i < cards.length; i++ ){
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

    // res.send({
    //     cards: [
    //         {
    //             id: 'card-01',
    //             header: 'Task 01',
    //             description: 'task description',
    //             due: new Date(),
    //             state: 'b',
    //             owner: 'gganesan'
    //         },
    //         {
    //             id: 'card-02',
    //             header: 'Task 02',
    //             description: 'task description',
    //             due: new Date(),
    //             state: 'b',
    //             owner: 'sthirugnanansamba'
    //         },
    //     ]});
});

app.post('/api/cards', (req, res) => {
    res.set({
        'Content-type': 'application/json',
        'date': new Date(),
        'server': 'api.trello.com'
    });
    mongodb.connect('mongodb://trello:password@localhost:27017/trello', (error, connection) => {
        if(error) {
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

app.listen(port, () => console.log(`Listening on port ${port}`));