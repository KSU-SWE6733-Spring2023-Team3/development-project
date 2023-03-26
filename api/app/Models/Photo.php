<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use NeoEloquent;

class Photo extends NeoEloquent
{

    protected $label = 'Photo';

    use HasFactory;


    protected $fillable = [
      'file_name',
       'file_path'
    ];

    protected $hidden = [

    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'UPLOADED');
    }

    public function profilePhoto()
    {
        return $this->belongsTo(User::class, "IS_PROFILE_PHOTO");
    }

}
