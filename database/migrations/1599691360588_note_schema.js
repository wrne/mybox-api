'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NoteSchema extends Schema {
	up() {
		this.create('notes', (table) => {
			table.increments()
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
				.onUpdate('CASCADE')
				.onDelete('CASCADE')
			table.string('title', 60).notNullable()
			table.string('content').notNullable()
			table.date('creation').notNullable()
			table.integer('mood').defaultTo(0)
			table.timestamps()
		})
	}

	down() {
		this.drop('notes')
	}
}

module.exports = NoteSchema
