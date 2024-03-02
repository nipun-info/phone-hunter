
const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // display only first 12 phones

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleLoadingSpinner(false)
}

loadPhone();

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);

    const searchTextValue = document.getElementById('search-field').value;
    // console.log(searchText);
    loadPhone(searchTextValue, isShowAll);
}


// toggle loading spinner
const toggleLoadingSpinner = (isloading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isloading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true)
}


const showDetails = async (id) => {
    // console.log("Clicke show Details", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data;

    const showPhoneName = document.getElementById('show-detail-phone-name');
    showPhoneName.innerText = phone.name;

    showDetailsContainer = document.getElementById('show-detail-container');
    showDetailsContainer.innerHTML = `
        <img src="${phone.image}" />
        <p><span>Storage:</span> ${phone?.mainFeatures?.storage}</p>

    `

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    show_details_modal.showModal();
}
