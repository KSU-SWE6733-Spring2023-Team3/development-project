<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;


class Gender extends NeoEloquent
{

    const PREDEFINED_VALUES = [
        'Male',
        'Female',
        'Other'
    ];

    use HasFactory;

    protected $label = 'Gender';
    protected $fillable = [
        'value'
    ];


    public function userIdentity()
    {
        return $this->belongsTo(User::class, 'IDENTIFIES_AS');
    }

    public function userPreference()
    {
        return $this->belongsTo(User::class, 'HAS_PREFERENCE');
    }
}
