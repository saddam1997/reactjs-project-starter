import { alertConstants } from '../_constants';//Raman
import {  toast } from 'react-toastify';


export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    let messagetest = message.toString();
    toast(messagetest)
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    let messagetest = message.toString();
    toast(messagetest)
    return { type: alertConstants.ERROR, message: messagetest };
}

function clear() {
    return { type: alertConstants.CLEAR };
}