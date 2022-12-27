import { encontrarDocumento, atualizaDocumento } from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  console.log("um cliente se conectou! ID:", socket.id);

  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);

    const documento = await encontrarDocumento(nomeDocumento);
    console.log(documento);

    if (documento) {
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto_editor", async ({ nomeDocumento, texto }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    console.log(atualizacao);

    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });
});
