import React, { Component } from 'react';

import Card from "./Card";
import {SERVER_URL} from "../utils/routes";
export default class Category extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }
    async componentDidMount() {
        try {
            const response = await fetch(`${SERVER_URL}/category/` + this.props.match.params.category);
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