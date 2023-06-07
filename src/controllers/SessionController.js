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
import * as Yup from 'yup';
class SessionController{
   
    async store(req,res) {
        try {
            const schema =  Yup.object().shape({
                email: Yup.string()
                .email()
                .required(),
            });
    
            const email = req.body.email;
    
            if(!(await schema.isValid(req.body))) {
                return res.status(400).json({ error: 'Falha na validação.'});
            }
            
            // Verificando se este usuario ja existe
            let user = await User.findOne({ email: email });
    
            if(!user){
                user = await User.create({ email: email });
            }
    
            return res.json(user);

        } catch (error) {
            console.log({ error: error.message });
        }
        
    }
}

export default new SessionController();