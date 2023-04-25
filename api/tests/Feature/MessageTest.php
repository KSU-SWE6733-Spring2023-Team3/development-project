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


    private function login($email)
    {
        $postData = [
            'email' => $email,
            'password' => self::PASSWORD,
        ];

        // Session is stored in the class ($this), so we don't need to do weird header stuff.
        $this->post('api/login', $postData);
    }


    public function test_sendMessageUserDNE(): void
    {
        $this->login(self::EMAIL_1);
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
        $this->login(self::EMAIL_1);
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
        $this->login(self::EMAIL_1);
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
        $this->login(self::EMAIL_1);
        $postData = [
            'message' => 'Lorum Ipsum',
            'username' => self::EMAIL_2
        ];

        $response = $this->post(self::MESSAGE_SEND_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'success' => UserMessageController::MESSAGE_SEND_SUCCESS_MSG,
        ]);

        $user = User::where('email', self::EMAIL_1)->first();

        $this->assertSame('Lorum Ipsum', $user->sentMessages()->first()->text);
        $this->assertSame(self::EMAIL_2, $user->sentMessages()->first()->to()->first()->email);
    }
}
