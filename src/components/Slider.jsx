import React, { useState, useEffect } from 'react';
import Card from "./Card";
import axios from "axios";
import "../utils/firebase";
import firebase from "firebase"
import { SERVER_URL } from '../utils/routes';
export default function Carousel(props) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${SERVER_URL}/category/` + props.category);
                const data = await response.json();
                setVideos([...data]);
            } catch (error) {
            }
        }

        async function getMovies(list) {
            let movies = [];

            let allMovies = await firebase.database().ref("videos").once("value");
            allMovies = allMovies.val();
            for (let key of list) {
                let movie = allMovies[key];
                if (movie) {
                    movies.push(movie);
                }
            }
            return movies;
        }
        async function fetchRecommendations() {
            try {
                const url = "http://127.0.0.1:5000/?id=rj33536";
                console.log(url);
                const data = (await axios.get(url)).data;
                console.log(data);
                if (typeof (data) !== 'string') {
                    const movies = await getMovies(data);
                    setVideos(movies)
                    console.log();
                }
            } catch (error) {
                console.log("error");
                console.log(error);
            }
        }
        if (props.category === "Recommended") {
            fetchRecommendations();
            console.log(props.category);
        } else
            fetchData();
    }, [props.category]);
    return (
        <div className=" w-100">
            <div className="d-flex justify-content-between"><h3>{props.category}</h3>
            <a href={`categories/${props.category}`}>View all</a>
            </div>
            {
                videos.length !== 0 ?
                    <div className="slider--container d-flex" >
                        <div className="prev--container" onClick={() => { console.log("prev"); document.getElementById(props.category).scrollBy(-200, 0) }}>
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </div>

                        <div className="d-flex slider w-100" id={props.category}>
                            {videos.map(video =>
                                <Card video={video} />
                            )}
                            {videos.map(video =>
                                <Card video={video} />
                            )}
                            {videos.map(video =>
                                <Card video={video} />
                            )}
                        </div>
                        <div className="next--container" onClick={() => { document.getElementById(props.category).scrollBy(200, 0) }}>
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        </div>

                    </div> :
                    <div>No Episodes to show Yet</div>
            }
        </div>
    )

}