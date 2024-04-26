import express from 'express';

const app = express();
const state = {};

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/setkeyvalue', (req, res) => {
    const key = req.query.key;
    const value = req.query.value;
    const secret = req.headers.secret;
    if (!key || !value || !secret || secret !== process.env.SECRET) {
        return res.status(400).send('Bad Request.');
    }
    state[key] = value;
    res.send('Data has been synced');
});

app.get('/getkeyvalue', (req, res) => {
    const key = req.query.key;
    const secret = req.headers.secret;
    if (!key || !secret || secret !== process.env.SECRET) {
        return res.status(400).send('Bad Request.');
    }
    if (!state[key]) {
        return res.status(404).send('Data not found');
    }
    res.send(state[key]);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is running on port 8080');
});
