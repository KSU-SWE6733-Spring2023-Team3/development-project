Feature:  Check Registration Page

    Scenario: User registers in to our website
        Given a user launches Chrome
        When  a user opens our homepage
        And   they click the login page
        Then  the user successfully logs in
        And   the page displays Sign Out as an option