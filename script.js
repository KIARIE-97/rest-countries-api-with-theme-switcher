document.addEventListener("DOMContentLoaded", () => {
  const countriesContainer = document.getElementById("countries_container");
  const toggleBtn = document.getElementById("theme_switcher"); // to help apply dark mode
  const searchInput = document.getElementById("search");
  const regionFilter = document.getElementById("region");
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("close_modal");
  const modalContent = document.getElementById("modal_content");

  // Event Listeners
  searchInput.addEventListener("input", filterCountries);
  regionFilter.addEventListener("change", filterCountries);
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  toggleBtn.addEventListener("click", toggleTheme);

 const fetchCountries =  async  () => {
    const res = await fetch("./data.json");
    const countries = await res.json();
    console.log(countries);
    displayCountries(countries);
  }
  fetchCountries();

  function displayCountries(countries) {
    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
      const countryElement = document.createElement("div");
      countryElement.classList.add("card");

      countryElement.innerHTML = `
          <div>
              <img src="${country.flags.png}" alt="${country.name.common}" />
          </div>
          <div class="card-body">
              <h3 class="country-name">${country.name}</h3>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p class="country-region"><strong>Region:</strong> ${
                country.region
              }</p>
              <p><strong>Capital:</strong> ${
                country.capital ? country.capital[0] : "N/A"
              }</p>
          </div>
        `;

        countryElement.addEventListener("click", () => {
            displayCountryDetails(country);
      });

      countriesContainer.appendChild(countryElement);
    });
  }

  function displayCountryDetails(country) {
    

    const languages = Object.values(country.languages || {})
    .map(language => language.name)
    .join(", ");
    const currencies = Object.values(country.currencies || {})
      .map((curr) => curr.name)
      .join(", ");

    modalContent.innerHTML = `
        <div class="modal-img">
          <img src="${country.flags.png}" alt="${country.name.common}" />
        </div>
        <div class="modal-info">
          <h2>${country.name}</h2>
          <p><strong>Native Name:</strong> ${country.nativeName}</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Sub Region:</strong> ${country.subregion}</p>
          <p><strong>Capital:</strong> ${
            country.capital ? country.capital : "N/A"
          }</p>
          <p><strong>Top Level Domain:</strong> ${country.topLevelDomain[0]}</p>
          <p><strong>Currencies:</strong> ${currencies}</p>
          <p><strong>Languages:</strong> ${languages }</p>
        </div>
      `;

    modal.style.display = "flex";
  }

  function filterCountries() {
    const searchValue = searchInput.value.toLowerCase();
    const regionValue = regionFilter.value;

    const allCountries = document.querySelectorAll(".card");

    allCountries.forEach((countryCard) => {
      const countryName = countryCard
        .querySelector(".country-name")
        .innerText.toLowerCase();
      const countryRegion = countryCard
        .querySelector(".country-region")
        .innerText.split(": ")[1]
        .toLowerCase();

      if (
        (countryName.includes(searchValue) || searchValue === "") &&
        (countryRegion === regionValue || regionValue === "all")
      ) {
        countryCard.style.display = "block";
      } else {
        countryCard.style.display = "none";
      }
    });
  }

  function toggleTheme() {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
      toggleBtn.innerHTML = `☀️ Light Mode`;
    } else {
      toggleBtn.innerHTML = `🌙 Dark Mode`;
    }
  }
});
