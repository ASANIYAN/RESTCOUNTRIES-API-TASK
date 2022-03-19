let countries; // will contain fetched data
const Country = localStorage.getItem('Country');

fetch('https://restcountries.com/v3.1/all')
.then(res => res.json())
.then(data => showSelectedCountry(data))
.catch(err => console.log(`Error: ${err}`));

function showSelectedCountry(countryData) {
    countries = countryData;
    const selectedCountryData = countries.find(country => country.name.common.toUpperCase() === Country.toUpperCase());
    let countryInfo = "";

    countryInfo += `
    <div class="container-fluid mt-4">
            <div class="row image-hold">
                <div class="col-sm-12 col-md-6 mt-3">
                    <img src="${selectedCountryData.flags.png}" class="img-fluid" alt="Responsive image">
                </div>
                <div class="col-sm-12 col-md-6 mt-3" style="color: #f8fbfb;">
                    <h2 class="country"> ${selectedCountryData.name.common} </h2>

                    <div class="col-12 features">
                        <p class="col-md-6 col-sm-12 ">Native Name : <span class="nativeName" style="font-weight: 200;"> Uru</span></p>

                        <p class="col-md-6 col-sm-12 ">Top level Domain : <span class="tolLevepDomain" style="font-weight: 200;"> Uru</span></p>
                    </div>

                    <div class="col-12 features">
                        <p class="col-md-6 col-sm-12 ">Population : <span class="population" style="font-weight: 200;">  ${selectedCountryData.population.toString()} </span></p>

                        <p class="col-md-6 col-sm-12">Currencies: <span class="tolLevepDomain" style="font-weight: 200;"> Euro </span></p>
                    </div>


                    <div class="col-12 features">
                        <p class="col-md-6 col-sm-12">Region: <span class="region" style="font-weight: 200;"> ${selectedCountryData.region} </span></p>

                        <p class="col-md-6 col-sm-12">Languages: <span class="languages" style="font-weight: 200;"> Dutch, French, German </span>
                        </p>
                    </div>

                    <p class="col-12">Sub Region: <span class="subregion" style="font-weight: 200;"> Western Europe </span></p>

                    <p class="col-12">Capital: <span class="subregion" style="font-weight: 200;"> ${selectedCountryData.capital?countryData.capital:'Not available'} </span></p>


                    <div class="col-12 mt-4 border-hold">
                        <p> Border Countries: </p>
                         <button class="borders mt-2 col-md-4" style="font-weight: 200;">France</button>
                         <button class="borders mt-2 col-md-4" style="font-weight: 200;">Germany</button>
                         <button class="borders mt-2 col-md-4" style="font-weight: 200;">Netherlands</button>
                         <button class="borders mt-2 col-md-4" style="font-weight: 200;">Netherlands</button>
                         <button class="borders mt-2 col-md-4" style="font-weight: 200;">Netherlands</button>
                         <button class="borders mt-2 col-md-4" style="font-weight: 200;">Netherlands</button>
                    </div>

                </div>
            </div>
        </div>
    `
}