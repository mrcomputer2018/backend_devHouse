import House from '../models/House';
import User from '../models/User';

class DasnboardController{
    async show(req,res){
        const user_id = req.headers.user_id;

        const houses = await House.find({ user: user_id });

        res.json(houses);
    }
}

export default new DasnboardController();
