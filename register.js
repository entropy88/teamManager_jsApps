import { html } from 'https://unpkg.com/lit-html?module';
import {register as apiRegister} from "./data.js"

function registerTemplate(onSubmit){
    return html`
       <section @submit=${onSubmit} id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form id="register-form" class="main-form pad-large">
                        <div class="error"></div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>
    `
}

export async function register(ctx){
ctx.render(registerTemplate(onSubmit));

async function onSubmit(e){
    e.preventDefault();
    let form = e.target;
    let formData=new FormData(form);
    let email=formData.get("email");
    let password=formData.get("password");
    let repass=formData.get("repass");
    let username=formData.get("username");

    let errorDiv=form.querySelector("div");
    if (email.length<1 || password.length<1 ||username.length<1|| repass.length<1){
        errorDiv.textContent="All fields are required!"
        return;
    }

    if (repass!==password){
        errorDiv.textContent="Passwords don\`t match!"
        return;
    }
    await apiRegister(email,username,password);
    ctx.page.redirect("/myTeams");
}
}