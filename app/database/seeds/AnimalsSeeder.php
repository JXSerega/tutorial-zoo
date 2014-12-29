<?php

class AnimalsSeeder {

    public function run($count = 100){
        DB::table('animals')->delete();
        //insert some dummy records
        DB::table('animals')->insert(
            $this->generateAnimals($count)
        );
    }

    /**
     * @param int $count
     * @return array
     */
    private function generateAnimals($count){
        $animals = [];

        do {
            $animals[] = $this->generateAnimal();
        } while (--$count);

        return $animals;
    }

    /**
     * @return array
     */
    private function generateAnimal(){
        return [
            'type' => $this->generateAnimalType(),
            'price' => $this->generateAnimalPrice()
        ];
    }

    /**
     * @return mixed
     */
    private function generateAnimalType(){
        $types = [
            'Тигр', 'Попугай', 'Пингвин', 'Заяц', 'Волк', 'Лев', 'Крокодил',
            'Белка', 'Жираф', 'Пантера', 'Слон', 'Медведь', 'Коала', 'Фламинго',
            'Леопард', 'Антилопа', 'Кабан', 'Еж', 'Лошадь', 'Обезьяна', 'Ленивец',
            'Хомяк', 'Змея', 'Бобр', 'Буйвол', 'Черепаха', 'Страус', 'Кенгуру',
            'Зебра', 'Бегемот',
        ];

        return $types[ rand(0, count($types) - 1) ];
    }

    /**
     * @return int
     */
    private function generateAnimalPrice(){
        return rand(10, 300);
    }

}