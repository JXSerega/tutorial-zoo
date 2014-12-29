<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAnimalsEatsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('animals_eats', function(Blueprint $table)
		{
			$table->foreign('animal_id', 'animals_eats_animal_id_fkey')->references('id')->on('animals')->onUpdate('CASCADE')->onDelete('CASCADE');
			$table->foreign('eat_id', 'animals_eats_eat_id_fkey')->references('id')->on('eats')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('animals_eats', function(Blueprint $table)
		{
			$table->dropForeign('animals_eats_animal_id_fkey');
			$table->dropForeign('animals_eats_eat_id_fkey');
		});
	}

}
