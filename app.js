document.addEventListener('DOMContentLoaded', function () {
    // Add a click event listener to the search button
    document.getElementById('searchBtn').addEventListener('click', function () {
        // Make an AJAX call to superheroes.php
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // On success, show the list of superheroes in an alert
                var superheroes = JSON.parse(xhr.responseText);
                alert("List of Superheroes:\n" + superheroes.join(', '));
            } else if (xhr.readyState == 4 && xhr.status != 200) {
                // On error, show an alert
                alert("Error fetching data. Status code: " + xhr.status);
            }
        };

        xhr.open('GET', 'superheroes.php', true);
        xhr.send();
    });
});
