<?php


namespace Database\Seeders;

use App\Models\ZipCode;
use Illuminate\Database\Seeder;

class ZipCodeSeeder extends Seeder
{


    public function run()
    {

        /**
         * @Attribution Zip code sample data provided by
         * https://simplemaps.com/data/us-zips
         */
        $file = fopen(  'database/seeders/uszips.csv','r');
        while(($line = fgetcsv($file)) !== FALSE)
        {
            ZipCode::create(['value' => $line[0]]);
        }
        fclose($file);
    }
}
