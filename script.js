// Esta funcion pasa al equipo de la fase de grupos a los octavos. Es usada también para cuando se resetea.
function moverPaisGrupo(pais,numero,imagen){
    nodoPadre = document.querySelector(`.knockout__match-text-${numero}`);

    if (imagen != "Borrar imagen"){
        nodoTexto = document.createElement("P");
        nodoTexto.textContent = pais

        nodoImagen = document.createElement("IMG");
        nodoImagen.setAttribute("src",imagen);

        nodoPadre.replaceChild(nodoTexto,nodoPadre.childNodes[1]);
        nodoPadre.replaceChild(nodoImagen,nodoPadre.childNodes[3]);
    }else{
        nodoTexto = document.createElement("DIV");
        nodoTexto.innerHTML = pais;

        nodoVacio = document.createElement("DIV");
        nodoVacio.textContent = " ";

        nodoPadre.replaceChild(nodoTexto,nodoPadre.childNodes[1]);
        nodoPadre.replaceChild(nodoVacio,nodoPadre.childNodes[3]);

    }
}

// n1 y n2 son los identificadores de cada uno de los equipos en octavos.
// grupo es un array

function equipos(grupo,n1,n2,letraGrupo){
    let contador=0;
    grupo.forEach(equipo => {
        equipo.addEventListener('click', () =>{
            if (contador<2){ 
                const hijos = equipo.childNodes;
                let pais = hijos[3].textContent;
                let imagen = hijos[5].src;
                divPosicion = hijos[1];
                divPosicion.style.display = "block"

                if(contador == 0){
                    divPosicion.textContent = 1;
                    moverPaisGrupo(pais,n1,imagen);
                }else{
                    divPosicion.textContent = 2;
                    moverPaisGrupo(pais,n2,imagen);
                }
                contador++;

                const btn = document.querySelector(`.btn-g${letraGrupo}`); 
                btn.style.display = "block" // cuando se hace click aparece el boton de reset
                btn.addEventListener('click', ()=>{ // al tocar el boton, con el for each recorre cada equipo y reinicia su estado, y esconde el boton.
                    contador=0;
                    grupo.forEach(equipo =>{
                        equipo.childNodes[1].textContent = "";
                        equipo.childNodes[1].style.display = "none";
                    });                        
                    moverPaisGrupo(`<p>Ganador</p> 
                    <p>Grupo ${letraGrupo}</p>`,n1, "Borrar imagen");
                    moverPaisGrupo(`<p>Segundo</p> 
                    <p>Grupo ${letraGrupo}</p>`,n2, "Borrar imagen");
                    btn.style.display = "none";
                })
            }
        });
})
}

function fasesFinales(actualPosicion, proximaPosicion){
    let paisOctavos = equiposFinales[actualPosicion].childNodes[1].textContent;
    let banderaOctavos = equiposFinales[actualPosicion].childNodes[3].src;

    moverPaisGrupo(paisOctavos,proximaPosicion,banderaOctavos);
}


let grupo = [];

for (let i=0; i<8;i++){
    grupo[i] = Array.from(document.querySelectorAll(`.g${i+1}`))
}

equipos(grupo[0],1,6,'A');
equipos(grupo[1],5,2,'B');
equipos(grupo[2],3,8,'C');
equipos(grupo[3],7,4,'D');
equipos(grupo[4],9,14,'E');
equipos(grupo[5],13,10,'F');
equipos(grupo[6],11,16,'G');
equipos(grupo[7],15,12,'H');

let equiposFinales = [];

for(let i=1; i<31 ; i++){
    equiposFinales[i] = document.querySelector(`.knockout__match-text-${i}`);
}

//octavos
function moverPaisFases(actualPosicion, proximaPosicion){
    equiposFinales[actualPosicion].addEventListener('click',()=>{
        fasesFinales(actualPosicion,proximaPosicion)
    })
}

moverPaisFases(1,17);
moverPaisFases(2,17);
moverPaisFases(3,18);
moverPaisFases(4,18);
moverPaisFases(5,21);
moverPaisFases(6,21);
moverPaisFases(7,22);
moverPaisFases(8,22);
moverPaisFases(9,19);
moverPaisFases(10,19);
moverPaisFases(11,20);
moverPaisFases(12,20);
moverPaisFases(13,23);
moverPaisFases(14,23);
moverPaisFases(15,24);
moverPaisFases(16,24);

//cuartos
moverPaisFases(17,25);
moverPaisFases(18,25);
moverPaisFases(19,26);
moverPaisFases(20,26);
moverPaisFases(21,27);
moverPaisFases(22,27);
moverPaisFases(23,28);
moverPaisFases(24,28);

//semis
moverPaisFases(25,29);
moverPaisFases(26,29);
moverPaisFases(27,30);
moverPaisFases(28,30);


// BOTON REINICIAR (en la seccion grupos -> borra solamente en octavos)
function team_selected1 (team1, team2) {
    team2.classList.remove('team-selected');

    team1.classList.toggle('team-selected');
}

function team_selected2 (team1, team2) {
    team1.classList.remove('team-selected');

    team2.classList.toggle('team-selected');
}


// Asigna clase a los paises seleccionados y ejecuta funcion para mostrar ganador cuando sea correspondiente.
team1=[];
team2=[];

for(let i=0;i<15;i++){
    team1[i] = document.querySelector(`.match_${i+49}`).querySelector(`.team1`);
    team2[i] = document.querySelector(`.match_${i+49}`).querySelector(`.team2`);
}

for(let i=0;i<15;i++){ 
    team1[i].addEventListener("click",  ()=>{
        team_selected1(team1[i],team2[i]);
        if(i == 14){
            pais = team1[i].querySelector(".knockout__match-text-29").childNodes[1].textContent;
            srcImg = team1[i].querySelector(".knockout__match-text-29").childNodes[3].src;
            mostrarGanador(srcImg, pais);
        }
    });
    team2[i].addEventListener("click",  ()=>{
        team_selected2(team1[i],team2[i]);
        if(i == 14){
            pais = team2[i].querySelector(".knockout__match-text-30").childNodes[1].textContent;
            srcImg = team2[i].querySelector(".knockout__match-text-30").childNodes[3].src;
            mostrarGanador(srcImg, pais);
        }
    });
}

function mostrarGanador(srcBandera, pais){
    section = document.querySelector(".winner");
    section.style.display = "block";

    bandera = section.querySelector(".winner__flag").childNodes[1];
    bandera.setAttribute("src", srcBandera);

    nombreBandera = section.querySelector(".winner__name").childNodes[1];
    paisMayus = pais.toUpperCase();
    winner = "¡ " + paisMayus + " !";
    nombreBandera.textContent = winner;
}