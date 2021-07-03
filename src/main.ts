import { bfc } from "./compile";
import "regenerator-runtime/runtime.js";

document.addEventListener("DOMContentLoaded", function (event) {
  const web_location = window.atob(window.location.pathname.slice(1));
  console.log(web_location);
  bfc(web_location).then((bf_return) => {
    document.body.innerHTML = "";
    console.log(bf_return);
    document.open();
    document.write(bf_return);
    document.close();
  });
});
