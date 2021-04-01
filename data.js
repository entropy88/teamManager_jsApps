import * as api  from "./api.js"

const host="http://localhost:3030"
api.settings.host=host;



export const login=api.login;
export const register=api.register;
export const logout=api.logout;

export async function getMyTeams(){
    let userId=sessionStorage.getItem("userId");
    let teams=await api.get(host+`/data/members?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`);
    return teams;
}

export async function getAllTeams(){
    return await api.get(host+"/data/teams");
}

export async function getTeamById(teamId){
    return await api.get(host+`/data/teams/${teamId}`)
}
export async function createTeam(team){
return await api.post(host+"/data/teams",team)
}

export async function editTeam(teamId,data){
    await api.put(host+ `/data/teams/${teamId}`, data)
}






