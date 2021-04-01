import { html } from 'https://unpkg.com/lit-html?module';
import {getAllTeams} from "./data.js"

function browseTemplate(teams){
    return html` <section id="browse">

    <article class="pad-med">
        <h1>Team Browser</h1>
    </article>

    <article class="layout narrow">
        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
    </article>

    ${teams.map(teamTemplate)}

    <!-- <article class="layout">
        <img src="./assets/rocket.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Team Rocket</h2>
            <p>Gotta catch 'em all!</p>
            <span class="details">3 Members</span>
            <div><a href="#" class="action">See details</a></div>
        </div>
    </article>

    <article class="layout">
        <img src="./assets/hydrant.png" class="team-logo left-col">
        <div class="tm-preview">
            <h2>Minions</h2>
            <p>Friendly neighbourhood jelly beans, helping evil-doers succeed.</p>
            <span class="details">150 Members</span>
            <div><a href="#" class="action">See details</a></div>
        </div>
    </article> -->

</section>`
}

export async function browse(ctx){
    let teams=await getAllTeams();
    console.log(teams)
    ctx.render(browseTemplate(teams))
}

function teamTemplate(team){
    return html`  <article class="layout">
    <img src="${team.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.title}</h2>
        <p>${team.description}</p>
        <span class="details">5000 Members</span>
        <div><a href="/details/${team._id}" class="action">See details</a></div>
    </div>
</article>`
}