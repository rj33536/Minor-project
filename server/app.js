const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// add after require() statements

const videos = [
    {
        id: 0,
        poster: '/video/0/poster',
        duration: '3 mins',
        name: 'Sample 1',
        categories: ["action", "romance"]
    },
    {
        id: 1,
        poster: '/video/1/poster',
        duration: '4 mins',
        name: 'Sample 2',
        categories: ["comedy", "romance"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
    {
        id: 2,
        poster: '/video/2/poster',
        duration: '2 mins',
        name: 'Sample 3',
        categories: ["action", "comedy"]
    },
];


const app = express();
app.use(cors());
app.get('/videos', (req, res) => res.json(videos));

app.get('/category/:category', (req, res) => {
    const filtered = videos.filter((video) => {
        return video.categories.includes(req.params.category);
    })

    res.json(filtered)
});

// add after app.get('/video/:id/data', ...) route

app.get('/video/:id', (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

const thumbsupply = require('thumbsupply');

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});

app.get('/video/:id/poster', (req, res) => {
    thumbsupply.generateThumbnail(`assets/${req.params.id}.mp4`)
        .then(thumb => res.sendFile(thumb))
        .catch(err => {
            //console.log(err);
            res.send("something wrong with thumbnail")
        });
});

// add after the app.get('/video/:id/poster', ...) route

app.get('/video/:id/caption', (req, res) => res.sendFile('assets/captions/sample.vtt', { root: __dirname }));