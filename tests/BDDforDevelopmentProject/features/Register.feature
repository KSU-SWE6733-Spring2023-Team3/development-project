Feature:  Check Registration Page

    Scenario: User registers in to our website
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user successfully registers
        Then  the page displays Sign Out as an option

    Scenario: User doesn't fill out Name when registering
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user forgets to add Name
        Then  the Name error message is returned

    Scenario: User doesn't fill out Email when registering
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user forgets to add Email
        Then  the Name error message is returned

    Scenario: User doesn't fill out Password when registering
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user forgets to add Password
        Then  the Password error message is returned

    Scenario: User has incorrect Name when registering
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user has incorrect Name
        Then  the Name error message is returned

    Scenario: User tries to register an illogical Email format
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user adds an invalid Email format
        Then  the Name error message is returned

    Scenario: User does not use long enough Password when registering
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the sign up page
        And   the user does not use a long enough Password
        Then  the Password error message is returned