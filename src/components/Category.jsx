import React, { Component } from 'react';

import Card from "./Card"
export default class Category extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:4000/category/' + this.props.match.params.category);
            console.log(this.props);
            let data = await response.json();
            data = [...data];
            this.setState({ videos: [...data] });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <div className="App App-header">
                <div className="">
                    <div className="d-flex">
                        {this.state.videos.map(video =>
                            <Card video={video} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}