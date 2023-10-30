import {fileURLToPath} from 'url';
import  jwt  from 'jsonwebtoken';
import {dirname} from 'path';
import bcrypt from "bcrypt"
import { faker } from '@faker-js/faker';
import multer from "multer";
import { cookieExtractor } from './config/passport.config.js';

const PRIVATE_KEY = "CoderKeyFeliz";

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); 
export const IsValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const authToken = (role) => {
    return async (req, res, next) => {
        const token = cookieExtractor(req)
        if (!token) return res.status(401).send({ status: "error", error: "Unauthorized" })
        jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
            if (error) return res.status(401).send({ status: "error", error: "Unauthorized" })
            req.user = credentials;
            if (role) {
                const userRoles = Array.isArray(req.user.userRole) ? req.user.userRole : [req.user.userRole];
                if (Array.isArray(role)) {
                    if (!role.some(r => userRoles.includes(r))) {
                        return res.status(403).send({ status: 0, msg: 'Forbidden' });
                    }
                } else {
                    if (!userRoles.includes(role)) {
                        return res.status(403).send({ status: 0, msg: 'Forbidden' });
                    }
                }
            }
            next();
         })
}}

export const generateMocks = () => {
    let products = [];
    for(let i = 0; i<50; i++){
        let newProd = {
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            code: faker.string.alphanumeric({ length: { min: 5, max: 10 } }),
            price: faker.commerce.price({ dec: 0, symbol: '$' }),
            stock: faker.string.numeric(3),
            category: faker.commerce.department(),
            thumbnail: faker.image.url(),
            id: faker.database.mongodbObjectId(),
        }
        products.push(newProd);
    }
    return products
}

export const validarToken = (req, res, next) => {
    try {
        const token = req.params.token;
        jwt.verify(token, PRIVATE_KEY);
        const data = jwt.decode(token);
        req.email = data.email;
        next();
    } catch (e) {
        res.send(`Hubo un error al intentar recuperar password: ${e.message}`)
    }
    
}

export const uploader = (folderName) => {
    return multer({
      storage: multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(`${__dirname}/public/uploads/${folderName}`));
        },
        filename: function (req, file, cb) {
          console.log("🚀 ~ file: upload-img.js:12 ~ file", file);
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
      onError: function (err, next) {
        console.log("🚀 ~ file: upload-img.js:17 ~ err ERROR AQUI", err);
        next();
      },
    })
  }


export default __dirname;