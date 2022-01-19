const bcrypt = require('bcrypt')

//model
const SuperAdmin = require('../model/superadmin.model')


export default class SuperAdminService {

	/**
	 * Constructor for Admin service

	 * @param {object} req the request object 
	 */
	constructor(req) {
	   this.email = req.body.email
	   this.password = req.body.password
	}


	async checkUser(email) {
		let user = await SuperAdmin.findOne({email});
		return user;
    }

	async saveSuper() {
		try {
			let hashPass = await bcrypt.hash(this.password, 11)
			const user = new SuperAdmin({
				email: this.email,
				password: hashPass
			})
			 const result = await user.save();
			 return true;

		} catch(error) {
			console.log(error)
			return false;
		}
    }	
}
