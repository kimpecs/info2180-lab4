document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to the search button
    document.getElementById('searchBtn').addEventListener('click', function () {
        // Get the search input value
        var searchQuery = document.getElementById('searchInput').value;

        // Sanitize the search query (you may use a more robust sanitization method)
        var sanitizedQuery = encodeURIComponent(searchQuery);
        
        // Make an AJAX call to superheroes.php
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // On success, Display the result in the "result " div
                document.getElementById("result").innerHTML = xhr.responseText;
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                // On error, show an alert
                document.getElementById('result').innerHTML = "Error fetching data. Status code " + xhr.status;
            }
        };

        xhr.open('GET', 'superheroes.php?query=' + sanitizedQuery, true);
        xhr.send();
    });
});
