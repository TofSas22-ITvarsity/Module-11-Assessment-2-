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
            <div class="col">
                <div class="card h-100" style="width:400px">
                    <div class="card-img-container">
                        <img class="card-img-top img-fluid" src="${review.restaurant_image.image_url}" alt="${review.restaurant_image.description}">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${review.restaurant_name}</h4>
                        <p class="card-text">${review.rating}⭐️</p>
                        <p class="card-text">${review.review_short_text}</p>
                        <a href="#" class="btn btn-primary">Full Review</a>
                        <small class="text-muted">${review.review_date}</small>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("reviews").innerHTML = output;
}