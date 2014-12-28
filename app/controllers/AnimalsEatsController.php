<?php

class AnimalsEatsController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @param  int  $animalId
	 * @return Response
	 */
	public function index($animalId)
	{
//		sleep(1);

		return Response::json(
			(new AnimalsEats())->getListByAnimal($animalId)
		);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$data = Input::only([
			'animal_id',
			'eat_id',
			'eat_volume'
		]);

		$data['id'] = (new AnimalsEats())->save($data);

		return $data;
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		return Response::json([
			'deleted' => (new AnimalsEats())->remove($id)
		]);
	}


}
