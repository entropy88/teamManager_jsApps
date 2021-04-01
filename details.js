import { html } from 'https://unpkg.com/lit-html?module';
import {getTeamById} from "./data.js"

function detailsTemplate(team, isOwner){
    return html`
     <section id="team-home">
                <article class="layout">
                    <img src="${team.logoUrl}" class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${team.name}</h2>
                        <p>${team.description}</p>
                        <span class="details">3 Members</span>

                        ${isOwner==true?html`<div>
                            <a href="/edit/${team._id}" class="action">Edit team</a>
                            <a href="#" class="action">Join team</a>
                            <a href="#" class="action invert">Leave team</a>
                            Membership pending. <a href="#">Cancel request</a>
                        </div>`:""}
                        
                    </div>
                   
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                        ${isOwner==true?html` <li>My Username</li>
                            <li>James<a href="#" class="tm-control action">Remove from team</a></li>
                            <li>Meowth<a href="#" class="tm-control action">Remove from team</a></li>`:
                        html`<li>My Username</li>
                            <li>James</li>
                            <li>Meowth</li>`}

                        </ul>
                    </div>

                    ${isOwner==true?html`   <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                            <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                        </ul>
                    </div>`:""}
                 
                </article>
            </section>
    `
}

export async function details(ctx){
    let teamId=ctx.params.id;
   let team= await getTeamById(teamId);
   let isOwner=team._ownerId==sessionStorage.getItem("userId")
    ctx.render(detailsTemplate(team,isOwner))
}