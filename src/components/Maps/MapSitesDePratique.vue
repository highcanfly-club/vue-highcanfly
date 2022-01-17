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

    let markers = [];

    markers.push({
      marker: new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Nos sites de pratiqque!",
      }),
      infowindow: new google.maps.InfoWindow({
        content:
          '<div class="info-window-content"><h2>High Can Fly</h2>' +
          "<p>119 rue Marceau Martin, 59128 Flers</p></div>",
      }),
    });
    markers.push({
      marker: new google.maps.Marker({
        position: new google.maps.LatLng(50.433434, 2.585812),
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Parc départemental d'Olhain",
      }),
      infowindow: new google.maps.InfoWindow({
        content:
          '<div class="info-window-content"><h2>Par départemental d\'Olhain</h2>' +
          "<p>Parc départemental d'Olhain, niveau brevet de pilote</p></div>",
      }),
    });

    markers.push({
      marker: new google.maps.Marker({
        position: new google.maps.LatLng(50.416309, 2.511816),
        map: map,
        animation: google.maps.Animation.DROP,
        title: "La Comté",
      }),
      infowindow: new google.maps.InfoWindow({
        content:
          '<div class="info-window-content"><h2>La Comté</h2>' +
          "<p>site thermique, niveau brevet initial à brevet de pilote</p></div>",
      }),
    });

    markers.forEach((element) => {
      google.maps.event.addListener(element.marker, "click", function () {
        element.infowindow.open(map, element.marker);
      });
    });
  },
};
</script>
