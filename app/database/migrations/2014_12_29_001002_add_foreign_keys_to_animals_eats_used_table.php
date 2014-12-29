<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToAnimalsEatsUsedTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('animals_eats_used', function(Blueprint $table)
		{
			$table->foreign('animal_eat_id', 'animals_eats_used_animal_eat_id_fkey')->references('id')->on('animals_eats')->onUpdate('CASCADE')->onDelete('CASCADE');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('animals_eats_used', function(Blueprint $table)
		{
			$table->dropForeign('animals_eats_used_animal_eat_id_fkey');
		});
	}

}
