<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserMessage;
use Illuminate\Http\Request;

class UserMessageController extends Controller
{
    const USER_DNE_ERR_MSG = "The specified user does not exist!";

    const USER_KEY_NOT_SET_ERR_MSG = "Message key was not set";
    const MSG_KEY_NOT_SET_ERR_MSG = "Message key was not set";

    const MESSAGE_SEND_SUCCESS_MSG = 'Message sent successfully!';

    public function store(Request $request)
    {
        $message = $request->input("message") ?? null;
        $username = $request->input('username') ?? null;

        $user = $request->user();

        if (empty($message)) {
            return response()->json([
                'error' => self::MSG_KEY_NOT_SET_ERR_MSG,
            ], 200);
        }

        if (empty($username)) {
            return response()->json([
                'error' => self::USER_KEY_NOT_SET_ERR_MSG
            ], 200);
        }

        $targetUser = User::where('email', $username)->first();

        if (empty($targetUser))
        {
            return response()->json([
                'error' => self::USER_DNE_ERR_MSG,
            ], 200);
        }

        $messageNode = UserMessage::create(['text' => $message]);

        $user->sentMessages()->save($messageNode);

        $targetUser->receivedMessages()->save($messageNode);

        return response()->json([
            'success' => self::MESSAGE_SEND_SUCCESS_MSG
        ], 200);

    }

}
