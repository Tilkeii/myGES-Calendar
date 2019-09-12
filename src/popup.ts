import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/js/fontawesome.min';
import './css/custom.css';
import * as $ from 'jquery';

console.log("Popup");

$('form#loginForm').submit((ev) => {
    ev.preventDefault();
    console.log('Submit')
});