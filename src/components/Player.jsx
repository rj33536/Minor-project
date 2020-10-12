import React, { Component } from 'react';
import Slider from "./Slider"
// add below the other import statements


export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoId: this.props.match.params.id,
            videoData: {}
        };
    }
    async componentDidMount() {
        try {
            const res = await fetch(`http://localhost:4000/video/${this.state.videoId}/data`);
            const data = await res.json();
            this.setState({ videoData: data });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App App-header">


                <video controls muted autoPlay crossOrigin="anonymous">
                    <source src={`http://localhost:4000/video/${this.state.videoId}`} type="video/mp4"></source>
                    <track label="English" kind="captions" srcLang="en" src={`http://localhost:4000/video/${this.state.videoId}/caption`} default></track>
                </video>
                <div className="details p-4">

                    <p className="text-underline">Shakti</p>
                    <h2>Description</h2>
                    <p className="text-muted">4m | Hindi | Drama | 2016</p>
                    <p className="text-muted">18+</p>
                    <p>After seeing Nimmi being troubled by Harman's mother, Surbhi intervenes and gives her a taste of her own medicine.</p>
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