import House from '../models/House';

class HouseController {

    async store(req,res){ 

        return res.json({ ok: true })
    }
}

export default new HouseController();