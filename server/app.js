const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const firebase = require("firebase");
firebase.initializeApp({
    apiKey: "AIzaSyAg9wWi7OccQPxDYWWKIeNMdcOvds-3_iE",
    authDomain: "workout-clock.firebaseapp.com",
    databaseURL: "https://workout-clock.firebaseio.com",
    projectId: "workout-clock",
    storageBucket: "workout-clock.appspot.com",
    messagingSenderId: "563160271644",
    appId: "1:563160271644:web:c939c10fd327bd27d508d9"
})


let videos = [

];



firebase.database().ref("videos").once("value").then((snapshot) => {
    console.log();
    let rv = snapshot.val();
    Object.keys(rv).map((obj) => {
        console.log(obj);
        console.log(rv[obj])
        videos.push(rv[obj])
    })
    console.log(videos);
})


const app = express();
app.use(cors());
app.get('/videos', (req, res) => res.json(videos));

app.get('/category/:category', (req, res) => {
    const filtered = videos.filter((video) => {
        return video.categories === req.params.category;
        //return video.categories.includes(req.params.category);
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