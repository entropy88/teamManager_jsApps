import { html } from 'https://unpkg.com/lit-html?module';
import {getTeamById} from "./data.js";
import {editTeam} from "./data.js"

function editTemplate(team, onSubmit){
    return html`
     <section @submit=${onSubmit} id="edit">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Edit Team</h1>
                    </header>
                    <form id="edit-form" class="main-form pad-large">
                        <div class="error"></div>
                        <label>Team name: <input type="text" name="name" .value=${team.name}></label>
                        <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl}></label>
                        <label>Description: <textarea name="description" .value=${team.description} ></textarea></label>
                        <input class="action cta" type="submit" value="Save Changes">
                    </form>
                </article>
            </section>
        
    `
}

export async function edit(ctx){
    let teamId=ctx.params.id;
    let team=await getTeamById(teamId);
    ctx.render(editTemplate(team, onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let form=e.target;
        let formData= new FormData(form);
        let errorDiv=form.querySelector("div");
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

        await editTeam(teamId,team);
        ctx.page.redirect("./details/"+teamId)
    }
}