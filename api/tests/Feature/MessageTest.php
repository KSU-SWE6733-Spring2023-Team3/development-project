<?php

namespace Tests\Features;

use App\Http\Controllers\UserMessageController;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class MessageTest extends TestCase
{
    private const MESSAGE_SEND_ENDPOINT = 'api/message';
    private const MESSAGE_GET_ENDPOINT = 'api/message';

    private const EMAIL_1 = "johnfoo@bar.com";
    private const EMAIL_2 = "janebar@baz.com";
    private const PASSWORD = 'somesillypassword';


    public function setUp(): void
    {
        parent::setUp();

        User::query()->delete();
        User::create([
            'name' => 'John Foo',
            'email' => self::EMAIL_1,
            'password' => Hash::make(self::PASSWORD),
        ]);

        User::create([
            'name' => 'Jane Bar',
            'email' => self::EMAIL_2,
            'password' => Hash::make(self::PASSWORD),
        ]);
    }


    public function test_sendMessageUserDNE(): void
    {
        $postData = [
            'message' => 'Lorum Ipsum',
            'username' => 'someuserdoesntexist@nodomain.com'
        ];

        $response = $this->post(self::MESSAGE_SEND_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserMessageController::USER_DNE_ERR_MSG
        ]);
    }

    public function test_sendMessageNoMessageKey(): void
    {
        $postData = [
            'username' => self::EMAIL_2,
        ];

        $response = $this->post(self::MESSAGE_SEND_ENDPOINT, $postData);
        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserMessageController::MSG_KEY_NOT_SET_ERR_MSG,
        ]);
    }

    public function test_sendMessageNoUsernameKey(): void
    {
        $postData = [
          'message' => 'Lorum Ipsum',
        ];


        $response = $this->post(self::MESSAGE_SEND_ENDPOINT, $postData);
        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserMessageController::USER_KEY_NOT_SET_ERR_MSG,
        ]);
    }

    public function test_sendMessageSuccess(): void
    {
        $postData = [
            'message' => 'Lorum Ipsum',
            'username' => self::EMAIL_2
        ];

        $response = $this->post(self::MESSAGE_SEND_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'success' => UserMessageController::MESSAGE_SEND_SUCCESS_MSG,
        ]);

        $user = User::find('email', self::EMAIL_1);

        $this->assertSame('Lorum Ipsum', $user->messages()->first()->text);
        $this->assertSame(self::EMAIL_2, $user->messages()->first()->toUser()->first()->email);
    }
}
