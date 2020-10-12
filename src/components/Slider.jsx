import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from "./Card"
export default function Carousel(props) {
    const [videos, setVideos] = useState([]);

    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:4000/category/' + props.category);
            const data = await response.json();
            setVideos([...data]);
            //console.log(data);
        } catch (error) {
            //console.log(error);
        }
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