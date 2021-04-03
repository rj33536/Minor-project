import React from 'react';

export default function Carousel(params) {

    return (
        <div id="carouselExampleIndicators" class="carousel" data-ride="carousel">
            <div>
                <div class="carousel-inner">
                    <div class="carousel-item carousel-card active">
                        <img class="d-block w-100" src="https://v3img.voot.com/resizeMedium,w_845,h_475/v3Storage/assets/bigg-boss-Episode-v3-1602216265455.jpg" alt="First slide" />
                    </div>
                    <div class="carousel-item carousel-card ">
                        <img class="d-block w-100" src="https://v3img.voot.com/resizeMedium,w_845,h_475/v3Storage/assets/NGN-1610247570465.jpg" alt="Second slide" />
                    </div>
                    <div class="carousel-item carousel-card ">
                        <img class="d-block w-100" src="https://v3img.voot.com/resizeMedium,w_845,h_475/v3Storage/assets/roadies-1610247593496.jpg" alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
        </div>

    )

}