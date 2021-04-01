import { html } from 'https://unpkg.com/lit-html?module';

import {createTeam} from "./data.js"

function createTemplate(onSubmit){
    return html`
    <section @submit=${onSubmit} id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form id="create-form" class="main-form pad-large">
            <div class="error"></div>
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`
}

export async function create(ctx){
    ctx.render(createTemplate(onSubmit));


    async function onSubmit(e){
        e.preventDefault();
        let form =e.target;
        let errorDiv=form.querySelector("div")
        let formData= new FormData(form);
        let name=formData.get("name");
        let logoUrl=formData.get("logoUrl");
        let description=formData.get("description");

        if (name.length<4){
            errorDiv.textContent="Name must be atleast 4 characters!";
            return; 
        }
        if (logoUrl.length<1){
            errorDiv.textContent="Logo is mandatory!";
            return; 
        }
        if (description.length<10){
            errorDiv.textContent="Description must be atleast 10 characters!";
            return; 
        }
        let team={name, logoUrl,description}

        let result=await createTeam(team);
           ctx.page.redirect("/details/"+result._id)
    }
}

//redirect to details