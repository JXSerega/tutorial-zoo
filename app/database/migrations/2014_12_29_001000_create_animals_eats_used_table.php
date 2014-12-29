<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAnimalsEatsUsedTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('animals_eats_used', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->dateTime('used_at')->index();
			$table->integer('animal_eat_id')->index();
			$table->integer('volume_eat');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('animals_eats_used');
	}

}
