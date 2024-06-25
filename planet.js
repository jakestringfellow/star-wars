let planetnameH1;
let climate;
let terrain;
let population;
let characterList = [];
let filmList = [];
const baseUrl = `https://swapi2.azurewebsites.net/api`;
 
 
addEventListener('DOMContentLoaded', () => {
  planetnameH1 = document.querySelector('h1#name');
  climate = document.querySelector('span#climate');
  terrain = document.querySelector('span#terrain');
  population = document.querySelector('span#population');
  charactersUL = document.querySelector('#characters>ul');
  filmsUL = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});
 
async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.characters = await fetchCharacters(id)
    planet.films = await fetchFilms(id)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
 
}
 
async function fetchPlanet(id) {
    try {
      const planetUrl = `${baseUrl}/planets/${id}`;
      const response = await fetch(planetUrl);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching the planet:', error);
    }
  }

 
async function fetchCharacters(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  const charactersFetchedFromFilm = await fetch(url)
    .then(res => res.json())
    characterList.push(...charactersFetchedFromFilm)
  return characterList;
}
 
async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const filmsFetchedFromPlanet = await fetch(url)
    .then(res => res.json())
    filmList.push(...filmsFetchedFromPlanet)
  return filmList;
}
 
const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  
  planetnameH1.textContent = planet?.name;
  climate.textContent = planet?.climate;
  terrain.textContent = planet?.terrain;
  population.textContent = planet?.population;
  const characterLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUL.innerHTML = characterLis.join("");
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUL.innerHTML = filmsLis.join("");
}