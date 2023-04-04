<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use NeoEloquent;

class Activity extends NeoEloquent
{
    use HasFactory;
    const PRESET_VALUES = [
        'Hiking',
        'Backpacking',
        'Camping',
        'Rock Climbing',
        'Bouldering',
        'Boating',
        'Rafting',
        'Canoeing',
        'Kayaking',
        'Sailing',
        'Water Skiing',
        'Snow Skiing',
        'Snow Boarding',
        'Snow Shoeing',
        'Tobaganing',
        'Sledding',
        'Running',
        'Walking',
        'Fishing',
        'Hunting',
    ];

    protected $fillable = [
        'name'
    ];

    protected $label = 'Activity';

    public function interest()
    {
        return $this->belongsTo(UserInterest::class, 'IN_ACTIVITY');
    }

}
