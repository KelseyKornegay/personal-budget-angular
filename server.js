// Budget API


const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const port = 3000;

app.use('/', express.static('public')); /*this opens the personal budget website onto local host, from public folder*/

app.use(cors());


app.get('/hello', (req, res) => {   /*would have to go to localhost:3000/hello to see this */
    res.send('Hello World!');
});

/*
app.get('/budget', (req, res) => {  
   try {
    const data = fs.readFileSync('budget.json', 'utf-8');
    const budgetData = JSON.parse(data);
    res.json(budgetData);
   } catch (err) {
        console.log(err.message)
   }
});
*/
app.get('/budget', (req, res) => {
    fs.readFile('budget.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading budget data');
            return;
        }
        try {
            const budgetData = JSON.parse(data);
            res.json(budgetData);
        } catch (parseErr) {
            console.error(parseErr);
            res.status(500).send('Error parsing budget data');
        }
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);  /*the address of where my page is rendered*/
});


