/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function Risposta(event){
    let contenitore=event.currentTarget;
    risposte[contenitore.dataset.questionId]=contenitore.dataset.choiceId;
    Ricomincia(contenitore); 
    let checkbox= contenitore.querySelector(".checkbox");
    checkbox.src="images/checked.png";
    contenitore.style.backgroundColor="#cfe3ff";
    for(let blocco of contenitori){
        if(contenitore!=blocco && blocco.dataset.questionId==contenitore.dataset.questionId){
            blocco.classList.add('non-checked');
        }
    }
    if(risposte.one && risposte.two && risposte.three){
        for(let contenitore of contenitori){
            contenitore.removeEventListener('click',Risposta);
            Risultato();
        }
    }
}

function Ricomincia(selezione){
    let lista= document.querySelectorAll('.choice-grid div');
    for(let chiave of lista){
        if(selezione.dataset.questionId==chiave.dataset.questionId){
        chiave.classList.remove('non-checked');
        if(chiave.querySelector('.checkbox').src="images/checked.png"){
            chiave.style.backgroundColor="#f4f4f4";
            chiave.querySelector('.checkbox').src="images/unchecked.png";
        }
    }
  }
}

function Risultato(){
    let scelta=risposte['one'];
    if(risposte['two']==risposte['three']){
        scelta=risposte['two'];
    }
    let titolo=document.querySelector('h2');
    let contenuto=document.querySelector('.risultato p');
    titolo.textContent=RESULTS_MAP[scelta].title;
    contenuto.textContent=RESULTS_MAP[scelta].contents;
    let risultato=document.querySelector('.risultato');
    risultato.classList.remove('finale');
    let bottone= document.querySelector('.risultato button');
    bottone.addEventListener('click',RicominciailQuiz);
}

function RicominciailQuiz(event){ 
    for(let i in risposte){
       delete risposte[i];
   }
   for(let contenitore of contenitori){
       let immagine=contenitore.querySelector('.checkbox');
       if(immagine.src="images/checked.png"){
          contenitore.style.backgroundColor='#f4f4f4';
          immagine.src="images/unchecked.png"
       }
       contenitore.classList.remove('non-checked');
       contenitore.addEventListener('click',Risposta);
   }
       let bottone=event.currentTarget;
       bottone.removeEventListener('click',RicominciailQuiz);
       let rimuovi=document.querySelector('.risultato');
       rimuovi.classList.add('finale');
 }

let risposte={}; // mappa di risposte selezionate
let contenitori= document.querySelectorAll(".choice-grid div");
for(let contenitore of contenitori){
    contenitore.addEventListener('click',Risposta);
}