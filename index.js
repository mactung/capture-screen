const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.static('public'))


const sreenshootFunction = require('./src/functions/screenshoot');
const youtubeFunction = require('./src/functions/youtube');

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/src/public/index.html');
})
app.post('/screen-shoot', (req, res)=> {
    console.log(req.body);
    sreenshootFunction(req.body.url).then((data)=> {
        res.status(200).send(data);
    });
})
app.get('/youtube', (req, res)=> {
    console.log(req.query.url);
    youtubeFunction(req.query.url, res)
})

app.listen(8080, ()=> {
    console.log('Server is running on PORT 8080')
})