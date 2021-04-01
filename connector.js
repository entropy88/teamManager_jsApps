import { html, render } from 'https://unpkg.com/lit-html?module';
import page from "//unpkg.com/page/page.mjs";

import {home} from "./home.js"
import {login} from "./login.js";
import {register} from "./register.js";
import {logout as apiLogout} from "./data.js"
import {myTeams} from "./myTeams.js"
import {create} from "./create.js";
import {details} from "./details.js";
import {edit} from "./edit.js";
import {browse} from "./browse.js"

let main=document.querySelector("main");
document.getElementById("logoutBtn").addEventListener("click", logout)
setUserNav();


function logout(){
    apiLogout();
    setUserNav();
    console.log("why you no refresh?")
    page.redirect("/")
}


page ("/", loadData, home);
page("/login", loadData, login);
page("/register", loadData, register);
page("/browse", loadData, browse)
page("/create", loadData, create);
page("/details/:id", loadData, details);
page("/edit/:id", loadData, edit);
page("/myTeams", loadData, myTeams);
page.start();



function setUserNav(){
    
    let userIsLogged=sessionStorage.getItem("userId")
    console.log(userIsLogged)
    let nav=document.querySelector("nav");
    let guestLinks=document.getElementById("guest")
    let logedUserLinks=document.getElementById("loggedUser")

    if(userIsLogged!=null){
        guestLinks.style.display="none";
        logedUserLinks.style.display="block"
    } else {
        guestLinks.style.display="block";
        logedUserLinks.style.display="none"
    }
    
}

function loadData(ctx, next){
    ctx.render= function(content){
        render(content, main);      
    }
    ctx.setUserNav=setUserNav;
    setUserNav();
    next();
}