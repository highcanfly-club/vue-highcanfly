import _places from "./src/config/places.json" assert {type: "json"};
import fs from 'fs';

fs.writeFile(`mongodb-places.json`, JSON.stringify(_places.features), function (err) {
    if (err) return console.log(err);
    console.log(`Wrote mongodb-places.json with ${_places.features.length} features`);
});