import React from 'react';
import { Link } from 'react-router-dom';
export default function Card(props) {
    const video = props.video;
    return (
        <div className="m-2" key={video.id}>
            <Link to={`/player/${video.id}`}>
                <div className="card border-0 category-card bg-white">
                    <img className="img-thumbnail" src={video.thumbUrl ? video.thumbUrl : "https://v3img.voot.com/v3Storage/assets/shakti-16x9-1602157703812.jpg"} alt={video.title} />
                    <div className="p-2">
                        <p className="text-dark">{video.title}</p>
                        <p className="text-dark"> {video.duration}</p>
                    </div>
                    <div className="p-2 flex">
                        <p className="text-dark small">{video.language} | {video.categories}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}