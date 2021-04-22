import React, { Component } from 'react';
import Carousel from "./Carousel";
import Slider from "./Slider"
import {SERVER_URL} from "../utils/routes";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            videos: [],
            categories: [
                "Recommended",
                "Romance",
                "Action",
                "Comedy",
                "Thriller",
                "Horror",
                "Adult"
            ]
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch(`${SERVER_URL}/videos`);
            const data = await response.json();
            this.setState({ videos: [...data] });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App App-header">

                <div className="container">
                    <Carousel />
                    {this.state.categories.map((category) => {
                        return (
                            <div className="row mt-5">
                                <Slider category={category} />
                            </div>
                        );
                    })}


                </div>
            </div>
        )
    }
}