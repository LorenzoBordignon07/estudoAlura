import api from "./api.js"
const ui = {

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId)
        document.getElementById('pensamento-id').value = pensamento.id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo
        document.getElementById('pensamento-autoria').value = pensamento.autoria
    },

    async renderizarPensamentos() {
        const listaPensamentos = document.getElementById('lista-pensamentos')
        try {
            const pensamentos = await api.buscarPensamentos()
            pensamentos.forEach(ui.adicionarPensamentoNaLista)
        } catch (error) {
            alert('Erro ao renderizar pensamentos.')
            throw error;
        }
    },
    adicionarPensamentoNaLista(pensamento) {
        const listaPensamentos = document.getElementById('lista-pensamentos')
        const li = document.createElement('li')
        li.setAttribute('data-id', pensamento.id)
        li.classList.add('li-pensamento')

        const iconeAspas = document.createElement('img')
        iconeAspas.setAttribute('src', 'assets/imagens/aspas-azuis.png')
        iconeAspas.setAttribute('alt', 'Aspas azuis')
        iconeAspas.classList.add('icone-aspas')

        const pensamentoConteudo = document.createElement('div')
        pensamentoConteudo.textContent = pensamento.conteudo
        pensamentoConteudo.classList.add('pensamento-conteudo')

        const pensamentoAutoria = document.createElement('div')
        pensamentoAutoria.textContent = pensamento.autoria
        pensamentoAutoria.classList.add('pensamento-autoria')

        const botaoEditar = document.createElement('button')
        botaoEditar.classList.add('botao-editar')
        // botaoEditar.onclick = () => ui.preencherFormulario(pensamento.id)
        botaoEditar.addEventListener('click', () => {
            ui.preencherFormulario(pensamento.id)
        })

        const iconeEditar = document.createElement('img')
        iconeEditar.src = "assets/imagens/icone-editar.png"
        iconeEditar.alt = "Editar pensamento"
        botaoEditar.appendChild(iconeEditar)

        const icones = document.createElement('div')
        icones.classList.add('icones')
        icones.appendChild(botaoEditar)

        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(icones)
        listaPensamentos.appendChild(li)
    },
    limparCamposForm() {
        document.getElementById('pensamento-form').reset()
    }
}

export default ui