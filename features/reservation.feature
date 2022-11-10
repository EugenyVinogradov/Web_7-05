Feature: Reservation one ticket today
    Scenario: Should reservation ticket
        # Given user is on "/navigation" page
        # When user search by "тестировщик"
        # Then user sees the course suggested "Тестировщик ПО"
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user selects the time of the movie screening "19:00" tomorrow
        # Then