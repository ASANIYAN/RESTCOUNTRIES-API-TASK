let countries; // will contain fetched data
const Country = JSON.parse(localStorage.getItem('Country'));

fetch('https://restcountries.com/v3.1/all')
.then(res => {
    document.querySelector(".loader").style.visibility = "visible";
    return res.json();
})
.then(data => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
    showSelectedCountry(data);
})
.catch(err => console.log(`Error: ${err}`));


function showSelectedCountry(countryData) {
    countries = countryData;
    const selectedCountryData = countries.find(country => country.name.common.toUpperCase() === Country.toUpperCase() || country.cca3.toUpperCase() === Country.toUpperCase());


    let contentDetails = document.querySelector('.content-details');

    let countryInfo = "";
    let values = "";


    if (selectedCountryData.languages !== undefined) {
        let languages = Object.values(selectedCountryData.languages);
        for (let i = 0; i < languages.length; i++) {
            values +=  languages[i] + "\n";
        }
    } else {
        values = "Not Available";
    }

    countryInfo += `
    <div class="container-fluid mt-4">
            <div class="row image-hold">
                <div class="col-sm-12 col-md-6 mt-3">
                    <img src="${selectedCountryData.flags.png}" class="img-fluid" alt="Responsive image">
                </div>
                <div class="col-sm-12 col-md-6 mt-3" style="color: #f8fbfb;">
                    <h2 class="country"> ${selectedCountryData.name.common} </h2>

                    <div class="col-12 features">
                        <p class="col-md-6 col-sm-12 ">Native Name : <span class="nativeName" style="font-weight: 200;">  ${selectedCountryData.name.common}</span></p>

                        <p class="col-md-6 col-sm-12 ">Top level Domain : <span class="topLevepDomain" style="font-weight: 200;"> ${selectedCountryData.tld?selectedCountryData.tld:"Not Available"} </span></p>
                    </div>

                    <div class="col-12 features">
                        <p class="col-md-6 col-sm-12 ">Population : <span class="population" style="font-weight: 200;">  ${selectedCountryData.population.toString()} </span></p>

                        <p class="col-md-6 col-sm-12">Currencies: <span class="currencies" style="font-weight: 200;"> Not Available </span></p>
                    </div>


                    <div class="col-12 features">
                        <p class="col-md-6 col-sm-12">Region: <span class="region" style="font-weight: 200;"> ${selectedCountryData.region} </span></p>

                        <p class="col-md-6 col-sm-12">Languages: <span class="languages" style="font-weight: 200;"> ${values} </span>
                        </p>
                    </div>

                    <p class="col-12">Sub Region: <span class="subregion" style="font-weight: 200;"> ${selectedCountryData.subregion? selectedCountryData.subregion: 'Not Available'}</span></p>

                    <p class="col-12">Capital: <span class="subregion" style="font-weight: 200;"> ${selectedCountryData.capital?selectedCountryData.capital:'Not available'} </span></p>


                    <div class="col-12 mt-4 border-hold">
                    <p> Border Countries: </p>
                    </div>

                </div>
            </div>
        </div>
    `
    contentDetails.innerHTML += countryInfo;

    let borderHoldContent = "";
    let borderHold = document.querySelector('.border-hold');
    if (selectedCountryData.borders) {
        let selectedBorders = selectedCountryData.borders;
        for (let i = 0; i < selectedBorders.length; i++) {
            borderHoldContent += `
            <button id=${selectedBorders[i]} class="borders mt-2 col-md-4" style="font-weight: 200;"> ${selectedBorders[i]} </button>
            `
        }
        borderHold.innerHTML += borderHoldContent;
    }
    showDetailsOfEachBorderCountry();
}

function showDetailsOfEachBorderCountry() {
    let borders = document.querySelectorAll('.borders');
    borders.forEach(border => {
        border.addEventListener('click', () => {
            localStorage.setItem('Country', JSON.stringify(border.id));
            location.reload();
        })
    })
}