<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use NeoEloquent;

class Attitude extends NeoEloquent
{
    use HasFactory;
    const PRESET_VALUES = [
        'Might be interested in',
        'Interested in Learning',
        'Currently Learning',
        'Interested',
        'Frequently Participates',
        'Wishes to do more often',
    ];

    protected $fillable = [
        'name'
    ];

}
