const express = require('express');
const app = express();
const fs = require('fs');
const getStat = require('util').promisify(fs.stat);

const highWaterMark = 2; // buffer test

app.use(express.static('public'));

app.get('/audio', async (req, res) => {

    const file = './data/sample.ogg';
    const stat = await getStat(file);
    console.log(stat);

    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });

    const stream = fs.createReadStream(file, { highWaterMark });

    stream.on('end', () => console.log('Audio loaded!'));

    stream.pipe(res);

});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});