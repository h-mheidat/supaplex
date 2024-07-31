let currentPage = 1;
const perPage = 20; 

document.getElementById('fetchButton').addEventListener('click', function() {
    fetchPhotos(1); 
});

document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        fetchPhotos(currentPage - 1);
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    fetchPhotos(currentPage + 1);
});

function fetchPhotos(page) {
    const searchQuery = document.getElementById('searchQuery').value.trim();
    if (!searchQuery) {
        alert('Please enter a search term.');
        return;
    }

    
    const apiKey = '71b1966355ddca4fec1345cac864a220';
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(searchQuery)}&format=json&nojsoncallback=1&extras=url_s&per_page=${perPage}&page=${page}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); 
            const photosContainer = document.getElementById('photosContainer');
            photosContainer.innerHTML = '';

            if (data.photos && data.photos.photo && data.photos.photo.length > 0) {
                data.photos.photo.forEach(photo => {
                    if (photo.url_s) {
                        const imgElement = document.createElement('img');
                        imgElement.src = photo.url_s;
                        imgElement.alt = 'Flickr Image'; 
                        imgElement.className = 'flickrImage';
                        photosContainer.appendChild(imgElement);
                    }
                });
                document.getElementById('result').style.display = 'block'; 
                updatePagination(data.photos.page, data.photos.pages);
            } else {
                alert('No photos found.');
            }
        })
        .catch(error => console.error('Error fetching the image:', error)); // Handle errors
}

function updatePagination(current, totalPages) {
    currentPage = current;

    document.getElementById('prevPage').disabled = currentPage <= 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;

    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}
