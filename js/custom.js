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
            <div class="card mb-4 box-shadow">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">${review.restaurant_name}</h4>
                </div>
                <div class="card-body">
                    <img src="${review.restaurant_image.image_url}" class="card-img-top" alt="${review.restaurant_image.description}">
                    <p class="card-text">${review.rating}</p>
                    <p class="card-text">${review.review_short_text}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-lg btn-link"><i class="far fa-heart"></i></button>
                            <button type="button" class="btn btn-lg btn-link"><i class="far fa-comment"></i></button>
                            <button type="button" class="btn btn-lg btn-link"><i class="far fa-solid fa-retweet"></i></button>
                        </div>
                        <small class="text-muted">${review.review_date}</small>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("reviews").innerHTML = output;
}