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
    var fullName = document.getElementById("fullname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (fullName.trim() === "") {
        alert("Please enter your full name");
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("User already exists. Please login instead.");
        return;
    }
    var user = {
        fullName: fullName,
        password: password
    };
    localStorage.setItem(email, JSON.stringify(user));

    alert("Signup successful!");
}


document.addEventListener("DOMContentLoaded", function () {
    apiKey = '81570769';
    defaultSearchTerm = 'deep';
    apiUrl = `https://www.omdbapi.com/?s=${defaultSearchTerm}&apikey=${apiKey}`;

    container = document.querySelector('.container');
    searchInput = document.getElementById('searchInput');
    searchForm = document.getElementById('searchForm');
    username = sessionStorage.getItem('username');

    if (username) {
        usernameDisplay = document.getElementById('usernameDisplay');
        usernameDisplay.textContent = `Welcome, ${username}!`;
        usernameDisplay.style.color = 'white'; 
    }

    fetchMovies(apiUrl);

    document.getElementById('searchButton').addEventListener('click', searchMovies);

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        searchMovies();
    });

    let typingTimer;
    doneTypingInterval = 500;

    searchInput.addEventListener('input', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(searchMovies, doneTypingInterval);
    });

    function searchMovies() {
        searchTerm = searchInput.value;
        searchUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;
        fetchMovies(searchUrl);
    }

    function fetchMovies(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayMovies(data.Search);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayMovies(movies) {
        const moviesList = document.getElementById('moviesList');
        moviesList.innerHTML = '';
        if (movies && movies.length > 0) {
            movies.forEach(movie => {
                listItem = document.createElement('li');

                movieImage = document.createElement('img');
                movieImage.src = movie.Poster;
                movieImage.alt = movie.Title;

                titleParagraph = document.createElement('p');
                titleParagraph.textContent = movie.Title;

                listItem.appendChild(movieImage);
                listItem.appendChild(titleParagraph);

                moviesList.appendChild(listItem);
            });
        } else {
            message = document.createElement('p');
            message.textContent = 'No movies found.';
            container.appendChild(message);
        }
    }
});

