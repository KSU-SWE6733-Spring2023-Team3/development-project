<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Age;
use App\Models\Attitude;
use App\Models\Gender;
use App\Models\SkillLevel;
use App\Models\User;
use App\Models\UserInterest;
use App\Models\ZipCode;
use Illuminate\Database\Seeder;
use Faker;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public const MAX_USERS = 25;

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        /**
         * Call my other seeders to get the database populated.
         * Only do this if the database gets cleaned out, it takes ~90 minutes to run.
         */
//        $this->call([
//            AgeSeeder::class,
//            GenderSeeder::class,
//            ZipCodeSeeder::class
//        ]);


        $faker = Faker\Factory::create();
        $faker->seed(microtime());

        $activities = Activity::query()->get();
        $attitudes = Attitude::query()->get();
        $skillLevels = SkillLevel::query()->get();

        $genders = Gender::query()->get();


        // Make self::MAX_USERS users in the database
        for($i = 0; $i < self::MAX_USERS; $i++)
        {
            $username = $faker->name();
            $email = $faker->email();
            $password = $faker->password();


            $user = User::create([
                'name' => $username,
                'email' => $email,
                'password' => Hash::make($password),
            ]);


            $userZip = Faker\Provider\Address::postcode();

            $zipNode = ZipCode::firstOrCreate(['value' => '"' . $userZip . '"']);

            $user->zipCode()->save($zipNode);

            $age = $faker->numberBetween(18, 65);
            $ageRangeStart = $faker->numberBetween(18, $age);
            $ageRangeEnd = $faker->numberBetween($age, 65);

            $ageNode = Age::where('value', $age)->first();
            $ageRangeNodes = Age::where('value', '>', $ageRangeStart)->where('value', "<", $ageRangeEnd)->get();

            $user->age()->save($ageNode);
            foreach($ageRangeNodes as $ageRangeNode)
            {
                $user->ageRange()->save($ageRangeNode);
            }


            $userGender = $faker->randomElement($genders);
            $user->identifiesAs()->save($userGender);

            $preferenceCount = $faker->randomNumber(1,3);
            $userPreferences = $faker->randomElements($genders, $preferenceCount);
            foreach($userPreferences as $preference)
            {
                $user->preference()->save($preference);
            }

            $numUserInterests = $faker->numberBetween(1,10);

            // Add some number of user interests for the given user
            for($j = 0; $j < $numUserInterests; $j++)
            {
                $userInterest = UserInterest::create(['name' => $username]);

                $activity = $faker->randomElement($activities);
                $attitude = $faker->randomElement($attitudes);
                $skillLevel = $faker->randomElement($skillLevels);


                $userInterest->activity()->save($activity);
                $userInterest->attitude()->save($attitude);
                $userInterest->skillLevel()->save($skillLevel);

                $user->interests()->save($userInterest);
            }

        }
    }
}
