import React, { Component } from 'react';
import Carousel from "./Carousel";
import Slider from "./Slider"
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            videos: [],
            categories: [
                "romance",
                "action",
                "comedy"
            ]
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/videos');
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