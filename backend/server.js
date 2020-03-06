const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.post('/api/signUp', (req, res) => {
    console.log(req.body);
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));