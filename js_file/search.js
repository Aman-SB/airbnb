const localData = JSON.parse(localStorage.getItem('data'));
const searchData = JSON.parse(localStorage.getItem('searchDetails'));
const resultArr = localData.results;

document.querySelector('#loc').innerText = searchData.location;
document.querySelector('#date').innerText = searchData.date;
document.querySelector('#guest').innerText = searchData.guest + " guest(s)";
const cardContainer = document.querySelector('.stay-wrapper');

makeListingCards();


function addColor(event) {
    if(event.target.style.color === 'red'){
        event.target.style.color = 'black';
    }else{
        event.target.style.color = 'red';
    }
}

function makeAmenities(arr) {
    return arr.join('&nbsp;|&nbsp;');
}


function makeListingCards() {
    resultArr.forEach( result => {
        let sampleCards = `
            <div class="img">
                <img src="${result.images[0]}" alt="${result.name}">
                <p class="distance"></p>
            </div>
            <div class="desc">
                <div class="title-cont">
                    <div class="title">${result.type +' at '+ result.city}</div>
                    <div class="sub-title">${result.name}</div>
                </div>
                <div class="amanities-cont">
                    <div class="first">
                        <p>${result.persons} guests &nbsp;|</p>
                        <p>${result.type} &nbsp;|</p>
                        <p>${result.beds + ' beds'} &nbsp;|</p>
                        <p>${result.bathrooms + ' bath'}</p>
                    </div>
                    <div class="sec">
                        <p>${makeAmenities(result.previewAmenities)}</p>
                    </div>
                </div>
                <div class="review-cont">
                    <div class="rating-desc">
                        <strong class="rating">${result.rating}</strong>
                        <img width="20px" src="./assets/star.png" alt="rating">
                        <p>(${result.reviewsCount +' reviews'})</p>
                    </div>
                    <div class="price-desc">
                    ${result.price.priceItems[0].title.split(' x ')[0]} &nbsp; /night
                    </div>
                </div>
                <i onclick="addColor(event)" style="color:black;" class="fa-regular fa-heart"></i>
                </div>
            `;
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = sampleCards;
            locations.push([result.name, result.lat, result.lng]);

            card.onclick = ()=>{
                if(localStorage.getItem('roomId')){
                    localStorage.removeItem('roomId');
                }
                localStorage.setItem('roomId', JSON.stringify({'id':result.id, 'price':result.price, 'result':{result}}));
                window.location.href = './listing.html'
            }

            cardContainer.appendChild(card);
    });
    
}


