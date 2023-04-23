<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;


class ZipCode extends NeoEloquent
{
    use HasFactory;

    protected $label = "ZipCode";
    protected $fillable = [
        'value'
    ];


    public function users()
    {
        return $this->belongsTo(User::class, 'IN_ZIP_CODE');
    }
}
