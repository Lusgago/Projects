const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

//lista == minhaListaDeItens
//addTarefa == adicionarNovaTarefa
let lista = []

function addTarefa() {
    const tarefa  = input.value.trim(); //remove espaços extras do inicio e fim

    if(tarefa === ''){
        return; // Impede a criação de uma tarefa em branco
    }

    lista.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
}
function mostrarTarefas() {

    let novaLi = ''

    //['comprar café', 'estudar programação']

    lista.forEach((item, posicao) => {
        novaLi = novaLi + `

            <li class="task ${item.concluida && "done"}">
                <img src="IMG/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="IMG/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            </li>

            `
    })

    listaCompleta.innerHTML = novaLi
    localStorage.setItem('lista', JSON.stringify(lista))
}

function concluirTarefa(posicao){
    lista[posicao].concluida = !lista[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao){
    lista.splice(posicao, 1)
    mostrarTarefas()
}

function recarregarTarefas(){
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if(tarefasDoLocalStorage){
        minhaListaDeItens = JSON.parse (tarefasDoLocalStorage)   
    }
    mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', addTarefa)
