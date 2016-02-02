/**
 * Created by boris on 1/29/16.
 */


const express = require('express');
const feed = require('feed-read');
const path = require('path');
const parser = require('body-parser');

var app = express();
app.use(parser.urlencoded({extended: true}));
app.use(app.router);
app.use(express.static(path.join(__dirname.replace(/[^-]server/g, ''), 'client')));

app.get('/', function (req, res) {
    res.sendfile(path.join(__dirname.replace(/[^-]server/g, '/client/'), 'index.html'));
});

app.post('/feeds', function (req, res) {
    console.log(req.ip);
    var rssUrl = Object.keys(req.body)[0];
    console.log('RSS link ', rssUrl);

    feed(rssUrl, function (err, articles) {
        if (err) {
            console.error(new Error(err));
            res.writeHead(404);
            res.end('<p>Error fetching feed</p>');
        } else {
            //Set Headers for CORS
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.end(JSON.stringify(articles));
        }
    });
});
app.listen(3232);
