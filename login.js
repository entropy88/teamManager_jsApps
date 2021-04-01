import { html, render } from 'https://unpkg.com/lit-html?module';
import {login as apiLogin} from "./data.js"

function loginTemplate(onSubmit){
    return html`
      <section @submit=${onSubmit} id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form id="login-form" class="main-form pad-large">
                        <div class="error"></div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
    `
}

export async function login(ctx){
ctx.render(loginTemplate(onSubmit));

async function onSubmit(e){
    e.preventDefault();
    let form = e.target;
    let formData=new FormData(form);
    let email=formData.get("email");
    let password=formData.get("password");

    let errorDiv=form.querySelector("div");
    if (email.length<1 || password.length<1){
        errorDiv.textContent="Both fields are required!"
        return ;
    }
    await apiLogin(email, password);
    ctx.page.redirect("/myTeams");
}
}