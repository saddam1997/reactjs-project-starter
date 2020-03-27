
import { authHeader } from '../_helpers';
import { CONST } from '../_config';

export const userService = {
    login,
    logout,
    uploadImage,
    getAllUser
};
function logout() {
    localStorage.removeItem('adminuser');
}
function login(data) {

    let header = new Headers({
            'Content-Type': 'application/json',
            "Authorization": authHeader().Authorization
        });
        const requestOptions = {
            method: "POST",
            headers: header,
            body: JSON.stringify(data)
        }
        return fetch(CONST.BACKEND_URL + `/login`, requestOptions)
            .then(handleResponse)
            .then(user => {
                let userObj = {
                    userinfo: user.data
                }
                if (user.data) {
                    localStorage.setItem('adminuser', JSON.stringify(user.data));
                }
                
                return userObj;
            });
}
function getAllUser(data) {
    let header = new Headers({
        'Content-Type': 'application/json',
        "Authorization": authHeader().Authorization
    });
    const requestOptions = {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    }
    return fetch(CONST.BACKEND_URL + `/getUserList`, requestOptions)
        .then(handleResponse)
        .then(data => {

            let userObj = {
                listOfRestaurant: data.data
            }
            console.log();
            
            return userObj;
        });
}
function uploadImage(filedata) {

    let header = new Headers({
        "Authorization": authHeader().Authorization
    });
    var data = new FormData();
    data.append('image', filedata);

    const requestOptions = {
        method: "POST",
        headers: header,
        body: data
    }
    return fetch(CONST.BACKEND_URL + `/uploadFile`, requestOptions)
        .then(handleResponse)
        .then(res => {
            let userObj = {
                filesDetails: res.data
            }
            return userObj;
        });
}
function handleResponse(response) {
   // console.log("response22222   ", response);

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }
            console.log("datadatadata ", response);

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        //console.log("datadatadatadatadata   ", data.error);
        if (data.error) {
            console.log("datadatadatadatadata   ", data);
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}