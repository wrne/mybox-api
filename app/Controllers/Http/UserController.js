'use strict'
const User = use("App/Models/User")

class UserController {
	async create ({request}){
		const data = request.only(["identifier","name","phone","email","password"])

		const user = await User.create(data)

		return user
	}

	async destroy ({params, response, auth}){
	
		const user = await User.findOrFail(params.id);
		
		if (user.id !== auth.user.id) {
			return response.status(401).send({ error: 'Not authorized' })
		}

		await user.delete()
		return response.status(200).send({ message: 'Successfully deleted' })
	}
}

module.exports = UserController
