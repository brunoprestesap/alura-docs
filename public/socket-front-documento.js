import { atualizaTextoEditor } from "./documento.js";

const socket = io();

//emitir sinal para o servidor com o documento selectionado ao entrar na page Documento
function selecionarDocumento(nome) {
  socket.emit("selecionar_documento", nome, (texto) => {
    atualizaTextoEditor(texto);
  });
}

//vai emitir para o servidor o conteudo do texteditor atualizado pelo usuário
function emitirConteudo(dados) {
  socket.emit("texto_editor", dados);
}

// recebe do servidor um texto e atualizar o text editor
socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

export { emitirConteudo, selecionarDocumento };
