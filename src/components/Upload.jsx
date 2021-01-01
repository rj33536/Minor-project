import React, { useState } from 'react';
import firebase from "firebase";
import CircularProgress from '@material-ui/core/CircularProgress'
function Upload() {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [progress, setProgress] = useState(null);
    const [thumbImage, setThumbImage] = useState(null);
    const [thumbImageName, setThumbImageName] = useState(null);

    const uploadFile = (e) => {
        e.preventDefault();
        setProgress("uploading");
        const ref = firebase.storage().ref();
        const fileRefs = [ref.child(fileName), ref.child(thumbImageName)];
        console.log(fileRefs);
        Promise.all([fileRefs[0].put(file), fileRefs[1].put(thumbImage)])
            .then((res) => {
                console.log("uploaded a file");
                return Promise.all([fileRefs[0].getDownloadURL(), fileRefs[1].getDownloadURL()]);

            }).then(([videoUrl, thumbUrl]) => {
                console.log(videoUrl);
                const title = document.getElementById("title").value.replace(" ", "-");
                const language = document.getElementById("language").value;
                const categories = document.getElementById("categories").value;
                const description = document.getElementById("description").value;
                const obj = {
                    title,
                    language,
                    categories,
                    description,
                    author: "Rohit Jain",
                    path: videoUrl,
                    thumbUrl: thumbUrl,
                    id: title
                }
                setProgress("uploaded");
                return firebase.database().ref("/videos/").push(obj);
            })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const onChange = e => {
        const files = e.target.files;
        if (files && files[0]) {

            setFile(files[0]);
            setFileName(files[0].name);

        }
    }
    const onThumbChange = e => {
        const files = e.target.files;
        if (files && files[0]) {

            setThumbImage(files[0]);
            setThumbImageName(files[0].name);

        }
    }
    return (
        <form className="text-center p-5 text-light" onSubmit={uploadFile}>
            <h1 className="">Upload a video</h1>
            <div className="form-group">
                <label for="title">Video title</label>
                <input type="text" className="form-control" id="title" placeholder="Enter the Video title" />
            </div>
            <div className="form-group">
                <label for="language">Language</label>
                <select className="form-control" id="language">
                    <option>Engilish</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                    <option>Marathi</option>
                    <option>Kannad</option>
                </select>
            </div>
            <div className="form-group">
                <label for="categories">Categories</label>
                <select multiple className="form-control" id="categories">
                    <option>Romance</option>
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Thriller</option>
                    <option>Horror</option>
                </select>
            </div>
            <div className="form-group">
                <label for="description">Description</label>
                <textarea className="form-control" id="description" rows="3" placeholder="Enter the description"></textarea>
            </div>

            <div className="form-group">
                <label for="exampleFormControlFile1">Upload the video</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={onChange} />
            </div>
            <div className="form-group">
                <label for="exampleFormControlFile1">Upload the thumb Image</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={onThumbChange} />
            </div>
            <input type="submit" value="Upload" className="btn btn-primary w-75 m-4" />
            <div className={progress ? "d-block" : "d-none"}>
                {
                    progress === "uploading" ?
                        <CircularProgress /> : <h4 className="bg-success">uploaded</h4>
                }

            </div>
        </form>
    );
}
export default Upload;