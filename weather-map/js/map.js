mapboxgl.accessToken = 'pk.eyJ1IjoianJ1ZWRhcyIsImEiOiJja29lZzZzaHAwYTNtMm5ucjAzajdleDkyIn0.yY13LnqWTQzsI8ESEwK-1A';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-98.4916, 29.4252], // starting position [lng, lat]
    zoom: 9, // starting zoom
});

// Note that map.on is bespoke Mapbox stuff
// https://docs.mapbox.com/mapbox-gl-js/api/map/#map.event:click
// It is NOT jQuery
map.on('click', event => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    const markers = document.querySelectorAll(".mapboxgl-marker");
    markers.forEach(marker => marker.remove());
    document.querySelectorAll(".weatherCard").forEach(card => card.remove());
    const marker = new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    getAndSetWeather(latitude, longitude, true);
    //reverseGeocode({lat: latitude, lng: longitude}, MAPBOX_API_TOKEN).then(data=>console.log(data));
    getCity(longitude, latitude, MAPBOX_API_TOKEN).then(city => {
        const citySpan = document.querySelector("header p span");
        citySpan.innerText = city;
    });
});

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    // console.log(event.target);
    // console.log(event.target[0].value);
    const userSearch = event.target[0].value;
    geocode(userSearch, MAPBOX_API_TOKEN).then(coords => {
        // console.log(coords);
        map.setCenter(coords);
        document.querySelectorAll(".mapboxgl-marker").forEach(marker => marker.remove());
        const marker = new mapboxgl.Marker()
            .setLngLat(coords)
            .addTo(map);
        document.querySelectorAll(".weatherCard").forEach(card => card.remove());
        getAndSetWeather(coords[1], coords[0], true);
        getCity(coords[0], coords[1], MAPBOX_API_TOKEN).then(city => {
            const citySpan = document.querySelector("header p span");
            citySpan.innerText = city;
        });
        event.target[0].value = '';
    });
})