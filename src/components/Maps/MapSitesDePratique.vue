<template>
  <div
    id="map-canvas"
    class="relative w-full rounded h-600-px"
    data-lat="50.399668"
    data-lng="3.096878"
  ></div>
</template>
<script>
export default {
  mounted() {
    let google = window.google;
    let map = document.getElementById("map-canvas");
    let lat = map.getAttribute("data-lat");
    let lng = map.getAttribute("data-lng");

    const myLatlng = new google.maps.LatLng(lat, lng);

    const mapOptions = {
      zoom: 8,
      scrollwheel: false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#5e72e4" }, { visibility: "on" }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    let markersSrc = [];

    markersSrc.push({
      latitude: lat,
      longitude: lng,
      title: "HighCanFly",
      content:
        '<div class="info-window-content"><h2>High Can Fly</h2>' +
        "<p>119 rue Marceau Martin, 59128 Flers</p></div>",
    });

    markersSrc.push({
      latitude: 50.433434,
      longitude: 2.926172,
      title: "Parc départemental d'Olhain",
      content:
        '<div class="info-window-content"><h2>Par départemental d\'Olhain</h2>' +
        "<p>Parc départemental d'Olhain, niveau brevet de pilote</p></div>",
    });

    markersSrc.push({
      latitude: 50.401535,
      longitude: 2.585812,
      title: "Parc des Îles, Aquaterra",
      content:
        '<div class="info-window-content"><h2>Parc des Îles, Aquaterra</h2>' +
        "<p>Notre site de gonflage</p></div>",
    });

    markersSrc.push({
      latitude: 50.416309,
      longitude: 2.511816,
      title: "La Comté",
      content:
        '<div class="info-window-content"><h2>La Comté</h2>' +
        "<p>site thermique, niveau brevet initial à brevet de pilote</p></div>",
    });

    markersSrc.push({
      latitude: 50.679528,
      longitude: 1.567023,
      title: "Équihen-Plage",
      content:
        '<div class="info-window-content"><h2>Équihen-Plage</h2>' +
        "<p>site de soaring, niveau brevet initial à brevet de pilote selon les conditions</p></div>",
    });

    markersSrc.forEach((element) => {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(element.latitude, element.longitude),
        map: map,
        animation: google.maps.Animation.DROP,
        title: element.title,
      });

      let infowindow = new google.maps.InfoWindow({
        content: marker.content,
      });
      google.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
      });
    });
  },
};
</script>
