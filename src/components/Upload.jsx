import React, { useState } from 'react';
import firebase from "firebase";
import CircularProgress from '@material-ui/core/CircularProgress'
function Upload() {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [progress, setProgress] = useState(null);
    const uploadFile = (e) => {
        e.preventDefault();
        setProgress("uploading");
        const ref = firebase.storage().ref();
        const fileRef = ref.child(fileName);

        fileRef.put(file).then((res) => {
            console.log("uploaded a file");
            console.log(res);
            setProgress("uploaded");
        }).catch(err => {
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
    return (
        <form className="text-center p-5 text-light" onSubmit={uploadFile}>
            <h1 className="">Upload a video</h1>
            <div className="form-group">
                <label for="exampleFormControlInput1">Video title</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter the Video title" />
            </div>
            <div className="form-group">
                <label for="exampleFormControlSelect1">Language</label>
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>Engilish</option>
                    <option>Hindi</option>
                    <option>Telugu</option>
                    <option>Marathi</option>
                    <option>Kannad</option>
                </select>
            </div>
            <div className="form-group">
                <label for="exampleFormControlSelect2">Categories</label>
                <select multiple className="form-control" id="exampleFormControlSelect2">
                    <option>Romance</option>
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Thriller</option>
                    <option>Horror</option>
                </select>
            </div>
            <div className="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Enter the description"></textarea>
            </div>

            <div className="form-group">
                <label for="exampleFormControlFile1">Upload the video</label>
                <input type="file" className="form-control-file" id="exampleFormControlFile1" onChange={onChange} />
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