let botaoLoginReference = document.querySelector('#botaoLogin');
// let inputEmailReference = document.querySelector('#inputEmail');
let controladoresReference = document.querySelectorAll('.controlador');

//console.dir(controladoresReference)

for(let controladorReference of controladoresReference) {

    let inputReference = controladorReference.children[1]

    inputReference.addEventListener('keyup', function(event) {
    
        if(inputReference.checkValidity()) {
    
            controladorReference.classList.remove('erro');
            botaoLoginReference.disabled = false;
    
        } else {
    
            controladorReference.classList.add('erro');
            botaoLoginReference.disabled = true;
    
        }
    })

}


botaoLoginReference.addEventListener('click', function(event) {


    event.preventDefault();


})

console.log(controladoresReference);