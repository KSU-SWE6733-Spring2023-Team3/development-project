<?php

namespace Tests\Features;

use App\Http\Controllers\UserInterestController;
use App\Models\Activity;
use App\Models\Attitude;
use App\Models\SkillLevel;
use App\Models\UserInterest;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

use App\Models\User;

class UserInterestsCreateTest extends TestCase
{


    private const USER_INTEREST_CREATE_ENDPOINT = 'api/user/interest';
    private const EMAIL = "johnfoo@bar.com";
    private const PASSWORD = 'somesillypassword';

    private function login()
    {
        $postData = [
          'email' => self::EMAIL,
          'password' => self::PASSWORD,
        ];

        // Session is stored in the class ($this), so we don't need to do weird header stuff.
        $this->post('api/login', $postData);
    }


    public function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub

        User::query()->delete();
        User::create([
            'name' => 'John Foo',
            'email' => self::EMAIL,
            'password' => Hash::make(self::PASSWORD),
        ]);


        UserInterest::query()->delete();

        Activity::query()->delete();
        Attitude::query()->delete();
        SkillLevel::query()->delete();

        $this->createActivities();
        $this->createAttitudes();
        $this->createSkillLevels();
    }


    private function createActivities(): void
    {
        foreach(Activity::PRESET_VALUES as $value)
        {
            Activity::create(['name' => $value]);
        }
    }

    private function createAttitudes(): void
    {
        foreach(Attitude::PRESET_VALUES as $value)
        {
            Attitude::create(['name' => $value]);
        }
    }

    private function createSkillLevels(): void
    {
        foreach(SkillLevel::PRESET_VALUES as $value)
        {
            SkillLevel::create(['name' => $value]);
        }
    }


    public function test_createSingleUserInterest(): void
    {
        // Delete existing UserInterest entries
        UserInterest::query()->delete();
        $this->login();
        $postData =
            [
                'interests' =>
                    [
                        [
                            'activity' => 'Hiking',
                            'attitude' => 'Interested',
                            'skillLevel' => 'Advanced',
                        ]
                    ]
            ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'success' => UserInterestController::INTEREST_ADDED,
        ]);

        $user = User::where('email', self::EMAIL)->first();

        $this->assertSame('Hiking', $user->interests()->first()->activity()->first()->name);
        $this->assertSame('Interested', $user->interests()->first()->attitude()->first()->name);
        $this->assertSame('Advanced', $user->interests()->first()->skillLevel()->first()->name);

    }

    public function test_createMultipleUserInterests(): void
    {
        // Delete existing UserInterest entries
        UserInterest::query()->delete();
        $this->login();
        $postData =
            [
                'interests' =>
                [
                    [
                        'activity' => 'Hiking',
                        'attitude' => 'Frequently Participates',
                        'skillLevel' => 'Advanced'
                    ],
                    [
                        'activity' => 'Backpacking',
                        'attitude' => 'Currently Learning',
                        'skillLevel' => 'Novice'
                    ],
                    [
                        'activity' => 'Camping',
                        'attitude' => 'Interested',
                        'skillLevel' => 'Moderate'
                    ],
                ]
            ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'success' => UserInterestController::INTEREST_ADDED,
        ]);


        $activities = [];
        $attitudes = [];
        $skillLevels = [];

        $user = User::where('email', self::EMAIL)->first();

        $interests = $user->interests()->get();

        foreach($interests as $interest)
        {
            $activities[] = $interest->activity()->first()->name;
            $attitudes[] = $interest->attitude()->first()->name;
            $skillLevels[] = $interest->skillLevel()->first()->name;
        }

        // These come back in reverse order of how they were posted. That's OK.
        $this->assertSame(['Camping', 'Backpacking', 'Hiking'], $activities);
        $this->assertSame(['Interested', 'Currently Learning', 'Frequently Participates' ], $attitudes);
        $this->assertSame(['Moderate', 'Novice', 'Advanced' ], $skillLevels);
    }



    public function test_noActivityError(): void
    {
        $this->login();
        $postData = [
            'interests' => [
                [
                    'attitude' => 'Currently Learning',
                    'skillLevel' => 'Novice'
                ]
            ]
        ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::NO_ACTIVITY_ERR_MSG,
        ]);
    }

    public function test_noAttitudeError(): void
    {
        $this->login();
        $postData = [
            'interests' => [
                [
                    'activity' => 'Hiking',
                    'skillLevel' => 'Novice'
                ]
            ]
        ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::NO_ATTITUDE_ERR_MSG,
        ]);
    }

    public function test_noSkillLevelError(): void
    {
        $this->login();
        $postData = [
            'interests' => [
                [
                    'activity' => 'Hiking',
                    'attitude' => 'Currently Learning',
                ]
            ]
        ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::NO_SKILL_LEVEL_ERR_MSG,
        ]);
    }

    public function test_invalidActivityError(): void
    {
        $this->login();
        $postData = [
            'interests' => [
              [
                  'activity' => 'Invalid Activity',
                  'attitude' => 'Interested',
                  'skillLevel' => 'Novice'
              ]
            ]
        ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::INVALID_ACTIVITY_ERR_MSG,
        ]);
    }

    public function test_invalidAttitudeError(): void
    {
        $this->login();
        $postData = [
            'interests' => [
                [
                    'activity' => 'Hiking',
                    'attitude' => 'Invalid Attitude',
                    'skillLevel' => 'Novice'
                ]
            ]

        ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::INVALID_ATTITUDE_ERR_MSG,
        ]);
    }

    public function test_invalidSkillLevelError(): void
    {
        $this->login();
        $postData = [
            'interests' => [
                [
                    'activity' => 'Hiking',
                    'attitude' => 'Interested',
                    'skillLevel' => 'Invalid Skill Level',
                ]
            ]
        ];


        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::INVALID_SKILL_LEVEL_ERR_MSG,
        ]);
    }

    public function test_interestsKeyNotSet(): void
    {
        $this->login();
        $postData = [
            'activity' => 'Hiking',
            'attitude' => 'Interested',
            'skillLevel' => 'Novice',
        ];

        $response = $this->post(self::USER_INTEREST_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserInterestController::INTERESTS_KEY_NOT_FOUND_ERR_MSG,
        ]);
    }


}
