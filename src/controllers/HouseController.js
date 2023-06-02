import House from '../models/House';

class HouseController {

    async store(req, res){ 
        //console.log(req.body);
        //console.log(req.file);
        const filename = req.file.filename;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

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
    }
}

export default new HouseController();