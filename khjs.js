let currentPage = 1;
const photosPerPage = 5;

async function getUsers(search) {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=71b1966355ddca4fec1345cac864a220&text=${search}&format=json&nojsoncallback=1&extras=url_s`;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function displayPhotos(page = 1) {
    const search = document.getElementById("search").value;
    const photoContainer = document.getElementById('photo-container');
    photoContainer.innerHTML = ''; 

    const data = await getUsers(search);

    if (data && data.photos && data.photos.photo) {
        const photos = data.photos.photo;
        const startIndex = (page - 1) * photosPerPage;
        const endIndex = startIndex + photosPerPage;
        const photosToDisplay = photos.slice(startIndex, endIndex);
        
        photosToDisplay.forEach(photo => {
            const img = document.createElement('img');
            img.src = photo.url_s;
            img.alt = photo.title;
            img.className = 'photo';
            photoContainer.appendChild(img);
        });

        displayPagination(photos.length);
    } else {
        console.log('No photos found');
    }
}

function displayPagination(totalPhotos) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // Clear the pagination container

    const totalPages = Math.ceil(totalPhotos / photosPerPage);
    
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            displayPhotos(i);
        });
        paginationContainer.appendChild(button);
    }
}

document.getElementById('searchButton').addEventListener('click', () => {
    currentPage = 1; 
    displayPhotos();
});
