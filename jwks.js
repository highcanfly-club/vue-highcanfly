const fs = require('fs');

function listDir(dir) {
    fs.readdir(dir, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
}


async function getJwks() {
    console.log(`retrieve https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`)
    const https = require('https')
    const url = `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`;
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                data = JSON.parse(data);
                data.domain = process.env.AUTH0_DOMAIN;
                data.namespace = process.env.AUTH0_CUSTOM_NAMESPACE;
                resolve(data);
            })
        }).on('error', err => {
            console.log(err.message);
            reject(err);
        })
    });
}

(async () => {
    const jwks = await getJwks();
    fs.writeFile('./jwks.json',
    JSON.stringify(jwks),
    'utf8', function (err) {
        listDir('.');
        if (err) return console.log(err);
    });
})();
