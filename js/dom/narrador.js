const d = document, w= window;

export default function speechReader(){
    const $speechSelect = d.getElementById("speech-select");
    const $speechTextarea = d.getElementById("speech-text");
    const $speechBtn = d.getElementById("speech-btn");
    const $speechMessage = new SpeechSynthesisUtterance();
    //console.log($speechMessage);

    let  voices = [];
    d.addEventListener("DOMContentLoaded", (e)=>{
        w.speechSynthesis.addEventListener("voiceschanged",event=>{
            //console.log("event:",event,"e:",e);
           // console.log("LAS VOCES:",speechSynthesis.getVoices());
            voices = w.speechSynthesis.getVoices();
           // console.log(" mis voces :",voices)
            voices.forEach(voice=>{
                const $option =d.createElement('option');
                $option.value= voice.name;
                $option.textContent = `${voice.name} ➡️ ${voice.lang}`;
                $speechSelect.appendChild($option);
            })
        })
    });
    d.addEventListener("change",e=>{
       //console.log("ESte elemento cambio",e.target.value);
       if(e.target === $speechSelect){
             $speechMessage.voice = voices.find( voice => voice.name === e.target.value);
       }
       //console.log("la voz",$speechMessage);
    });
    d.addEventListener("click",e=>{
        if(e.target === $speechBtn){
            $speechMessage.text = $speechTextarea.value;
            w.speechSynthesis.speak($speechMessage);
        }
    });

}