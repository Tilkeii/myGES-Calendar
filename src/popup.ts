import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/js/all';
import './css/custom.css';
import * as $ from 'jquery';
import { MyGESAuth } from './types/auth';

console.log("Popup");

$('form#loginForm').submit(async ev => {
    ev.preventDefault();
    // console.log('Submit');
    let email = $("#email").val();
    let password = $("#password").val();
    let auth = makeBaseAuth(email, password);
    try {
        let data: MyGESAuth = await connectMyGes(auth);
        console.log("DATA", data);
    } catch (err) {
        console.log(err);
    }
});

/**
 * Retourne le token si il existe
 * Rejete une erreur si il n'existe pas
 * Interactive => https://developer.chrome.com/apps/identity#method-getAuthToken
 * @param interactive 
 */
function getAuthToken(interactive: boolean = true): Promise<string> {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: interactive }, (token: string) => {
            if (token)
                return resolve(token);
            else
                return reject('Token introuvable');
        })
    })
}

/**
 * 
 * @param token 
 */
function logout(token: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            await $.get(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
            chrome.identity.removeCachedAuthToken({ token: token }, () => {
                return resolve();
            });
        } catch (err) {
            return reject(err);
        }
    });
}

function makeBaseAuth(user: any, password: any) {
    let tok = user + ':' + password;
    let hash = btoa(tok);
    return "Basic " + hash;
}

let connectMyGes = (auth: any): Promise<MyGESAuth> => {
    return new Promise(async (resolve, reject) => {
        try {
            let success: MyGESAuth = await $.ajax({
                url: process.env.URL_MYGES_TOKEN,
                method: 'GET',
                headers: {
                    'Authorization': auth
                },
                dataType: 'json'
            });
            console.log('Success', success);
            return resolve(success);
        } catch (err) {
            return reject(err);
        }
    })
}