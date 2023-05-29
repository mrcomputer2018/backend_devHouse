//Tratar nossa requisição e dar um resposta para nossa rota.
// Metodos : index, show, update, store, destroy
/* 
    index - listagem de sessoes
    store - criar uma sessao
    show  - listar uma unica sessão
    update - atualizar uma sessão
    destroy - quando queremos deletar uma sessão 
*/
class SessionController{
    store(req,res) { 
        return res.json({ message: 'Minha Api' });
    }
}

export default new SessionController();