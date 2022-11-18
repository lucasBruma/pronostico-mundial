// variables
const url = "https://v3.football.api-sports.io/fixtures?league=1&season=2022";
const stagesContainer = document.querySelector(".group-stage")

//event
document.addEventListener('DOMContentLoaded', callAPI);

//functions
function callAPI(){
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "f397ec97dd42f7cd90966150cb06c2b4"
        }
    })
    .then(response => response.json())
    .then(data => showHTML(data.response))
    .catch(err => {
        console.log(err);
    });
}

const docFrag = document.createDocumentFragment();

const title1 = "<h2 id='stage1'>Group Stage 1</h2>";
const title2 = "<h2 id='stage2'>Group Stage 2</h2>";
const title3  = "<h2 id='stage3'>Group Stage 3</h2>";

const div1 = document.createElement("DIV");
const stage1 = document.createElement("DIV");
stage1.classList.add("group-stage-item");
div1.innerHTML = title1;
div1.appendChild(stage1);

const div2 = document.createElement("DIV");
const stage2 = document.createElement("DIV");
stage2.classList.add("group-stage-item");
div2.innerHTML = title2;
div2.appendChild(stage2);

const div3 = document.createElement("DIV");
const stage3 = document.createElement("DIV");
stage3.classList.add("group-stage-item");
div3.innerHTML = title3;
div3.appendChild(stage3);

function showHTML(data){
    data.forEach(match => {
        console.log(match);

        if(match.goals.home == null) match.goals.home = "-";
        if(match.goals.away == null) match.goals.away = "-";

        let div = `
        <div class="knockout__match">
            <div class="match-titles">
                <h2>${match.league.round}</h2>
                <h4>${match.fixture.status.long}</h2>
            </div>
            <div class="knockout__match-teams">
                <div class="match">
                    <div class="team1 match-team">
                        <div class="knockout__match-text match__api">
                            <p>${match.goals.home}</p>
                            <img src="${match.teams.home.logo}" alt="Home logo">
                            <p>${match.teams.home.name}</p>
                        </div>
                    </div>
                    <div class="team2 match-team">
                        <div class="knockout__match-text match__api">
                            <p>${match.goals.home}</p>
                            <img src="${match.teams.away.logo}" alt="Away logo">
                            <p>${match.teams.away.name}</p>
                        </div>
                    </div>
                </div>
                <div class="match-vs">
                    <span class="match-vs__text">vs</span>
                </div>
            </div>
        </div>
        `;

        if(match.league.round == "Group Stage - 1"){
            stage1.innerHTML += div;
        }else if(match.league.round == "Group Stage - 2"){
            stage2.innerHTML += div;
        }else{
            stage3.innerHTML += div;
        }

    });
}

docFrag.appendChild(div1);

docFrag.appendChild(div2);

docFrag.appendChild(div3);


stagesContainer.appendChild(docFrag)