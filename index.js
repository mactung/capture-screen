const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static('public'))


const sreenshootFunction = require('./src/functions/screen-shot');
const youtubeFunction = require('./src/functions/youtube');

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/src/public/index.html');
})
app.post('/screen-shot', (req, res)=> {
    console.log(req.body);
    sreenshootFunction(req.body.url).then((data)=> {
        res.status(200).send({
            ...data,
            status: 'successfuly'
        });
    }).catch(err => res.status(200).send({
        status: 'fail'
    }));
})
app.get('/youtube', (req, res)=> {
    console.log(req.query.url);
    youtubeFunction(req.query.url, res)
})

app.listen(3000, ()=> {
    console.log('Server is running on PORT http://localhost:8080/')
})