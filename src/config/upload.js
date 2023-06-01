// arquivo de configuracao de envio de imagens
import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // cb - callback
        filename: (req, file, cb) => {
            // oegando a extensão
            const ext = path.extname(file.originalname);

            //pegando o nome do arquivo
            const name = path.basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`);
        },
    })
};