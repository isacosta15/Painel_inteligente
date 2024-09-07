function pesquisar() {

    // Obtém a seção HTML onde os resultados da pesquisa serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById 
    ("campo-pesquisa").value

    // se campoPesquisa for uma string sem nada
    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar algo relacionado ao Alzheimer</p>"
        return 
    }

    campoPesquisa = campoPesquisa.toLowerCase()

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    let title= ""; 
    let sinopse = "";
    let link = "";


    // Itera sobre cada artigo na lista de artigos
    for (let dado of artigos) {
            title= dado.title.toLowerCase()
            sinopse = dado.sinopse.toLowerCase()
            link = dado.link.toLowerCase()
        // se titulo includes campoPesquisa
        if (title.includes(campoPesquisa) || sinopse.includes(campoPesquisa) || link.includes(campoPesquisa)) {
            // Constrói o HTML para cada item de resultado da pesquisa, 
            // incluindo o título, sinopse e link para mais informações
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.title}</a>
                </h2>
                <p class="descricao-meta">${dado.sinopse}</p>
                <a href=${dado.link} target="_blank">Saiba Mais</a>
            </div>
        `;
        } 
       
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>"
    }


    // Atribui o HTML gerado para a seção de resultados
    section.innerHTML = resultados;
}

// Função de busca inteligente de artigos
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const articlesList = document.getElementById('articles-list');
    articlesList.innerHTML = ''; // Limpa os resultados anteriores

    // Busca nos artigos do 'dados.js'
    artigos.forEach((artigo) => {
        if (artigo.title.toLowerCase().includes(searchTerm) || artigo.sinopse.toLowerCase().includes(searchTerm)) {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `<h3>${artigo.title}</h3><p>${artigo.sinopse}</p><a href="${artigo.link}" target="_blank">Leia mais</a>`;
            articlesList.appendChild(articleDiv);
        }
    });
});

// Função para criar projetos de cuidado personalizados
const careProjectForm = document.getElementById('care-project-form');
const careProjectsList = document.getElementById('care-projects-list');

careProjectForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const taskName = document.getElementById('task-name').value;
    const taskFrequency = document.getElementById('task-frequency').value;

    const projectItem = document.createElement('li');
    projectItem.textContent = `Tarefa: ${taskName} - Frequência: ${taskFrequency}`;
    careProjectsList.appendChild(projectItem);

    careProjectForm.reset(); // Limpa o formulário após a criação do projeto
});

// Gráfico de monitoramento de sintomas
const ctx = document.getElementById('symptomsCanvas').getContext('2d');
const symptomsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
        datasets: [{
            label: 'Gravidade dos Sintomas',
            data: [2, 3, 4, 5, 6], // Dados fictícios
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Chatbot Inteligente
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Respostas predefinidas do chatbot
const botResponses = {
    "sintomas": "Os sintomas de Alzheimer incluem perda de memória, dificuldade em realizar tarefas familiares, e alterações de humor e comportamento.",
    "tratamento": "Embora não haja cura para o Alzheimer, tratamentos estão disponíveis para ajudar a controlar os sintomas.",
    "cuidador": "Os cuidadores devem garantir um ambiente seguro e confortável, manter uma rotina, e ser pacientes com a pessoa que tem Alzheimer.",
    "exercícios": "Exercícios mentais e físicos regulares podem ajudar a retardar a progressão da doença."
};

// Função para gerar a resposta do chatbot
function getBotResponse(input) {
    input = input.toLowerCase();
    if (input.includes("sintomas")) return botResponses["sintomas"];
    if (input.includes("tratamento")) return botResponses["tratamento"];
    if (input.includes("cuidador")) return botResponses["cuidador"];
    if (input.includes("exercícios")) return botResponses["exercícios"];
    return "Desculpe, não entendi sua pergunta. Tente perguntar sobre sintomas, tratamento, ou cuidados.";
}

// Função para enviar a mensagem
function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return; // Ignorar mensagens vazias

    // Exibir a mensagem do usuário
    const userDiv = document.createElement('div');
    userDiv.textContent = userMessage;
    userDiv.classList.add('user');
    chatLog.appendChild(userDiv);

    // Gerar e exibir a resposta do chatbot
    const botResponse = getBotResponse(userMessage);
    const botDiv = document.createElement('div');
    botDiv.textContent = botResponse;
    botDiv.classList.add('bot');
    chatLog.appendChild(botDiv);

    // Limpar a entrada do usuário e rolar para a última mensagem
    userInput.value = "";
    chatLog.scrollTop = chatLog.scrollHeight;
}

// Enviar a mensagem ao clicar no botão
sendButton.addEventListener('click', sendMessage);

// Enviar a mensagem ao pressionar Enter
userInput.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
