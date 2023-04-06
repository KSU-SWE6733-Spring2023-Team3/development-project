<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Attitude;
use App\Models\SkillLevel;
use App\Models\User;
use App\Models\UserInterest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use mysql_xdevapi\Session;

class UserInterestController extends Controller
{
    const INTEREST_ADDED = 'Interest(s) has been added successfully!';

    const NO_ACTIVITY_ERR_MSG = "Activity is required but was not provided.";
    const NO_ATTITUDE_ERR_MSG = "Attitude is required but was not provided.";
    const NO_SKILL_LEVEL_ERR_MSG = "Skill Level is required but was not provided.";

    const INVALID_ACTIVITY_ERR_MSG = "Activity provided is not one of the accepted values.";
    const INVALID_ATTITUDE_ERR_MSG = "Attitude provided is not one of the accepted values.";
    const INVALID_SKILL_LEVEL_ERR_MSG = "Skill Level provided is not one of the accepted values.";
    const INVALID_USERNAME_ERR_MSG = "Username not found, cannot retreive interests";

    const INTERESTS_KEY_NOT_FOUND_ERR_MSG = "[ interests ] key required but not provided.";

    public function store(Request $request)
    {
        $userInterests = $request->input('interests');


        if(empty($userInterests))
        {
            return response()->json([
                'error' => self::INTERESTS_KEY_NOT_FOUND_ERR_MSG
            ], 200);
        }

        foreach($userInterests as $userInterest)
        {
            if (empty($userInterest['activity']))
            {
                return response()->json([
                    'error' => self::NO_ACTIVITY_ERR_MSG
                ], 200);
            }

            if (!$this->isValidActivity($userInterest['activity']))
            {
                return response()->json([
                    'error' => self::INVALID_ACTIVITY_ERR_MSG
                ], 200);
            }

            if (empty($userInterest['attitude']))
            {
                return response()->json([
                    'error' => self::NO_ATTITUDE_ERR_MSG
                ], 200);
            }

            if (!$this->isValidAttitude($userInterest['attitude']))
            {
                return response()->json([
                    'error' => self::INVALID_ATTITUDE_ERR_MSG
                ], 200);
            }

            if (empty($userInterest['skillLevel']))
            {
                return response()->json([
                    'error' => self::NO_SKILL_LEVEL_ERR_MSG,
                ], 200);
            }

            if (!$this->isValidSkillLevel($userInterest['skillLevel']))
            {
                return response()->json([
                    'error'=> self::INVALID_SKILL_LEVEL_ERR_MSG,
                ], 200);
            }

            $user = $request->user();

            $activity = Activity::where('name', $userInterest['activity'])->first();
            $attitude = Attitude::where('name', $userInterest['attitude'])->first();
            $skillLevel = SkillLevel::where('name', $userInterest['skillLevel'])->first();



            $interest = UserInterest::create(['name' => $user->email]);

            $interest->activity()->save($activity);

            $interest->attitude()->save($attitude);

            $interest->skillLevel()->save($skillLevel);



            $user->interests()->save($interest);

        }

        return response()->json([
            'success' => self::INTEREST_ADDED
        ], 200);
    }

    private function isValidActivity($activity): bool
    {
        return Activity::where('name', $activity)->exists();
    }

    private function isValidAttitude($attitude): bool
    {
        return Attitude::where('name', $attitude)->exists();
    }

    private function isValidSkillLevel($skillLevel): bool
    {
        return SkillLevel::where('name', $skillLevel)->exists();
    }


    public function show($username)
    {
        $user = User::where('email', $username)->first();

        if(!isset($user))
        {
            return response()->json([
                'error' => self::INVALID_USERNAME_ERR_MSG,
            ], 200);
        }

        return response()->json([
            'success' => $this->getUserInterestsArray($user),
        ]);

    }

    public function list(Request $request)
    {
        $user = $request->user();


        $interests = $this->getUserInterestsArray($user);

        return response()->json([
            'success' => $interests,
        ], 200);
    }


    private function getUserInterestsArray(User $user): array
    {
        $interests = [];

        foreach($user->interests()->get() as $item)
        {
            $tempArr = [];

            $tempArr['activity'] = $item->activity()->first()->name;
            $tempArr['attitude'] = $item->attitude()->first()->name;
            $tempArr['skillLevel'] = $item->skillLevel()->first()->name;

            $interests[] = $tempArr;
        }

        return $interests;

    }


    public function activities()
    {
        $activities = Activity::query()->get();

        $activityArr = [];

        foreach($activities as $activity)
        {
            $activityArr[] = $activity->first()->name;
        }

        return response()->json([
            'success' => $activityArr
        ],200);
    }

    public function attitudes()
    {
        $attitudes = Attitude::query()->get();

        $attitudeArr = [];
        foreach ($attitudes as $attitude)
        {
            $attitudeArr[] = $attitude->first()->name;
        }

        return response()->json([
            'success' => $attitudeArr
        ],200);
    }

    public function skillLevels()
    {
        $skillLevels = SkillLevel::query()->get();

        $skillLevelArr = [];

        foreach($skillLevels as $skillLevel)
        {
            $skillLevelArr[] = $skillLevel->first()->name;
        }

        return response()->json([
            'success' => $skillLevelArr
        ],200);
    }

}
