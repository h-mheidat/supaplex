document.getElementById('fetchButton').addEventListener('click', function() {
    // Get the value from the search textbox
    var searchValue = document.getElementById("searchTextbox").value;
    
    // Ensure the search value is not empty
    if (!searchValue.trim()) {
        alert('Please enter a search term.');
        return;
    }

    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=71b1966355ddca4fec1345cac864a220&text=${searchValue}&format=json&nojsoncallback=1&extras=url_s`;

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
            } else {
                alert('No photos found.');
            }
        })
        .catch(error => console.error('Error fetching the image:', error));
});