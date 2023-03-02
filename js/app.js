let loadPhone = async (search) => {
    try {
        let url = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
        let res = await url.json();
        showPhone(res.data);
    } catch (error) {
        console.log(error);
    };
}

loadPhone('iphone');

document.getElementById('phone-search-input').addEventListener('keypress', event => {
    let phoneSearchInput = document.getElementById('phone-search-input').value;
    if (event.key === 'Enter') {
        loadingSpinner(true);
        loadPhone(phoneSearchInput);
    }
});

let searchPhone = () => {
    loadingSpinner(true);

    let phoneSearchInput = document.getElementById('phone-search-input').value;
    loadPhone(phoneSearchInput);
}

let loadingSpinner = (loading) => {
    let loadingSpinnerSection = document.getElementById('loadingSpinnerSection');
    if (loading) {
        loadingSpinnerSection.classList.remove('d-none');
    } else {
        loadingSpinnerSection.classList.add('d-none');
    }
}

let showPhone = (phones) => {
    let alertMessage = document.getElementById('alertMessage');
    if (phones.length === 0) {
        alertMessage.classList.remove('d-none');
    } else {
        alertMessage.classList.add('d-none');
    }

    let productSection = document.getElementById('product-section');
    productSection.innerText = '';
    phones.forEach(phone => {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = `
            <div class="card" style="width: 18.7rem;">
                <img src="${phone.image}" class="card-img-top img-fluid px-4 pt-3" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>

                    <!-- Button trigger modal -->
                    <button type="button" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">See details</button>

                </div>
            </div>
        `;
        productSection.appendChild(newDiv);
    });

    loadingSpinner(false);
}

let loadPhoneDetails = async (id) => {
    try {
        let phoneDetailsUrl = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        let res = await phoneDetailsUrl.json();
        showPhoneDetails(res);
    } catch (error) {
        console.log(error);
    }
}

let showPhoneDetails = (phoneDetails) => {

    let phoneDetailsModalLabel = document.getElementById('phoneDetailsModalLabel');
    phoneDetailsModalLabel.innerText = phoneDetails.data.name;

    let phoneDisplaySize = document.getElementById('phoneDisplaySize');
    phoneDisplaySize.innerText = phoneDetails.data.mainFeatures.displaySize ? phoneDetails.data.mainFeatures.displaySize : 'No display date available';

    let phoneProcessors = document.getElementById('phoneProcessors');
    phoneProcessors.innerText = phoneDetails.data.mainFeatures.chipSet ? phoneDetails.data.mainFeatures.chipSet : 'No Processors date available';

    let phoneMemory = document.getElementById('phoneMemory');
    phoneMemory.innerText = phoneDetails.data.mainFeatures.memory ? phoneDetails.data.mainFeatures.memory : 'No memory date available';

    let phoneSensors = document.getElementById('phoneSensors');
    phoneSensors.innerText = phoneDetails.data.mainFeatures.sensors ? phoneDetails.data.mainFeatures.sensors : 'No sensors date available';

    let phoneReleaseDate = document.getElementById('phoneReleaseDate');
    phoneReleaseDate.innerText = phoneDetails.data.releaseDate ? phoneDetails.data.releaseDate : 'No release date available';
}