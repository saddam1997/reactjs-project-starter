import Geocode from 'react-geocode';
Geocode.setApiKey('AIzaSyC0Wg4XZU-975h_bvgR9p4b_kpPexiRddQ');
Geocode.enableDebug();
const location = window.navigator && window.navigator.geolocation;

export function plus(a, b) {
    return a + b;
}


export function getCurrentPosition() {
    return new Promise(function (resolve, reject) {
        location.getCurrentPosition((position) => {
            resolve(position);
        }, (error) => {
            reject(error);
        })
    });
}

export function getCurrentAddress(data) {
    return new Promise(function (resolve, reject) {
        Geocode.fromLatLng(data.coords.latitude, data.coords.longitude).then(
            response => {
                const address = response.results;
                resolve(address);
            },
            error => {
                //console.error(error);
                reject(error);
            }
        );
    });
}
