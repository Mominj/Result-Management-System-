const bcrypt = require('bcrypt')

//services
import adminservice from '../services/SuperAdmin.service'

//validator
const isPassValid = require('../validator/passValidator');
const  isEmailValid  = require('../validator/emailValidator');

//other
const config = require('../config/config')
const createToken = require('../jobs/generateToken');



module.exports.superAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const isvalidEmail = isEmailValid(email) 
   
        if(isvalidEmail) {

            delete(req.body.email);
            const { error } = isPassValid.validate(req.body);

            if(!error) {
                req.body.email = email;
                const instance = new adminservice(req);
                const user = await instance.checkUser(email);

                if(!user) {
                    const lg = await instance.saveSuper();
                    if(lg) {
                    res.status(200).json({ message: 'user create succesfully'});
                    } else {
                        res.status(504).json({ message: 'failed to create user'});
                    }
                }else {
                    res.status(401).json({ message: "User already exist" }); 
                }

            }else {
                res.status(401).json({ message: error.message || "Password validation error" }) 
            }

        }else {
            res.status(401).json({message:"Email validation error"}) 
        }  
    } catch (err) {
        res.status(500).json({message: err.message || "Email validation error"})
    }
    
};

module.exports.loginsuperAdmin = async (req, res) => {
    const {email, password} = req.body;
    const isvalidEmail = isEmailValid(email) 
    if (isvalidEmail) {
        delete(req.body.email);
        const { error } = isPassValid.validate(req.body)

        if (!error) {
            req.body.email = email;
            const instance = new adminservice(req);
            const user = await instance.checkUser(email);

            if(user) {

                let match = await bcrypt.compare(password, user.password);
                if(match) {
                    const token = createToken(email);
                    res.status(200).json({"token": token});
                } else {
                    res.status(401).json({ message: "password do not match"});
                }

            } else {
                res.status(401).json({message: "user not found"});
            } 
            
        } else {
            res.status(401).json({message: error.message});
        }

    } else {
        res.status(401).send({message:"Email validation error"}) 
    }
};


