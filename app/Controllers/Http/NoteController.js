'use strict'
const Note = use('App/Models/Note')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notes
 */
class NoteController {
	/**
	 * Show a list of all notes.
	 * GET notes
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ auth }) {
		
		//TODO: TESTAR QUERY COM USUARIOS
		const {id} = auth.user
		const notes = Note.query()
			.where('user_id','=',id)
			.with('images')
			.with('sharing')
			.fetch()

		return notes
	}


	/**
	 * Create/save a new note.
	 * POST notes
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, auth }) {

		const { id } = auth.user
		const data = request.only([
			'title',
			'content',
			'creation',
		])

		if (!data.creation){
			data.creation = new Date()
		}
		
		const note = await Note.create({ ...data, user_id: id })

		return note;
	}

	/**
	 * Display a single note.
	 * GET notes/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const note = await Note.findOrFail(params.id)
		await note.load('images')
		return note
	}

	/**
	 * Update note details.
	 * PUT or PATCH notes/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {

		const note = await Note.findOrFail(params.id)

		const data = request.only([
			'title',
			'content',
		])

		note.merge(data)

		await note.save()
		return note
	}

	/**
	 * Delete a note with id.
	 * DELETE notes/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, response, auth }) {
		const note = await Note.findOrFail(params.id);

		if (note.user_id !== auth.user.id) {
			return response.status(401).send({ error: 'Not authorized' })
		}

		await note.delete()
	}
}

module.exports = NoteController
