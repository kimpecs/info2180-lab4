document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm !== '') {
            // Make AJAX request
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `http://localhost/info2180-lab4/superheroes.php?query=${encodeURIComponent(searchTerm)}`, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        displayResult(response);
                    } else {
                        displayResult({ error: 'An error occurred while fetching data.' });
                    }
                }
            };

            xhr.send();
        } else {
            // If search input is empty, display the original list
            displayResult({ superheroes:superheroes });
        }
    });

    function displayResult(data) {
        const superheroesList = document.getElementById('superheroesList');
        superheroesList.innerHTML = ''; 
    
        if (data.error) {
            superheroesList.innerHTML = `<p>${data.error}</p>`;
        } else if (data.superheroes.length > 0) {
            data.superheroes.forEach(superhero => {
                const listItem = document.createElement('li');
                listItem.textContent = superhero.alias;
                superheroesList.appendChild(listItem);
            });
        } else {
            superheroesList.innerHTML = '<p>Superhero not found</p>';
        }
    }
    
});
