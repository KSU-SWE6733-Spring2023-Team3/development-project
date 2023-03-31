<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Attitude;
use App\Models\SkillLevel;
use Illuminate\Http\Request;

class UserInterestController extends Controller
{
    const INTEREST_ADDED = 'Interest(s) has been added successfully!';

    const NO_ACTIVITY_ERR_MSG = "Activity is required but was not provided.";
    const NO_ATTITUDE_ERR_MSG = "Attitude is required but was not provided.";
    const NO_SKILL_LEVEL_ERR_MSG = "Skill Level is required but was not provided.";

    const INVALID_ACTIVITY_ERR_MSG = "Activity provided is not one of the accepted values.";
    const INVALID_ATTITUDE_ERR_MSG = "Attitude provided is not one of the accepted values.";
    const INVALID_SKILL_LEVEL_ERR_MSG = "Skill Level provided is not one of the accepted values.";

    const INTERESTS_KEY_NOT_FOUND_ERR_MSG = "[ interests ] key required but not provided.";

    public function store(Request $request)
    {
        $userInterests = $request->input('interests');

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

            // TODO: Set up NeoEloquent relationships between Activity, Attitude, and SkillLevel.

        }
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

}
