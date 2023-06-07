import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController{
    async index(req,res) {
        try {
            const reserves = await Reserve.
        } catch (error) {
            console.log({ error: error.message});
        }
    }

    async store(req, res){
        try {
            const house_id = req.params.house_id;
            const user_id = req.headers.user_id;
            const date = req.body.date;

            const house = await House.findById(house_id );

            if (!house) {
                return res.status(400).json({ error: 'A casa não existe.'});
            }

            if(house.status !== true){
                return res.status(400).json({ error: 'Esta casa não pode ser reservada.' });
            }

            const user = await User.findById(user_id);

            if(String(user._id) === String(house.user)) {
                return res.status(401).json({ error: 'Reserva não permitida.' });
            }
    
            const reserve = await Reserve.create({
                house: house_id,
                user: user_id,
                date: date,
            });

            const populateReserve= await Reserve.findOne({ _id: reserve._id })
            .populate('house')
            .populate('user')
            .exec();
    
            return res.json(populateReserve);

        } catch (error) {
            console.log({ error: error.message });
        }
       
    }
}

export default new ReserveController();