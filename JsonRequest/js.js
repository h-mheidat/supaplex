const apiKey = '71b1966355ddca4fec1345cac864a220';
const baseApiUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=';

let searchQuery = 'cars';
let currentPage = 1; 
const photosPerPage = 14; 

function fetchImg(query, page) {
    const apiUrl = `${baseApiUrl}${apiKey}&text=${encodeURIComponent(query)}&format=json&nojsoncallback=1&extras=url_s&per_page=${photosPerPage}&page=${page}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.photos && data.photos.photo) {
                const photos = data.photos.photo;
                const container = document.getElementById('image-div');
                container.innerHTML = '';

                photos.forEach(photo => { 
                    const img = document.createElement('img');
                    img.src = photo.url_s;
                    container.appendChild(img);
                });

                console.log('Images fetched and displayed successfully.');
            } else {
                console.error('No photos found or error in response data.');
            }
        })
        .catch(error => console.error('Error fetching images:', error));
}

function startSearch() {
    const query = document.getElementById('search').value.trim();
    if (query) {
        searchQuery = query;
        currentPage = 1;
        fetchImg(searchQuery, currentPage);
    } else {
        console.error('Search query is empty.');
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchImg(searchQuery, currentPage);
    }
}

function nextPage() {
    currentPage++;
    fetchImg(searchQuery, currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchImg(searchQuery, currentPage); 
});
