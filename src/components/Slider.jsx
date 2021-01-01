import React, { useState, useEffect } from 'react';
import Card from "./Card";
// import axios from "axios"
export default function Carousel(props) {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:4000/category/' + props.category);
                const data = await response.json();
                setVideos([...data]);
            } catch (error) {
            }
        }
        async function fetchRecommendations() {
            try {
                const url = "http://127.0.0.1:5000/?id=rj33536";
                console.log(url);
                const response = await fetch(url);

                console.log(response);
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
        <div>
            <h3>{props.category}</h3>
            {
                videos.length !== 0 ?
                    <div className="slider--container d-flex" >
                        <div className="prev--container" onClick={() => { console.log("prev"); document.getElementById(props.category).scrollBy(-200, 0) }}>
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        </div>

                        <div className="d-flex slider" id={props.category}>
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