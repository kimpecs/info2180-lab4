document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to the search button
    document.getElementById('searchBtn').addEventListener('click', function () {
        // Get the search input value
        var searchQuery = document.getElementById('searchInput').value;

        // Sanitize the search query (you may use a more robust sanitization method)
        var sanitizedQuery = encodeURIComponent(searchQuery);

        // Make an AJAX call to superheroes.php with the search query as a parameter
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    // On success, parse the JSON response
                    var response = JSON.parse(xhr.responseText);

                    // Check if a superhero was found
                    if (response.length > 0) {
                        // Display the details of the first superhero in the "result" div
                        var superhero = response[0];
                        document.getElementById('result').innerHTML = `
                            <h3>${superhero.alias}</h3>
                            <h4>${superhero.name}</h4>
                            <p>${superhero.biography}</p>
                        `;
                    } else {
                        // If superhero not found, display a message
                        document.getElementById('result').innerHTML = "Superhero not found";
                    }
                } else {
                    // On error, display an error message
                    document.getElementById('result').innerHTML = "Error fetching data. Status code: " + xhr.status;
                }
            }
        };

        xhr.open('GET', 'superheroes.php?query=' + sanitizedQuery, true);
        xhr.send();
    });
});
