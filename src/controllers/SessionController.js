//Tratar nossa requisição e dar um resposta para nossa rota.
// Metodos : index, show, update, store, destroy
/* 
    index - listagem de sessoes
    store - criar uma sessao
    show  - listar uma unica sessão
    update - atualizar uma sessão
    destroy - quando queremos deletar uma sessão 
*/

import User from '../models/User';

class SessionController{
   
    async store(req,res) { 
        const email = req.body.email;
        
        // Verificando se este usuario ja existe
        let user = await User.findOne({ email: email });

        if(!user){
            user = await User.create({ email: email });
        }

        return res.json(user);
    }
}

export default new SessionController();