const API_KEY = '71b1966355ddca4fec1345cac864a220';
const PAGE_SIZE = 20; // Number of photos per page

async function getUsers(TEXT, page = 1) {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${TEXT}&format=json&nojsoncallback=1&extras=url_s&per_page=${PAGE_SIZE}&page=${page}`;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let currentPage = 1;
let searchTerm = "bird";

async function displayPhotos(page = 1) {
    const data = await getUsers(searchTerm, page);
    if (data && data.photos && data.photos.photo) {
        const photoContainer = document.getElementById('photo-container');
        photoContainer.innerHTML = ''; 
        data.photos.photo.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.url_s; 
            img.alt = photo.title || 'Photo'; 

            photoContainer.appendChild(img);
        });
        
        // Create pagination controls
        createPagination(data.photos.page, data.photos.pages);
    }
}

async function searchphoto() {
    searchTerm = document.getElementById('photo-search').value;
    currentPage = 1;
    await displayPhotos(currentPage);
}

function createPagination(currentPage, totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.disabled = currentPage <= 1;
        prevButton.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                displayPhotos(currentPage);
            }
        };
        paginationContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.disabled = currentPage >= totalPages;
        nextButton.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayPhotos(currentPage);
            }
        };
        paginationContainer.appendChild(nextButton);
    }
}
