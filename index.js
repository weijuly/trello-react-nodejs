const express = require('express');
const app = express();
const moment = require('moment');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const port = process.env.PORT || 5000;


const reqLogger = createLogger({
    format: combine(timestamp(), printf(req => {
        return `${moment().format('YYYY-MM-DD hh:mm:ss')} ${req.message.method} ${req.message.httpVersion} ${req.message.url}`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/http.log', level: 'info' })
    ]
});

const appLogger = createLogger({
    format: combine(timestamp(), printf(message => {
        return `${moment().format('YYYY-MM-DD hh:mm:ss')} ${message.level} ${message.message}`;
    })),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log', level: 'info' })
    ]
});


app.use('/api', (req, res, nxt) => {
    reqLogger.info(req);
    nxt();
});

app.get('/api/cards', (req, res) => {
    res.send({
        cards: [
            {
                id: 'card-01',
                header: 'Task 01',
                description: 'task description',
                due: new Date(),
                state: 'b',
                owner: 'gganesan'
            },
            {
                id: 'card-02',
                header: 'Task 02',
                description: 'task description',
                due: new Date(),
                state: 'b',
                owner: 'sthirugnanansamba'
            },
        ]});
});

app.listen(port, () => console.log(`Listening on port ${port}`));