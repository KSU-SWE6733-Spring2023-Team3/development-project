<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use NeoEloquent;

class User extends NeoEloquent implements Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, \Illuminate\Auth\Authenticatable;

    protected $label = 'User';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function photos()
    {
        return $this->hasMany(Photo::class, 'UPLOADED');
    }

    public function profilePhoto()
    {
        return $this->hasOne(Photo::class, 'IS_PROFILE_PHOTO');
    }


    public function interests()
    {
        return $this->hasMany(UserInterest::class, 'HAS_INTEREST');
    }


}
