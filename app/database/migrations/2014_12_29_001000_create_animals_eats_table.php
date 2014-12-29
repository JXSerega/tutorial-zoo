<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAnimalsEatsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('animals_eats', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('animal_id')->index();
			$table->integer('eat_id')->index();
			$table->integer('eat_volume');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('animals_eats');
	}

}
