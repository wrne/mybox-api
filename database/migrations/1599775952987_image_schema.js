'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
	up() {
		this.create('images', (table) => {
			table.increments()
			table
				.integer('note_id')
				.unsigned()
				.references('id')
				.inTable('notes')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			table.string('path').notNullable()
			table.timestamps()
		})
	}

	down() {
		this.drop('images')
	}
}

module.exports = ImageSchema
