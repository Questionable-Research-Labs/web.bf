import { bfc } from "./compile";

document.addEventListener("DOMContentLoaded", function(event) { 
    const web_location = window.atob(window.location.pathname.slice(1));
    console.log(web_location)
    const bf_return = bfc(web_location)
    document.body.innerHTML = '';
    console.log(bf_return)
    document.open();
    document.write(bf_return);
    document.close();
});