import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController {

    async index(req, res){
        const status = req.query.status;

        const houses = await House.find({ status: status })

        return res.json(houses);
    }

    async store(req, res){ 
        try {
            //console.log(req.body);
            //console.log(req.file);
            const schema = Yup.object().shape({
                description: Yup.string().required(),
                price: Yup.number().required(),
                location: Yup.string().required(),
                status: Yup.boolean().required(),
            });

            const filename = req.file.filename;
            const { description, price, location, status } = req.body;
            const { user_id } = req.headers;

            if(!(await schema.isValid(req.body))){
                return res.status(400).json({ error: 'Falha na validação.'});
            }

            // criando regitro no BD
            const house = await House.create({
                user: user_id,
                thumbnail: filename,
                description: description,
                price: price,
                location: location,
                status: status,
            })

            return res.json(house);
            
        } catch (error) {
            console.log({ error: error.message });
        }
        
    }

    async update(req, res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });

        const filename = req.file.filename;
        const house_id = req.params.house_id;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Falha na validação.'});
        }

        const user = await User.findById(user_id);
        const house = await House.findById(house_id);

        if(String(user_id) !== String(house.user)){
            return res.status(401).json({ error: 'Não autorizado.' });
        }

        const houses = await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description: description,
            price: price,
            location: location,
            status: status,
        });

        return res.json({ message: 'Casa atualizada com sucesso.'});
    }

    async destroy(req, res){
        try {
            const house_id = req.body.house_id;
            const user_id = req.headers.user_id;

            const user = await User.findById(user_id) || 0;
            const house = await House.findById(house_id) || 0;

            const find = await House.findByIdAndDelete({ _id: house_id });

            if(!find){
                return res.status(404).json({ error: "Casa informada não existe."})
            }

            if(!user){
                return res.status(404).json({ error: "Usuario informado não existe."})
            }

            if(String(user._id) !== String(house.user)){
                return res.status(401).json({ error: 'Não autorizado.' });
            }

            res.json({ message: 'Casa deletada com sucesso.' });

        } catch (error) {
            return res.json({ error: error.message });
        }
    }
}

export default new HouseController();