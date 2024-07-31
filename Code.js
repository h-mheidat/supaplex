
        const apiKey = '71b1966355ddca4fec1345cac864a220';
        let currentPage = 1;
        let currentQuery = '';
        const photosPerPage = 20;
        const pagesPerSet = 5;

        async function fetchFlickrData(query, page) {
            const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(query)}&page=${page}&per_page=${photosPerPage}&format=json&nojsoncallback=1&extras=url_s`;

            try {
                let response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let data = await response.json();
                displayImages(data.photos.photo);
                setupPagination(data.photos.page, data.photos.pages);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        function displayImages(photos) {
            const imagesContainer = document.getElementById('images');
            imagesContainer.innerHTML = '';
            photos.forEach(photo => {
                let img = document.createElement('img');
                img.src = photo.url_s;
                img.alt = photo.title;
                imagesContainer.appendChild(img);
            });
        }

        function setupPagination(currentPage, totalPages) {
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';

            const startPage = Math.floor((currentPage - 1) / pagesPerSet) * pagesPerSet + 1;
            const endPage = Math.min(startPage + pagesPerSet - 1, totalPages);

            if (startPage > 1) {
                const prevButton = document.createElement('button');
                prevButton.innerText = 'Previous';
                prevButton.classList.add('page-button');
                prevButton.onclick = () => {
                    currentPage = startPage - 1;
                    fetchFlickrData(currentQuery, currentPage);
                };
                paginationContainer.appendChild(prevButton);
            }

            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement('button');
                pageButton.innerText = i;
                pageButton.classList.add('page-button');
                pageButton.onclick = () => {
                    fetchFlickrData(currentQuery, i);
                };
                if (i === currentPage) {
                    pageButton.style.backgroundColor = '#0056b3';
                }
                paginationContainer.appendChild(pageButton);
            }

            if (endPage < totalPages) {
                const nextButton = document.createElement('button');
                nextButton.innerText = 'Next';
                nextButton.classList.add('page-button');
                nextButton.onclick = () => {
                    currentPage = endPage + 1;
                    fetchFlickrData(currentQuery, currentPage);
                };
                paginationContainer.appendChild(nextButton);
            }
        }

        function searchPhotos() {
            currentQuery = document.getElementById('searchQuery').value;
            currentPage = 1;
            fetchFlickrData(currentQuery, currentPage);
        }
