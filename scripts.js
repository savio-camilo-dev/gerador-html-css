

/* Mapear elementos do HTML */
let botao = document.querySelector(".botao-gerar"); // botão de gerar código
let endereco = "https://api.groq.com/openai/v1/chat/completions"; // endpoint da API

/* Função que será chamada ao clicar no botão */
async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value; // valor digitado pelo usuário
    let blocoCodigo = document.querySelector(".bloco-codigo"); // elemento onde o código gerado será exibido
    let resultadoCodigo = document.querySelector(".resultado-codigo"); // elemento onde o preview será exibido

    botao.textContent = "Gerando...";
    botao.disabled = true;

    try {
        /* Enviar requisição para a API */
        let resposta = await fetch(endereco, {    
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer SUA_API_KEY_AQUI" // substitua pela sua chave
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // modelo da IA
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rot"
                    },
                    {
                        role: "user", 
                        content: textoUsuario
                    }
                ]
            })
        });

        let dados = await resposta.json(); // transformar resposta em JSON
        let resultado = dados.choices[0].message.content;

        /* Exibir resultados na tela */
        blocoCodigo.textContent = resultado;
        resultadoCodigo.srcdoc = resultado;

    } catch (erro) {
        console.error(erro);
        blocoCodigo.textContent = "Erro ao gerar código 😢";
    }

    /* Resetar botão após execução */
    botao.textContent = "Gerar Código ⚡";
    botao.disabled = false;
}

/* Ouvir clique do botão e chamar a função */
botao.addEventListener("click", gerarCodigo);