'use strict'

const Note = use('App/Models/Note')
const Image = use('App/Models/Image')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {

  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ params, request}) {

	const note = await Note.findOrFail(params.id)
	const images = request.file('image',{
		types: ['jpeg','jpg','png','svg','tiff','bmp'],
		size: '6mb'
	})

	await images.moveAll(Helpers.tmpPath('uploads'), file => ({
		name: `${Date.now()}-${file.clientName}`
	}))

	if (!images.movedAll()){
		return images.errors()
	}

	await Promise.all(
		images
			.movedList()
			.map(image => note.images().create({path: image.fileName}))
	)
  }


  async show({params, response}){
	  return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ImageController
