import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/js/all';
import './css/custom.css';
import * as $ from 'jquery';

console.log("Popup");

$('form#loginForm').submit(async ev => {
    ev.preventDefault();
    console.log('Submit')
});

/**
 * Retourne le token si il existe
 * Rejete une erreur si il n'existe pas
 * Interactive => https://developer.chrome.com/apps/identity#method-getAuthToken
 * @param interactive 
 */
function getAuthToken(interactive: boolean = true): Promise<string> {
    return new Promise(resolve => {
        chrome.identity.getAuthToken({ interactive: interactive }, (token: string) => {
            if (token)
                resolve(token);
            else
                throw new Error('Token introuvable');
        })
    })
}

/**
 * 
 * @param token 
 */
function logout(token: string): Promise<void> {
    return new Promise(async resolve => {
        try {
            await $.get(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
            chrome.identity.removeCachedAuthToken({ token: token }, () => {
                resolve();
            });
        } catch (err) {
            throw new Error(err);
        }
    });
}