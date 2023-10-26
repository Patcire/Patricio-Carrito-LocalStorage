

// Patricio Cifredo 2º DAW-A IES RAFAEL ALBERTI

// CARRITO CON LOCALSTORAGE

// Variables y capturamos elementos

const lista_cursos = document.querySelector("#lista-cursos")
const boton_vaciar_carrito = document.querySelector("#vaciar-carrito")
const lista_carrito_tabla = document.querySelector("#lista-carrito tbody")
let articulos_carrito = []

// Funciones

const aniadir_carrito = (e)=>{

    e.preventDefault()
    console.log("agrego")
    //const curso= info_curso()
    if (e.target.classList.contains("agregar-carrito")){
        console.log("ok")
        const curso =  e.target.parentElement.parentElement
        leer_datos_curso(curso)
    }
}


const leer_datos_curso= (curso)=>{

    const info_curso ={
        imagen: curso.querySelector("img").src,
        nombre: curso.querySelector("h4").textContent,
        precio: curso.querySelector("span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }

  console.log(info_curso.imagen)


   const ya_existe= articulos_carrito.some((articulo) => articulo.id === info_curso.id)

    if (ya_existe) {
            const cursos_seleccionados= articulos_carrito.map((curso_seleccionado) => {
            if (curso_seleccionado.id === info_curso.id) {
                curso_seleccionado.cantidad++
                console.log("???")
                return curso_seleccionado
            }
            else{
                return curso_seleccionado
            }
        })

        articulos_carrito = [...cursos_seleccionados]

    }
    else {

        articulos_carrito = [...articulos_carrito, info_curso]
        console.log(articulos_carrito)
    }

    carrito_HTML(articulos_carrito)

}


const carrito_HTML = (articulos) => {

    limpiar()

    console.log(articulos)
    console.log("eee")

    articulos.forEach((articulo) =>{
        const fila = document.createElement("tr")
        const {imagen, nombre, precio, cantidad, id} = articulo

        fila.innerHTML = `
                    <td>
                     <img src="${imagen}" width = "100">
                    </td>
                    <td>${nombre}</td>
                    <td>${precio}</td>
                    <td>${cantidad}</td>
                    <td>
                    <button class="quitar-curso" id="${id}">X</button>
                    </td>
                    `

        lista_carrito_tabla.appendChild(fila)
    })

}


const limpiar =()=>{
    while(lista_carrito_tabla.firstChild){
        lista_carrito_tabla.firstChild.remove() //lo quito del HTML, pero no de la lista articulos_carrito que la necesito
    }
}


const quitar_elemento=(e)=>{
    console.log("lolololo")
    if (e.target.classList.contains("quitar-curso")){
       const id_curso =  e.target.getAttribute("id")
       console.log(id_curso)
        articulos_carrito = articulos_carrito.filter((articulo)=> articulo.id !== id_curso )
        carrito_HTML(articulos_carrito)
    }
    actualizar_carrito_ls()


}

const recuperar_carrito_ls=()=>{
    localStorage.getItem( 'carrito')
}

const actualizar_carrito_ls=()=>{
    localStorage.setItem('carrito', JSON.stringify(articulos_carrito))

}


// Eventos
const gestionar_eventos = () =>{

    lista_cursos.addEventListener("click", (e)=>{
        aniadir_carrito(e)
        actualizar_carrito_ls()
    })
    boton_vaciar_carrito.addEventListener("click", ()=>{
        limpiar()
        articulos_carrito=[]
        localStorage.clear()
    })
    lista_carrito_tabla.addEventListener("click", quitar_elemento)


    window.addEventListener('load', ()=>{
        recuperar_carrito_ls()
        const carrito_guardado = JSON.parse(localStorage.getItem( 'carrito'))
        carrito_HTML(carrito_guardado)
    })
    window.addEventListener('beforeunload', ()=>{

    })

}

gestionar_eventos()