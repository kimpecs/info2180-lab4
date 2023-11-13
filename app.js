document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== '') {
            // Make AJAX request
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `superheroes.php?query=${encodeURIComponent(searchTerm)}`, true);

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
            displayResult({ superheroes: originalSuperheroes });
        }
    });

    function displayResult(data) {
        resultDiv.innerHTML = ''; // Clear previous results

        if (data.error) {
            resultDiv.innerHTML = `<p>${data.error}</p>`;
        } else if (data.superheroes.length > 0) {
            // Display the list or a single superhero
            if (data.superheroes.length === 1) {
                const superhero = data.superheroes[0];
                resultDiv.innerHTML = `
                    <h3>${superhero.alias}</h3>
                    <h4>${superhero.name}</h4>
                    <p>${superhero.biography}</p>
                `;
            } else {
                const list = document.createElement('ul');
                data.superheroes.forEach(superhero => {
                    const listItem = document.createElement('li');
                    listItem.textContent = superhero.alias;
                    list.appendChild(listItem);
                });
                resultDiv.appendChild(list);
            }
        } else {
            resultDiv.innerHTML = '<p>Superhero not found</p>';
        }
    }
});
