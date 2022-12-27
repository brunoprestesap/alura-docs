import {
  emitirConteudo,
  selecionarDocumento,
} from "./socket-front-documento.js";

//Obter o nome do documento através do parametro da url do html documento
const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

// atribui o titulo da page html com o nome do documento
const editorTexto = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
tituloDocumento.textContent = nomeDocumento || "Documento sem título";

//Emiti sinal com o nome do documento para abrir uma sala
selecionarDocumento(nomeDocumento);

//emitir conteudo para o servidor para atualizar outros clientes que estão conectados na mesma sala
editorTexto.addEventListener("keyup", () => {
  emitirConteudo({
    nomeDocumento,
    texto: editorTexto.value,
  });
});

//vai receber o conteudo emitido pelo servidor e atualizar o text editor
function atualizaTextoEditor(texto) {
  editorTexto.value = texto;
}

export { atualizaTextoEditor };
