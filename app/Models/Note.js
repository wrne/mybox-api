'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Note extends Model {

	user() {

		return this.belongsTo('App/Models/User')

	}

	images(){
		return this.hasMany('App/Models/Image')
	}
}

module.exports = Note
