import React, { Component } from 'react';
import Slider from "./Slider";
import UserContext from "../App.js";
import firebase from "firebase";
import { SERVER_URL } from '../utils/routes';
// add below the other import statements


export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {},
            videoUrl: "",
            user: { id: "rj33536" }
        };
    }
    async setRating(rating, user) {
        const data = this.state.videoData;
        data.rating = rating;

        const res = await fetch(`${SERVER_URL}/rate?userId=${this.state.user.id}&movieId=${this.state.videoData.id}&rating=${rating}`)
        console.log(res.text());
        this.setState({ videoData: data });

    }
    async componentDidMount() {
        try {
            const res = await fetch(`${SERVER_URL}/video/${this.state.videoId}/data`);
            const data = await res.json();
            //console.log(data);
            data.rating = data.rating ? data.rating : 0;
            document.getElementsByTagName("video")[0].src = data.path;

            firebase.database().ref("ratings")
                .orderByChild("userId")
                .equalTo(this.state.user.id)
                .once("value").then((snapshot) => {
                    console.log();
                    snapshot.forEach((snp) => {
                        let obj = snp.val();
                        console.log(obj);
                        if (obj.movieId === this.state.videoId) {
                            const data = this.state.videoData;
                            data.rating = obj.rating;
                            this.setState({ videoData: data })
                        }
                    })


                })
            this.setState({ videoData: data, videoUrl: data.path });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App App-header">


                <video controls muted autoPlay crossOrigin="anonymous">
                    <track label="English" kind="captions" srcLang="en" src={`${SERVER_URL}/video/${this.state.videoId}/caption`} default></track>
                </video>
                <div className="details p-4">

                    <p className="text-underline">{this.state.videoData.title}</p>
                    <h2>Description</h2>
                    <p className="text-muted">{this.state.videoData.categories}</p>
                    <p className="text-muted">18+</p>
                    <div id="rating">

                        <span className={this.state.videoData.rating >= 1 ? "fa fa-star checked" : "fa fa-star"} onClick={() => { this.setRating(1) }}></span>
                        <span className={this.state.videoData.rating >= 2 ? "fa fa-star checked" : "fa fa-star"} onClick={() => { this.setRating(2) }}></span>
                        <span className={this.state.videoData.rating >= 3 ? "fa fa-star checked" : "fa fa-star"} onClick={() => { this.setRating(3) }}></span>
                        <span className={this.state.videoData.rating >= 4 ? "fa fa-star checked" : "fa fa-star"} onClick={() => { this.setRating(4) }}></span>
                        <span className={this.state.videoData.rating >= 5 ? "fa fa-star checked" : "fa fa-star"} onClick={() => { this.setRating(5) }}></span>

                    </div>
                    <p>{this.state.videoData.description}</p>
                    <div className=" mt-5">
                        <Slider category="Recommended for you" />
                    </div>
                    <div className=" mt-5">
                        <Slider category="Most Watched" />
                    </div>




                </div>

            </div>
        )
    }
}