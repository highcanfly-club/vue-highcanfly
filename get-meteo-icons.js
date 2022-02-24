const fs = require('fs');
const fetch = require('node-fetch');
const METEO_FRANCE_STORE = './public/assets/forecast/';

const getMeteoFranceIconsArray = function (
  places = [
    { lat: 44.661432, lon: -1.176416, name: 'Arcachon' },
    { lat: 45.879449, lon: 6.888846, name: 'Aiguille du midi' },
    { lat: 48.385469, lon: -4.491038, name: 'Brest' },
    { lat: 50.416924, lon: 2.513619, name: 'la Comté' },
    { lat: 50.679484, lon: 1.567162, name: 'Équihen-plage' },
    { lat: 50.43358, lon: 2.585847, name: 'Parc d\'Ohlain' },
    { lat: 50.401719, lon: 2.92927, name: 'Parc des Îles' },
    { lat: 42.697679, lon: 9.449846, name: 'Bastia' },
    { lat: 48.54973, lon: 7.752666, name: 'Ostwald' },
    { lat: 14.637992, lon: -61.095531, name: 'Saint-Joseph (Martinique)' },
    { lat: -20.93398, lon: 55.595733, name: 'Saint-André (La Réunion)' },
    { lat: 46.803303, lon: -56.174957, name: 'Saint-Pierre (Collectivité de Saint-Pierre-et-Miquelon)' },
    { lat: -22.264542, lon: 166.447897, name: 'Nouméa (Nouvelle-Calédonie)' },
    { lat: -12.782469, lon: 45.228132, name: 'Pamandzi (Mayotte)' }
  ]
) {
  const API_TOKEN = "__Wj7dVSTjV9YGu1guveLyDq0g7S7TfTjaHBTPTpO0kj8__";
  const METEO_FRANCE_WEBSERVICE = "https://webservice.meteofrance.com/forecast";
  const METEO_FRANCE_ICONS_BASE =
    "https://meteofrance.com/modules/custom/mf_tools_common_theme_public/svg/weather";

  const promised = [];
  places.forEach((place) => {
    let query = `${METEO_FRANCE_WEBSERVICE}?token=${API_TOKEN}&lat=${place.lat}&lon=${place.lon}&lang=en`;
    console.log(query);
    let promise = fetch(query).then((response) => response.json());
    promised.push(promise);
  });
  return new Promise(function (resolve, reject) { //eslint-disable-line
    Promise.all(promised).then((values) => {
      const iconset = new Set();
      let iconsetSize = iconset.size;
      values.forEach((value) => {
        console.log(
          value.position.name + " has " + value.forecast.length + " forecasts"
        );
        value.forecast.forEach((prob) => {
          iconset.add(`${prob.weather.icon} ${prob.weather.desc}`);
        });
        console.log(`Added ${iconset.size - iconsetSize} icon names`);
        iconsetSize = iconset.size;
      });
      const icons = Array.from(iconset);
      icons.sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
      const uniq_icons = icons.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      const iconsMF = [];
      uniq_icons.forEach((icon) => {
        const name = icon.split(" ")[0];
        const desc = icon.slice(name.length + 1);
        iconsMF.push({
          name: name,
          url: `${METEO_FRANCE_ICONS_BASE}/${name}.svg`,
          desc: desc
        });
        resolve(iconsMF);
      });
    });
  });
};

getMeteoFranceIconsArray().then(icons => {
  const curIcons = require(`${METEO_FRANCE_STORE}mf-icons.json`);
  console.log(`There was ${curIcons.length} in mf-icons.json`);
  let newIcons = icons.concat(curIcons);
  newIcons = newIcons.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.name === value.name
    ))
  );
  console.log(`Now there is ${newIcons.length} in mf-icons.json`);
  fs.writeFile(`${METEO_FRANCE_STORE}mf-icons.json`, JSON.stringify(newIcons), function (err) {
    if (err) return console.log(err);
    console.log(`Wrote json icons`);
  });
  icons.forEach(icon => {
    fetch(icon.url).then(response => response.blob())
      .then(blob => blob.text())
      .then(svg => {
        fs.writeFile(`${METEO_FRANCE_STORE}${icon.name}.svg`, svg, function (err) {
          if (err) return console.log(err);
          process.stdout.write('.');
        })
      })
  });
});