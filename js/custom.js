let rootPath = 'data/reviews.json';

function init() {
    document.getElementById("reviews").innerHTML = "";

    fetchReviews();
}

function fetchReviews() {
    fetch(rootPath)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayReviews(data);
        })
}

function displayReviews(data) {
    let output = "";

    for (let i = 0; i < data.length; i++) {
        const review = data[i];
        output += `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="card h-100 shadow-sm" style="width:400px">
                    <div class="card-img-container">
                        <img class="card-img-top img-fluid" src="${review.restaurant_image.image_url}" alt="${review.restaurant_image.description}">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${review.restaurant_name}</h4>
                        <p class="card-text">${review.rating}⭐️</p>
                        <p class="card-text">${review.review_short_text}</p>
                        <a href="#" class="btn btn-primary" onclick="openModal(${i})">Full Review</a>
                        <small class="text-muted">${review.review_date}</small>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("reviews").innerHTML = output;
}

function openModal(index) {
    fetch(rootPath)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const review = data[index];
            document.getElementById('modalRestaurantName').innerText = review.restaurant_name;
            document.getElementById('modalReviewText').innerText = review.review_text;

            let carouselInner = document.getElementById('carouselInner');
            carouselInner.innerHTML = '';

            for (let i = 0; i < review.images.length; i++) {
                const image = review.images[i];
                const activeClass = i === 0 ? 'active' : '';
                carouselInner.innerHTML += `
                    <div class="carousel-item ${activeClass}">
                        <img src="${image.image_url}" class="d-block rounded w-100 modal-img" alt="${image.description}">
                        <div class="carousel-caption d-none d-md-block">
                            <p>${image.description}</p>
                        </div>
                    </div>
                `;
            }

            $('#reviewModal').modal('show');
        });
}

document.addEventListener('DOMContentLoaded', init);