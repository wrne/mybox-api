'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })

Route.post('/users', 'UserController.create')
Route.delete('/users/:id', 'UserController.destroy')
	.middleware('auth')

Route.post('/sessions', 'SessionController.create')

Route.resource('notes', 'NoteController')
	.apiOnly()
	.middleware('auth')

Route.post('notes/:id/images', 'ImageController.store')
	.middleware('auth')

Route.get('images/:path', 'ImageController.show')

Route.post('share', 'NoteSharingController.share')
	.middleware('auth')
Route.get('sharedwithme', 'NoteSharingController.listSharedWithMe')
	.middleware('auth')