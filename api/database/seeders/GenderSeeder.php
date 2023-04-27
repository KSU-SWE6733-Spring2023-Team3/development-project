<?php


namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{


    public function run()
    {
        foreach(Gender::PREDEFINED_VALUES as $genderValue)
        {
            Gender::create(['value' => $genderValue]);
        }

    }
}
