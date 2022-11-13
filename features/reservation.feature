Feature: Reservation ticket
    Scenario: Should reservation ticket one ticket today
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user books a ticket for the session tomorrow at "19:00", seat "5" in the "2" st row
        Then user sees the inscription "Вы выбрали билеты:" and sees the reserved seat "5" in the row "2"
# Feature: Reservation tickets    
    Scenario: Should reservation two tickets on fourth day
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user books two tickets for the session on "4" day at "14:00", seats "4" and "5" in the "3" st row    
        Then user sees the inscription "Вы выбрали билеты:" and sees the reserved seat "4" and "5" in the row "3"   
     Scenario: Not reservation one ticket today  to already reserved seat
        Given user is on "http://qamid.tmweb.ru/client/index.php" page
        When user books a ticket for the session tomorrow at "19:00", seat "6" in the "10" st row, and this seat is already reserved   
        Then user sees that the resrvation button is inactive     