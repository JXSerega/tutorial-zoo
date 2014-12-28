<?php

class Animals {

    public function getList(){
        return DB::select('SELECT * FROM animals');
    }

    public function get($id){
        return DB::table('animals')->where('id', $id)->first();
    }

}