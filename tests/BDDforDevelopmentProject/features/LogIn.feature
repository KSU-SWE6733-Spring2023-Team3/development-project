Feature:  Check Log In Page

    Scenario: User logs in to our website
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the login page
        And   the user successfully logs in
        Then  the page displays Sign Out as an option