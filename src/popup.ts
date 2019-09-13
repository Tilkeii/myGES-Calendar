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

$('#test-button').click((ev) => {
    ev.preventDefault();
    connectMyGesTest();
})

function makeBaseAuth(user: String, password: String) {
    let tok = user + ':' + password;
    let hash = btoa(tok);
    return "Basic " + hash;
}

let userName = 'frichard5';
let password = 'nE6HbvT3';

let auth = makeBaseAuth(userName, password);

let connectMyGes = (auth: any) => {
    $.post({
        url: 'https://authentication.reseau-ges.fr/oauth/authorize?response_type=token&client_id=myGES-app',

        method: 'POST',
        beforeSend: function(req){
            req.setRequestHeader('Authorization', auth)
        },
        success: function(data){
            console.log("success : ", data)
        },
        error: function(data: any){
            console.log("error : ", eval(data));
        }

    })
}

let connectMyGesTest = () => {
    connectMyGes(auth);
}