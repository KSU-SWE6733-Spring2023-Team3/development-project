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
        $toUserId = $request->input('toUser') ?? null;

        $user = $request->user();

        if (empty($message)) {
            return response()->json([
                'error' => self::MSG_KEY_NOT_SET_ERR_MSG,
            ], 200);
        }

        if (empty($toUserId)) {
            return response()->json([
                'error' => self::USER_KEY_NOT_SET_ERR_MSG
            ], 200);
        }

        $targetUser = User::where('id', $toUserId)->first();

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


    public function list(Request $request)
    {
        $user = $request->user();

        $messages = [];

        // Get all messages this user has sent
        $sentMessages = $user->sentMessages()->get();
        foreach($sentMessages as $sentMessage)
        {

            $otherUser = $sentMessage->to()->first();
            $message = [
                'text' => $sentMessage->text,
                'created_at' => $sentMessage['created_at'],
                'user' => $otherUser->name,
                'id' => $otherUser->id,
                ];

            if(!isset($messages[$message['user']]))
            {
                $messages[$message['user']] = $message;
            }
            else
            {
                if(strtotime($messages[$message['user']]['created_at']) < strtotime($message['created_at'] ))
                {
                    $messages[$message['user']] = $message;
                }
            }
        }


        $receivedMessages = $user->receivedMessages()->get();
        foreach($receivedMessages as $receivedMessage)
        {
            $otherUser = $receivedMessage->from()->first();
            $message = [
                'text' => $receivedMessage->text,
                'created_at' => $receivedMessage['created_at'],
                'user' => $otherUser->name,
                'id' => $otherUser->id,
            ];

            if(!isset($messages[$message['user']]))
            {
                $messages[$message['user']] = $message;
            }
            else
            {
                if(strtotime($messages[$message['user']]['created_at']) < strtotime($message['created_at'] ))
                {
                    $messages[$message['user']] = $message;
                }
            }
        }


        return response()->json([
            'success' => $messages
        ],200);
    }

    public function show(Request $request, $fromId)
    {
        $user = $request->user();

//        $messages = UserMessage::whereHas('to', function($toUserNodeQuery) use ($fromId) {
//            $toUserNodeQuery->where('id', '=', $fromId);
//        })


        $messages = [];
        $sentMessages = $user->sentMessages()->get();
            $receivedMessages = $user->receivedMessages()->get();

            $otherUser = User::find($fromId);

            foreach($sentMessages as $sentMessage)
            {
                if($sentMessage->to()->first()->id == $fromId) {
                    $sentMessage['author'] = $user->name;
                    $messages[] = $sentMessage;
                }
            }

            foreach($receivedMessages as $receivedMessage)
            {
                if($receivedMessage->from()->first()->id == $user->id)
                {
                    $receivedMessage['author'] = $otherUser->name;
                    $messages[] = $receivedMessage;
                }
            }

        return response()->json([
            'success' => $messages
        ], 200);
    }

}
