import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://bruno:123mudar@clustermain.hlqw57w.mongodb.net/?retryWrites=true&w=majority")

let documentosColecao;

try {
    await cliente.connect()

    const db = cliente.db("Aluradocs")
    documentosColecao = db.collection("Documentos")

    console.log("Conectado ao banco de dados com sucesso")
} catch (error) {
    console.log(error)
}

export { documentosColecao }