
let currentPage = 1;
const perPage = 10;

document.getElementById('fetchButton').addEventListener('click', function() {
    currentPage = 1; // Reset to first page on new search
    fetchImages();
});

function fetchImages() {
    const searchValue = document.getElementById("searchTextbox").value;
    
    if (!searchValue.trim()) {
        alert('Please enter a search term.');
        return;
    }

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=71b1966355ddca4fec1345cac864a220&text=${searchValue}&format=json&nojsoncallback=1&extras=url_s&per_page=${perPage}&page=${currentPage}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            displayImages(data.photos.photo);
            setupPagination(data.photos.pages);
        })
        .catch(error => console.error('Error fetching the image:', error));
}

function displayImages(photos) {
    const photosContainer = document.getElementById('photosContainer');
    photosContainer.innerHTML = '';

    if (photos.length > 0) {
        photos.forEach(photo => {
            if (photo.url_s) {
                const imgElement = document.createElement('img');
                imgElement.src = photo.url_s;
                imgElement.alt = 'Flickr Image';
                imgElement.className = 'flickrImage';
                photosContainer.appendChild(imgElement);
            }
        });
        document.getElementById('result').style.display = 'block';
    } else {
        alert('No photos found.');
    }
}

function setupPagination(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    // Create Previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.className = 'paginationButton';
        prevButton.addEventListener('click', () => {
            currentPage--;
            fetchImages();
        });
        paginationContainer.appendChild(prevButton);
    }

    // Create page buttons
    let startPage = Math.max(1, currentPage - 5);
    let endPage = Math.min(totalPages, currentPage + 4);

    if (endPage - startPage < 9) {
        startPage = Math.max(1, endPage - 9);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'pageButton';
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            fetchImages();
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create Next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.className = 'paginationButton';
        nextButton.addEventListener('click', () => {
            currentPage++;
            fetchImages();
        });
        paginationContainer.appendChild(nextButton);
    }
}
