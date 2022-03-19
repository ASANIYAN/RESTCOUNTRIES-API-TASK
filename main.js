//Global Variables
let countries; // will contain fetched data


fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => showAllCountries(data))
.catch(err => console.log(`Error: ${err}`));

function showAllCountries(countriesData) {
    countries = countriesData;
    let countryInfo = "";
    let countryHold = document.querySelector('.country-hold');
    //console.log(countries);

    countries.forEach(country => {
        countryInfo +=
        `<div class="card col-sm-12 col-md-6 col-lg-5 mt-4 allCountry" id="${country.name.common}" style="width: 18rem;">
        <img src="${country.flags.png}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${country.name.common}</h5>
        <p class="card-text">Population:
        <span class="population">
        ${country.population.toString()}
        </span>
        </p>
        <p class="card-text">Region: <span class="region">
        ${country.region}
        </span>
        </p>
        <p class="card-text">Capital: <span class="capital"> ${country.capital?country.capital:'Not available'}
        </span>
        </p>
        </div>
        </div>`;

        countryHold.innerHTML = countryInfo;

    }
    );
    getDetailedCountryInfo();

    /*
    for (let i = 0; i < countries.length; ++i) {
        countryInfo += ``;
        console.log('Country:',countries[i].name.common);
        if (countries[i].capital !== undefined) {
            console.log("Capital:", countries[i].capital[0]);
        } else {
            console.log("Capital:", 'unknown');
        }
        console.log("Region:", countries[i].region);
        console.log("Population:", countries[i].population.toString());
        console.log("flag:", countries[i].flags.png);

    }*/
}

function searchForCountry() {
    let btnSearch = document.querySelector('.btn-search');
    let search = document.querySelector('.search');
    let countryHold = document.querySelector('.country-hold');
    btnSearch.addEventListener('click', () => {
        let countryInfo = "";
        if (search.value) {
            let searchedCountry = search.value;
            const countryData = countries.find(country => country.name.common.toUpperCase() === searchedCountry.toUpperCase());

                countryInfo +=
                `<div class="card col-sm-12 col-md-6 col-lg-5 mt-4 allCountry" id="${countryData.name.common}" style="width: 18rem;">
                <img src="${countryData.flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${countryData.name.common}</h5>
                <p class="card-text">Population:
                <span class="population">
                ${countryData.population.toString()}
                </span>
                </p>
                <p class="card-text">Region: <span class="region">
                ${countryData.region}
                </span>
                </p>
                <p class="card-text">Capital: <span class="capital"> ${countryData.capital?countryData.capital:'Not available'}
                </span>
                </p>
                </div>
                </div>`;

            }
            countryHold.innerHTML = countryInfo;
    })
}


searchForCountry();

function filterByRegion() {
    let select = document.querySelector('.select');
    let countryHold = document.querySelector('.country-hold');
    
    select.addEventListener('click', () => {
        let countryInfo = "";
        //console.log(select.value);
        let selectedRegion = select.value;
            const countryData = countries.filter(country => country.region.toUpperCase() === selectedRegion.toUpperCase());console.log(countryData);

            countryData.forEach(country => {
                countryInfo +=
                `<div class="card col-sm-12 col-md-6 col-lg-5 mt-4 allCountry" id="${country.name.common}" style="width: 18rem;">
                <img src="${country.flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">Population:
                <span class="population">
                ${country.population.toString()}
                </span>
                </p>
                <p class="card-text">Region: <span class="region">
                ${country.region}
                </span>
                </p>
                <p class="card-text">Capital: <span class="capital"> ${country.capital?country.capital:'Not available'}
                </span>
                </p>
                </div>
                </div>`;

                countryHold.innerHTML = countryInfo;
            })
    })
}

filterByRegion();

function getDetailedCountryInfo() {
    let allCountry = document.querySelectorAll('.allCountry');
    allCountry.forEach(country => {
        country.style.cursor = 'pointer';
        country.addEventListener('click', () => {
            console.log(country.id);
            localStorage.setItem('Country', country.id);
        })
    })
}

