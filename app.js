document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const superheroesList = document.getElementById('superheroesList');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm !== '') {
            fetch(`http://localhost/info2180-lab4/superheroes.php?query=${encodeURIComponent(searchTerm)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('An error occurred while fetching data.');
                    }
                    return response.json();
                })
                .then(data => {
                    displayResult(data);
                })
                .catch(error => {
                    displayResult({ error: error.message });
                });
        } else {
            displayResult({ superheroes });
        }
    });

    function displayResult(data) {
        superheroesList.innerHTML = '';

        if (data.error) {
            superheroesList.innerHTML = `<p>${data.error}</p>`;
        } else if (data.superheroes && data.superheroes.length > 0) {
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
