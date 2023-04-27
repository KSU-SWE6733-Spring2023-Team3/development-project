<?php


namespace Database\Seeders;

use App\Models\Age;
use Illuminate\Database\Seeder;

class AgeSeeder extends Seeder
{


    public function run()
    {
        for($i = 18; $i <= 65; $i++)
        {
            Age::create(['value' => $i]);
        }

    }
}
