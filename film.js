const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
const baseUrl = `https://swapi2.azurewebsites.net/api`;
let titleH1;
let releaseDateSpan;
let producer;
let director;
let openingCrawl;
let charactersDiv;
let planetsDiv;
let charactersUl;
let planetsUl;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector('h1#title');
    releaseDateSpan = document.querySelector('span#release_date');
    producer = document.querySelector('span#producer');
    director = document.querySelector('span#director');
    openingCrawl = document.querySelector('span#opening_crawl');
    planetsUl = document.querySelector('#planets>ul');
    charactersUl = document.querySelector('#characters>ul');
    episode = document.querySelector('span#episode_id');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
  });

async function getFilm(id) {
    let film;
    try {
      film = await fetchFilm(id)
      film.planets = await fetchPlanets(film)
      film.characters = await fetchCharacters(film)
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
}

async function fetchFilm(id) {
    let filmUrl = `${baseUrl}/films/${id}`;
    return await fetch(filmUrl)
        .then(res => res.json())
}

async function fetchPlanets(film) {
    const url = `${baseUrl}/films/${film?.id}/planets`;
    const planets = await fetch(url)
      .then(res => res.json())
    return planets;
}

async function fetchCharacters(film) {
    const url = `${baseUrl}/films/${film?.id}/characters`;
    const characters = await fetch(url)
      .then(res => res.json())
    return characters;
  }

  const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;  // Just to make the browser tab say their name
    titleH1.textContent = film?.title;
    releaseDateSpan.textContent = film?.release_date;
    producer.textContent = film?.producer;
    director.textContent = film?.director;
    openingCrawl.textContent = film?.opening_crawl;
    episode.textContent = film?.episode_id;
    // homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
    // const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
    
    const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</li>`)

    // const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
    // filmsUl.innerHTML = filmsLis.join("");

    charactersUl.innerHTML = charactersLis.join("");
    planetsUl.innerHTML = planetsLis.join("");

}
// Using hte fetch API, make a GET request from: 'https://swapi2.azurewebsites.net/api/films/${id}'
// Make another GET request from 'https://swapi2.azurewebsites.net/api/films/${id}/characters' to get
// characters in that film
// Make one last get request from 'https://swapi2.azurewebsites.net/api/films/${id}/planets' to
// get the planets for that film
// Display whatever details you like on the page. At minimum, you must display the characters and the planets . 
//The character/planet name must be a clickable hyperlink that
// navigates the user to the details page for that entity