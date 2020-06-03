

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()} )
    /*caso tenha apenas um parâmetro, a função anônima não precisa de parênteses, e se o retorno pequeno, também não precisa de chaves*/
    .then( states => {

        for(const state of states ){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectState = event.target.selectedIndex    
    stateInput.value = event.target.options[indexOfSelectState].text 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities =>{
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}`
        }

        citySelect.disabled = false
    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities )