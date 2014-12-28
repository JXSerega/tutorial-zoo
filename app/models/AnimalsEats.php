<?php

class AnimalsEats {

    /**
     * @param int $animalId
     * @return mixed
     */
    public function getListByAnimal($animalId){
        return DB::table('animals_eats')->where('animal_id', $animalId)->get();
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function save(array $data){
        return DB::table('animals_eats')->insertGetId($data);
    }

    public function remove($id){
        return DB::table('animals_eats')->where('id', $id)->delete();
    }

}