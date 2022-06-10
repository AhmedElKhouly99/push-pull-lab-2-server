const express = require('express');
const cors = require('cors');
const { all } = require('express/lib/application');

const app = express();
app.use(express.json());
app.use(cors());

const allMessages = [];


app.post('/messages', (req, res) => {
    console.log(req.body);
    allMessages.push(req.body.msg);
    res.sendStatus(204);
});

app.get('/messages', async (req, res) => {
    const { len } = req.query;
    console.log(len);
    const newMsg = (allMessages.slice(len - allMessages.length));
    res.send(newMsg);
});

const subscribers = {};
const allMessagesLong = [];

app.get('/messages-long', (req, res) => {
    if (+req.query.all === 1) {
        res.send(allMessagesLong)
    } else {
        const id = Math.ceil(Math.random() * 100000);
        subscribers[id] = res;
    }
});


app.post('/messages-long', async(req, res) => {
    const { body } = req;
    allMessagesLong.push(body.msg);
    console.log(body);
    Object.entries(subscribers).forEach(([id, response]) => {
        response.json(body.msg);
        delete subscribers[id];
    });
    res.sendStatus(204);
});


app.listen(3001, () => {
    console.log('chat server is running ...');
});