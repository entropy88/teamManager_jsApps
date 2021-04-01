import { html } from 'https://unpkg.com/lit-html?module';
import {getMyTeams} from "./data.js"

function myTeamsTeplate(teams){
    return html`<section id="my-teams">

    <article class="pad-med">
        <h1>My Teams</h1>
    </article>
    
    ${teams.length>0?
    teams.map(teamTemplate):html`   <article class="layout narrow">
        <div class="pad-med">
            <p>You are not a member of any team yet.</p>
            <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                team.</p>
        </div>
        <div class=""><a href="/create" class="action cta">Create Team</a></div>
    </article>`}
    
        
    </section>`
}

export async function myTeams(ctx){
    let teams=await getMyTeams();
    console.log(teams)
    ctx.render(myTeamsTeplate(teams))
}

function teamTemplate(team){
    return html`<article class="layout">
    <img src="./assets/rocket.png" class="team-logo left-col">
    <div class="tm-preview">
        <h2>Team Rocket</h2>
        <p>Gotta catch 'em all!</p>
        <span class="details">3 Members</span>
        <div><a href="details/${team._id}" class="action">See details</a></div>
    </div>
</article>`
}