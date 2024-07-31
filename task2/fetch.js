const apiKey = '71b1966355ddca4fec1345cac864a220';
const baseUrl = 'https://www.flickr.com/services/rest/';
const photosPerPage = 10;
let currentPage = 1;
let totalPages = 1;

// Function to fetch photos based on the search term and page
async function fetchPhotos(searchTerm = 'bird', page = 1) {
    const url = `${baseUrl}?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(searchTerm)}&format=json&nojsoncallback=1&extras=url_s&per_page=${photosPerPage}&page=${page}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        totalPages = data.photos.pages; // Update total pages
        displayPhotos(data);
        displayPagination();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('photo-container').innerText = 'Error loading photos.';
    }
}

// Function to display photos in HTML
function displayPhotos(data) {
    const container = document.getElementById('photo-container');

    if (data.photos && data.photos.photo.length > 0) {
        const photoHtml = data.photos.photo.map(photo => {
            return `
                <div class="photo">
                    <img src="${photo.url_s}" alt="${photo.title}" />
                    <p>${photo.title}</p>
                </div>
            `;
        }).join('');

        container.innerHTML = photoHtml;
    } else {
        container.innerText = 'No photos found.';
    }
}

// Function to display pagination controls
function displayPagination() {
    const paginationContainer = document.getElementById('pagination');
    let paginationHtml = '';

    if (totalPages > 1) {
        // Previous Button
        if (currentPage > 1) {
            paginationHtml += `<a href="#" class="pagination-link" data-action="prev">Previous</a> `;
        }

        // Next Button
        if (currentPage < totalPages) {
            paginationHtml += `<a href="#" class="pagination-link" data-action="next">Next</a>`;
        }
    }

    paginationContainer.innerHTML = paginationHtml;
}

// Function to handle search button click
function handleSearch() {
    currentPage = 1; // Reset to the first page on new search
    const searchTerm = document.getElementById('search-input').value;
    fetchPhotos(searchTerm, currentPage);
}

// Function to handle pagination link click
function handlePaginationClick(event) {
    if (event.target.classList.contains('pagination-link')) {
        event.preventDefault();
        const action = event.target.getAttribute('data-action');
        if (action === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (action === 'next' && currentPage < totalPages) {
            currentPage++;
        }
        const searchTerm = document.getElementById('search-input').value;
        fetchPhotos(searchTerm, currentPage);
    }
}

// Event listener for the search button
document.getElementById('search-button').addEventListener('click', handleSearch);

// Event listener for pagination links
document.getElementById('pagination').addEventListener('click', handlePaginationClick);

// Initial fetch with default search term
fetchPhotos();