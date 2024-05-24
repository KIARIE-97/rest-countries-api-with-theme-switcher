
document.addEventListener('DOMContentLoaded', () => {
const filterCountries = document.querySelector('.region');
const searchInput = document.querySelector('.search');
const countriesContainer = document.querySelector('.countries_cards');



const displayCountries = (countries) => {
    if (!countriesContainer) {
        console.error('countriesContainer element not found');
        return;
    }
    countriesContainer.innerHTML = '';
    countries.forEach(country => {
        const countryElement = document.createElement('div');
        countryElement.classList.add('country');
        countryElement.innerHTML = `
        <div>
            <img class="country__img" src="${country.flags.png}" alt="${country.name}">
            <div class="country__data">
            <h3 class="country__name">${country.name.common}</h3>
            <h4 class="country__row>Population: ${country.population.toLocaleString()}</h4>
            <h4 class="country__region">Region: ${country.region}</h4>
            <h4 class="country__row>Capital: ${country.capital ?  country.capital[0] : 'N/A'}</h4>
        </div>
        </div>
        `
        countriesContainer.appendChild(countryElement);
    });
}
//(https://restcountries.com) API
// Fetch countries from the API
const FetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    displayCountries(countries);
    console.log(countries);
}
FetchCountries();

// Filter countries by region
filterCountries.addEventListener('change', async (e) => {
    const region = e.target.value;
    const response = await fetch(`https://restcountries.com/v3.1/continent/${region}`);
    const countries = await response.json();
    displayCountries(countries);
});

// Search countries by name
searchInput.addEventListener('input', async (e) => {
    const search = e.target.value;
    const response = await fetch(`https://restcountries.com/v3.1/name/${search}`);
    const countries = await response.json();
    displayCountries(countries);
});
// Click on a country to see more detailed information on a separate page
countriesContainer.addEventListener('click', async (e) => {
    if (e.target.classList.contains('country')) {
        const countryName = e.target.querySelector('h3').textContent;
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const [country] = await response.json();
        console.log(country);
        window.location.href = `country.html?name=${country.name.common}`;
    }
});

// Get the country name from the URL
const urlParams = new URLSearchParams(window.location.search);
const countryName =  urlParams.get('name');
if (countryName) async () => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    const [country] = await response.json();
    console.log(country);
    const countryElement = document.createElement('div');
    countryElement.classList.add('country');
    countryElement.innerHTML = `
    <div>
        <img class="country__img" src="${country.flags.png}" alt="${country.name}">
        <div class="country__data">
        <h3 class="country__name">${country.name.common}</h3>
        <h4 class="country__row>Population: ${country.population.toLocaleString()}</h4>
        <h4 class="country__region">Region: ${country.region}</h4>
        <h4 class="country__row>Capital: ${country.capital ?  country.capital[0] : 'N/A'}</h4>
        <h4 class="country__row>Area: ${country.area.toLocaleString()} km<sup>2</sup></h4>
        <h4 class="country__row>Languages: ${Object.values(country.languages).join(', ')}</h4>
        <h4 class="country__row>Currencies: ${Object.values(country.currencies).join(', ')}</h4>
        <h4 class="country__row>Timezones: ${Object.values(country.timezones).join(', ')}</h4>
        <h4 class="country__row>Borders: ${country.borders ? country.borders.join(', ') : 'N/A'}</h4>
    </div>
    </div>
    `
    countriesContainer.appendChild(countryElement);
}
});
