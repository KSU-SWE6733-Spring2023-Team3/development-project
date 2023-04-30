<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;


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

    public function sentMessages()
    {
        return $this->hasMany(UserMessage::class, 'SENT_MESSAGE');
    }

    public function receivedMessages()
    {
        return $this->hasMany(UserMessage::class, 'RECEIVED_MESSAGE');
    }


    public function identifiesAs()
    {
        return $this->hasOne(Gender::class, 'IDENTIFIES_AS');
    }

    public function preference()
    {
        return $this->hasMany(Gender::class, 'HAS_PREFERENCE');
    }

    public function zipCode()
    {
        return $this->hasOne(ZipCode::class, 'IN_ZIPCODE');
    }

    public function age()
    {
        return $this->hasOne(Age::class, 'IS_AGE');
    }

    public function ageRange()
    {
        return $this->hasMany(Age::class, 'IN_AGE_RANGE_PREFERENCE');
    }

    public function providers()
    {
        return $this->hasMany(Provider::class, 'HAS_PROVIDER');
    }


}
