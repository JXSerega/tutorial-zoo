<?php

class Eats {

    public function getList(){
        return DB::table('eats')->get();
    }

}