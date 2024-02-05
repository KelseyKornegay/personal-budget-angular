// Budget API


const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use('/', express.static('public')); /*this opens the personal budget website onto local host, from public folder*/

app.use(cors());

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};

app.get('/hello', (req, res) => {   /*would have to go to localhost:3000/hello to see this */
    res.send('Hello World!');
});


app.get('/budget', (req, res) => {  /*creates a new route, so if they go to /budget, they get a response of json, not html, and passes object (const budget above) to be transformed into json*/
    res.json(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);  /*the address of where my page is rendered*/
});


/*All below follows video @ 5:50 */
/*
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
*/