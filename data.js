const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=71b1966355ddca4fec1345cac864a220&text=bird&format=json&nojsoncallback=1&extras=url_s';

let allPhotos = []; // Store all fetched photos
let originalPhotos = []; // Store the original list of photos
let currentPage = 1;
const photosPerPage = 10;

async function fetchPhotos() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Parse the JSON data
        const data = await response.json();
        allPhotos = data.photos.photo; // Store the photos globally
        originalPhotos = [...allPhotos]; // Store the original list of photos
        // Display the first page of photos
        displayPhotos(currentPage);
        updatePagination();
    } catch (error) {
        // Handle any errors
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('photo-container').innerText = 'Error loading photos.';
    }
}

function searchPhotoByTitle(searchTerm) {
    // Filter photos by title
    const result = allPhotos.filter(photo => photo.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return result;
}

function displayPhotos(page) {
    // Get the container element
    const container = document.getElementById('photo-container');

    // Calculate the start and end index of the photos for the current page
    const start = (page - 1) * photosPerPage;
    const end = start + photosPerPage;
    const photosToDisplay = allPhotos.slice(start, end);

    // Check if the data contains photos
    if (photosToDisplay && photosToDisplay.length > 0) {
        // Map over the photos and create HTML elements for each
        const photoHtml = photosToDisplay.map(photo => {
            return `
                <div class="photo">
                    <img src="${photo.url_s}" alt="${photo.title}" />
                    <p>${photo.title}</p>
                </div>
            `;
        }).join('');

        // Insert the photos into the HTML container
        container.innerHTML = photoHtml;
    } else {
        // Handle case where no photos are found
        container.innerText = 'No photos found.';
    }
}

function updatePagination() {
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const totalPages = Math.ceil(allPhotos.length / photosPerPage);

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPhotos(currentPage);
            updatePagination();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPhotos(currentPage);
            updatePagination();
        }
    });
}

// Event listener for search input
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        if (searchTerm.trim() === '') {
            // If search term is empty, reset to original photos
            allPhotos = [...originalPhotos];
        } else {
            // Filter photos by search term
            allPhotos = searchPhotoByTitle(searchTerm);
        }
        // Reset to the first page and display photos
        currentPage = 1;
        displayPhotos(currentPage);
        updatePagination();
    });

    // Fetch photos on page load
    fetchPhotos();
});