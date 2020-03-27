import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { toast } from 'react-toastify';
export const userActions = {
    login,
    logout,
    uploadImage,
    getAllUser
};
function login(data, props) {
    return dispatch => {
        dispatch(request({ data }));
        userService.login(data)
            .then(
                user => {
                    dispatch(success(user));
                    props.history.push({ pathname: 'app/dashboard' });
                },
                error => {
                    console.log("errorerror ", error);
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function getAllUser(data) {
    return dispatch => {
        dispatch(request());
        userService.getAllUser(data)
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
function uploadImage(data) {
    return dispatch => {
        userService.uploadImage(data)
            .then(
                uploadImage => {
                    toast("Image Uploaded successfully.")
                    dispatch(success(uploadImage));
                },
                error => {
                    dispatch(alertActions.error(error));
                    dispatch(failure(error))
                }
            );
    };
    function success(uploadImage) { return { type: userConstants.FILE_UPLOAD_STATUS_SUCCESS, uploadImage } }
    function failure(error) { return { type: userConstants.FILE_UPLOAD_STATUS_FAILURE, error } }
}