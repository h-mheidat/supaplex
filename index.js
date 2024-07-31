const apiKey = '71b1966355ddca4fec1345cac864a220'; 
const imagesPerPage = 40; 
const totalPages = 5; 
let currentPage = 1;


function buildFlickrUrl(query, page, perPage = imagesPerPage) {
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(query)}&format=json&nojsoncallback=1&extras=url_s&per_page=${perPage}&page=${page}`;
}


function fetchAndDisplayImages(query, page) {
    if (!query.trim()) {
        console.error('Search term cannot be empty.');
        return;
    }

    const url = buildFlickrUrl(query, page);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.photo) {
                const photos = data.photos.photo;
                const container = document.getElementById('image-container');
                container.innerHTML = ''; 

                photos.forEach(photo => {
                    const img = document.createElement('img');
                    img.src = photo.url_s;
                    img.alt = photo.title; 
                    container.appendChild(img);
                });

                console.log('Images fetched and displayed successfully.');
                updatePaginationControls(page);
            } else {
                console.error('No photos found or error in response data.');
            }
        })
        .catch(error => console.error('Error fetching images:', error));
}


function updatePaginationControls(currentPage) {
    const paginationContainer = document.getElementById('pagination-controls');
    paginationContainer.innerHTML = ''; 

 
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => {
            fetchAndDisplayImages(document.getElementById('search-query').value.trim(), currentPage - 1);
        });
        paginationContainer.appendChild(prevButton);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true; 
        }
        pageButton.addEventListener('click', () => {
            fetchAndDisplayImages(document.getElementById('search-query').value.trim(), i);
        });
        paginationContainer.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => {
            fetchAndDisplayImages(document.getElementById('search-query').value.trim(), currentPage + 1);
        });
        paginationContainer.appendChild(nextButton);
    }
}


document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-query').value.trim();
    
    if (searchQuery) {
        currentPage = 1; 
        fetchAndDisplayImages(searchQuery, currentPage);
    } else {
        console.error('Search term cannot be empty.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayImages('bird', currentPage);
});
