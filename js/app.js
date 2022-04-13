const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
})

function buscarClima(e){
    e.preventDefault()

    //Validar formulario
    const ciudad = document.querySelector('#ciudad').value
    const pais = document.querySelector('#pais').value 
    if(ciudad === '' || pais === ''){
        mostrarError('Ambos campos son obligatorios')
        return
    }
    //si pasamos validacion, consultar api
    consultarApi(ciudad, pais)

}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100')

    if(!alerta){
    const alerta = document.createElement('div')
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center')
    alerta.textContent = `Error! ${mensaje}` 

    setTimeout( () => {
        alerta.remove()
    }, 5000 )
    container.appendChild(alerta)
    }

}
const consultarApi = async(ciudad, pais) => {
    try {

        Spinner()
        const appId = '166780eacc735178775ed8707f3c4d88'
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`)
        const data = await respuesta.json()
        console.log(data)
        limpiarHtml()
        //Si la cidad no existe
        if(data.cod === '404'){
            mostrarError('Ciudad no encontrada')
            return
        }

        mostrarClima(data)

    } catch (error) {
        console.log(error)
        
    } 
    
}
function mostrarClima(data){
    const { name, main: {temp, temp_max, temp_min} } = data
    const centigrados = kelvinAcentigrados(temp)
    const max = kelvinAcentigrados(temp_max)
    const min = kelvinAcentigrados(temp_min)
    const nombre = document.createElement('p')
    nombre.textContent = `Clima en ${name}`
    nombre.classList.add('font-bold','text-5xl')

    const actual = document.createElement('p')
    actual.innerHTML = `Temperatura actual: ${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-4xl')

    const temperaturaMaxima = document.createElement('p')
    temperaturaMaxima.innerHTML = `Temperatura maxima: ${max} &#8451;`
    temperaturaMaxima.classList.add('font-bold','text-3xl')

    const temperaturaMinima = document.createElement('p')
    temperaturaMinima.innerHTML = `Temperatura minima: ${min} &#8451;`
    temperaturaMinima.classList.add('font-bold', 'text-2xl')

    const resultadoDiv = document.createElement('div')
    resultadoDiv.classList.add('text-center', 'text-white')

    resultadoDiv.appendChild(nombre)
    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(temperaturaMaxima)
    resultadoDiv.appendChild(temperaturaMinima)
    
    resultado.appendChild(resultadoDiv)
}
//formatear los numeros, toma los grados actuales, temp max, temp, min
const kelvinAcentigrados = grados => parseInt(grados - 273.15)

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function Spinner() {
    limpiarHtml()
    const divSpinner = document.createElement('div')
    divSpinner.classList.add('sk-fading-circle')
  
    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `
    resultado.appendChild(divSpinner)
}