import express from 'express';

const app = express();
const state = {};

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/setkeyvalue', (req, res) => {
    const key = req.query.key;
    const value = req.query.value;
    if (!key || !value) {
        return res.status(400).send('Bad Request. Missing either githubworkflowId, environmentId or ipAddress');
    }
    state[key] = value;
    res.send('Data has been synced');
});

app.get('/getkeyvalue', (req, res) => {
    const key = req.query.key;
    if (!key) {
        return res.status(400).send('Bad Request. Missing githubworkflowId');
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
