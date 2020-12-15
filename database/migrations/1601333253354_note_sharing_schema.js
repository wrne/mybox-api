'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSharingSchema extends Schema {
	up() {
		this.create('note_sharings', (table) => {
			table.increments()
			table
				.integer('note_id')
				.unsigned()
				.references('id')
				.inTable('notes')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			table.string('shareWith').notNullable()
			table.boolean('active').notNullable().defaultTo(true)
			table.timestamps()
		})
	}

	down() {
		this.drop('note_sharings')
	}
}

module.exports = NoteSharingSchema
