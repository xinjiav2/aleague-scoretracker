document.querySelectorAll('.filter').forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelectorAll('.filter-input').forEach(input => {
            input.classList.add('hidden');
        });
        const filterId = filter.dataset.filter + '-filter';
        document.getElementById(filterId).classList.remove('hidden');
    });
});


var destination = document.getElementById("destination").textContent.trim().replace(/\s+/g, '+');
var place = document.getElementById("place").textContent.trim().replace(/\s+/g, '+');


const url = `https://nominatim.openstreetmap.org/search?q=${destination},${place}&format=json&addressdetails=`;


async function fetchHotelData() {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "MyHotelApp/1.0 (contact@example.com)"
            }
        });


        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


        const data = await response.json();

        const body = document.getElementById("body");

        data.forEach((place, index) => {

            const card = document.createElement("div");
            card.className = "card";
            placeInfo = place.display_name.split(", ")
            placeInfo.forEach((point) => {
                const pointElement = document.createElement("p");
                pointElement.textContent = point;
                card.appendChild(pointElement);
            })

            body.appendChild(card);
        });



        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchHotelData();
