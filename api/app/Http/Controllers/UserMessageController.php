<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserMessageController extends Controller
{
    const USER_DNE_ERR_MSG = "The specified user does not exist!";

    const USER_KEY_NOT_SET_ERR_MSG = "Message key was not set";
    const MSG_KEY_NOT_SET_ERR_MSG = "Message key was not set";

    const MESSAGE_SEND_SUCCESS_MSG = 'Message sent successfully!';

    public function store(Request $request)
    {

    }

}
