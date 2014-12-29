<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group(['prefix' => '/api'], function(){
	Route::get('/laravel', function(){
		return View::make('hello');
	});

	Route::resource('/eats', 'EatsController');
	Route::resource('/animals', 'AnimalsController');
	Route::resource('/animals.eats', 'AnimalsEatsController');

	Route::get('/generate/animals/{count}', 'GenerateController@animals')->where([
		'count' => '[0-9]+'
	]);

});
