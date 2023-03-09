<?php

namespace Tests\Features;

use Tests\TestCase;

use App\Models\User;
use App\Http\Controllers\UserController;

class RegistrationTests extends TestCase
{


    private const USER_CREATE_ENDPOINT = '/user/create';


    /**
     * Test a basic user create
     */
    public function test_userCreate()
    {
        $postData = [
            'name' => 'John Foo',
            'email' => 'johnfoo@bar.com',
            'password' => 'somesillypassword',
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);
        $response->assertStatus(200);


        $user = User::where('name', 'John Foo');
        $this->assertArrayHasKey('name', $user);
        $this->assertSame($user['name'], 'John Foo');
    }


    public function test_userCreateNoNameError(): void
    {
        $postData = [
            'name' => '',
            'email' => 'johnfoo@bar.com',
            'password' => 'somesillypassword'
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserController::MISSING_NAME_ERR_MSG,
        ]);
    }


    public function testUserCreateInvalidNameError(): void
    {
        $postData = [
            'name' => '!nv@l!d\us3rnam3!',
            'email' => 'johnfoo@bar.com',
            'password' => 'somesillypassword'
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserController::INVALID_NAME_ERR_MSG,
        ]);
    }

    public function testUserCreateNoEmailError(): void
    {
        $postData = [
            'name' => 'John Foo',
            'email' => '',
            'password' => 'somesillypassword'
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserController::MISSING_EMAIL_ERR_MSG,
        ]);
    }

    public function testUserCreateInvalidEmailError(): void
    {
        $postData = [
            'name' => 'John Foo',
            'email' => 'someemail',
            'password' => 'somesillypassword'
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserController::INVALID_EMAIL_ERR_MSG,
        ]);
    }

    public function testUserCreateNoPasswordError(): void
    {
        $postData = [
            'name' => 'John Foo',
            'email' => 'johnfoo@bar.com',
            'password' => ''
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserController::MISSING_PASSWORD_ERR_MSG,
        ]);
    }

    public function testUserCreateInvalidPasswordError(): void
    {
        $postData = [
            'name' => 'John Foo',
            'email' => 'johnfoo@bar.com',
            'password' => 'tooshort'
        ];

        $response = $this->post(self::USER_CREATE_ENDPOINT, $postData);

        $response->assertStatus(200);
        $response->assertExactJson([
            'error' => UserController::INVALID_PASSWORD_ERR_MSG,
        ]);
    }

}
