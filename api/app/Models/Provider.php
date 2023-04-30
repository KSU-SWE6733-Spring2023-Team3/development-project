<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;

class Provider extends NeoEloquent
{
    use HasFactory;

    protected $label = "Provider";

    protected $fillable = [
        'provider',
        'provider_id',
        'user_id',
    ];

}
