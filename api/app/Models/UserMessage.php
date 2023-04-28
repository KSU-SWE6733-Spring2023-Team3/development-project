<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Vinelab\NeoEloquent\Eloquent\Model as NeoEloquent;

class UserMessage extends NeoEloquent
{
    use HasFactory;

    protected $label = 'Message';

    protected $fillable = [
        'text'
    ];

    public function from()
    {
        return $this->belongsTo(User::class, 'SENT_MESSAGE');
    }

    public function to()
    {
        return $this->belongsTo(User::class, 'RECEIVED_MESSAGE');
    }

}
