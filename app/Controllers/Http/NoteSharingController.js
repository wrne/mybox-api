'use strict'

// const Note = require('../../Models/Note');

const Note = use('App/Models/Note')
const User = use('App/Models/User')
const NoteSharing = use('App/Models/NoteSharing')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with notesharings
 */
class NoteSharingController {
	/**
	 * Show a list of all notesharings.
	 * GET notesharings
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async listSharedWithMe({ request, response, auth }) {

		// consulta a lista de compartilhamento pro id logado
		const sharingList = Note.query()
			.innerJoin('note_sharings', 'notes.id', 'note_sharings.note_id')
			.where('shareWith', "=", auth.user.id)
			.fetch()

		//TODO: DESCOBRIR COMO MAPEAR ISSO EM UM NOVO ARRAY DE NOTAS !!!
		console.log('SHARING_WITH_ME', typeof (sharingList), sharingList)
		return sharingList

		// constroe lista de notas com base nos id identificados
		const notes = sharingList.map(sharing => {
			return Note.findBy('id', sharing.note_id)
		})

		return notes
	}

	/**
	 * Create/save a new notesharing.
	 * POST notesharings
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async share({ request, response }) {

		const data = request.only([
			'note_id',
			'shareWith'
		])

		// Valida se usuario existe
		const userToShare = await User.findBy("email", data.shareWith)

		if (!userToShare) {

			return response
				.status(404)
				.json({ message: "Usuário não encontrado." })
		}

		// Cria compartilhamento
		const sharing = await NoteSharing.create({
			note_id: data.note_id,
			shareWith: userToShare.id
		})

		return sharing;
	}

	/**
	 * Display a single notesharing.
	 * GET notesharings/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
	}


	/**
	 * Update notesharing details.
	 * PUT or PATCH notesharings/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
	}

	/**
	 * Delete a notesharing with id.
	 * DELETE notesharings/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async unshare({ params, request, response }) {
	}
}

module.exports = NoteSharingController
