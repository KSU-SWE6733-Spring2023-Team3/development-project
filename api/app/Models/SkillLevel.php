<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use NeoEloquent;

class SkillLevel extends NeoEloquent
{
    use HasFactory;

    const PRESET_VALUES = [
        'No Experience',
        'Novice',
        'Moderate',
        'Advanced',
        'Professional'
    ];

    protected $fillable = [
        'name'
    ];

}
