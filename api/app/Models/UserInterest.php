<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



use NeoEloquent;

class UserInterest extends NeoEloquent
{
    use HasFactory;

    protected $label = 'UserInterest';

    // This is really just a pass-through class, to associate one User to many UserInterests, thus having many
    // UserInterests, each with an Activity, Attitude, and Skill Level for each User.
    protected $fillable = [
        'name'
    ];

    public function activity()
    {
        return $this->hasOne(Activity::class, 'IN_ACTIVITY');
    }

    public function attitude()
    {
        return $this->hasOne(Attitude::class, 'HAS_ATTITUDE');
    }

    public function skillLevel()
    {
        return $this->hasOne(SkillLevel::class, 'AT_SKILL_LEVEL');

    }

    public function user()
    {
        return $this->belongsTo(User::class, 'HAS_INTEREST');

    }





}
