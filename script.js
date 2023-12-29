function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username && password) {
        var user = JSON.parse(localStorage.getItem(username));

        if (user && user.password === password) {
            sessionStorage.setItem("username", username);
            window.location.href = "home.html";
        } else {
            
            alert("Invalid username or password");
        }
    } else {
        alert("Please enter username and password");
    }
}


function signup() {
    // Get form inputs
    var fullName = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Validate full name
    if (fullName.trim() === "") {
        alert("Please enter your full name");
        return;
    }

    // Validate email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Validate password
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }


    alert("Signup successful!");
}


// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '81570769';
    const apiUrl = `https://www.omdbapi.com/?s=batman&apikey=${apiKey}`;

    // Get the container element to display movies
    const container = document.querySelector('.container');

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the list of movies
            displayMovies(data.Search);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display movies in the container
    function displayMovies(movies) {
        const moviesList = document.getElementById('moviesList');

        // Check if movies exist
        if (movies && movies.length > 0) {
            // Loop through the movies and create list items with images
            movies.forEach(movie => {
                const listItem = document.createElement('li');

                // Create an image element
                const movieImage = document.createElement('img');
                movieImage.src = movie.Poster;
                movieImage.alt = movie.Title;

                // Create a paragraph element for the movie title
                const titleParagraph = document.createElement('p');
                titleParagraph.textContent = movie.Title;

                // Append the image and title to the list item
                listItem.appendChild(movieImage);
                listItem.appendChild(titleParagraph);

                // Append the list item to the movies list
                moviesList.appendChild(listItem);
            });
        } else {
            // Display a message if no movies are found
            const message = document.createElement('p');
            message.textContent = 'No movies found.';
            container.appendChild(message);
        }
    }
});

