// Global Constants
const apiKey = 'ad3d6f1f7edc59252f3fbb11f04258fa';
const apiUrl = 'http://api.themoviedb.org/3/';
let currentPage = 1;


// Elements
const moviecontainers = document.querySelector(".movie-grid");
const loadBtn = document.querySelector("#load");
const clearBtn = document.querySelector("#clear");
const searchInputBtn = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#search");

// Event listeners
searchBtn.addEventListener('submit', (searchEl) => { 
    // refrains from reloading the page 
    searchEl.preventDefault(); 
    // stores the current search input given by user 
    const currentInput = searchInputBtn.value;
    //resets the current page  
    currentPage = 1;
    // passes in the current search input and page into the fetch movie function which generates the movie page   
    moviecontainers.innerHTML = ''; 
    fetchMovies(currentInput, currentPage);
});

// the clear button that returns back to the home page with now playing movies 
    clearBtn.addEventListener('click', () => { 
        // restarts the input value and fetchesit
        searchInput.value = ''; 
        currentPage = 1; 
        moviecontainers.innerHTML = ''; 
        fetchTrendingMovies();
    });
    
    // the load button that increments each page with new movies 
    loadBtn.addEventListener('click', async (e) => {
        // refrains from reloading the page  
        e.preventDefault(); 
        currentPage++; 
        const currentSearch = searchInputBtn.value; 
        // if there is a input value, continue updating that page 
        if (currentSearch) { 
            await fetchMovies(currentSearch, currentPage);
        } 
        // else keep updating the current home page 
        else { 
            await fetchTrendingMovies(currentPage); 
        }
    });
    
    // displays the movies that are being searched, and the page number (used for the search button)
    async function fetchMovies(searchQuery, page) { 
        const url = `${apiUrl}search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;  
        // fetch the url, convert it into a js object and pass that into the generate movie function
        const response = await fetch(url); 
        const data = await response.json(); 
        moviecontainers.innerHTML = ''; 
        const movies = data.results; 
        generateMovies(movies); 
    }
    // displays the moving on the now playing page and takes in the page for the load button  
    async function fetchTrendingMovies(page) { 
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`;
        // fetch the url, convert it into a js object and pass that into the generate movie function 
        const response = await fetch(url); 
        const data = await response.json(); 
        const movies = data.results;
        generateMovies(movies);}
    
    // generates the api's data to be displayed 
    function generateMovies(movies){
        // loops through the object and creates a section for the movie-card and in there, the poster, title, and votes 
        for (let movie of movies) { 
            const movCard = document.createElement('div'); 
            movCard.classList.add('movie-card'); 
            //uses innerHTMl in order to use the HTML elements in JS
            movCard.innerHTML = 
            `<p class="movie-votes"> ️ Votes: ${movie.vote_average}</p> 
            <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"alt="${movie.title}"/> 
            <h2 class="movie-title">${movie.title}</h2>`; 
            // appends the HTML element just created for the JS object
            moviecontainers.appendChild(movCard); 
        } 
    }

     // calls the Fetches trending movies on page 
     window.onload = () => { fetchTrendingMovies();};
     