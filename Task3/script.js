let currentPage = 1;
const photosPerPage = 10;

document.getElementById('fetchButton').addEventListener('click', function() {
    currentPage = 1;
    fetchImages();
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentPage++;
    fetchImages();
});

document.getElementById('prevButton').addEventListener('click', function() {
    currentPage--;
    fetchImages();
});

function fetchImages() {
    var searchValue = document.getElementById("searchTextbox").value;

    if (!searchValue.trim()) {
        alert('Please enter a search term.');
        return;
    }

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=71b1966355ddca4fec1345cac864a220&text=${searchValue}&format=json&nojsoncallback=1&extras=url_s&per_page=${photosPerPage}&page=${currentPage}`;

    document.getElementById('photosContainer').innerHTML = '<p>Loading...</p>'; // Show loading message

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging line
            const photosContainer = document.getElementById('photosContainer');
            photosContainer.innerHTML = ''; // Clear any previous images

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

                // Update pagination buttons
                updatePagination(data.photos.pages);
            } else {
                alert('No photos found.');
                document.getElementById('result').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error fetching the image:', error);
            alert('There was an error fetching the images. Please try again later.');
            document.getElementById('photosContainer').innerHTML = ''; // Clear the loading message
        });
}

function updatePagination(totalPages) {
    const pageNumbers = document.getElementById('pageNumbers');
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumberButton = document.createElement('button');
        pageNumberButton.textContent = i;
        if (i === currentPage) {
            pageNumberButton.classList.add('active');
        }
        pageNumberButton.addEventListener('click', function() {
            currentPage = i;
            fetchImages();
        });
        pageNumbers.appendChild(pageNumberButton);
    }

    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage >= totalPages;
}
