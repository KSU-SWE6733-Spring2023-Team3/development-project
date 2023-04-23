<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;


class Age extends NeoEloquent
{
    use HasFactory;

    protected $label = 'Age';

    protected $fillable = [
        'value'
    ];

    public function userAge()
    {
        return $this->belongsTo(User::class, 'IS_AGE');
    }

    public function userAgeRangePreference()
    {
        return $this->belongsTo(User::class, 'IN_AGE_RANGE_PREFERENCE');
    }
}
