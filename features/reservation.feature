Feature: Reservation ticket
    Scenario: Should reservation ticket one ticket today
        Given user is on "url" page
        When user selected the session on 0 day
        When user books a ticket at "19:00", in the 10 st row  seat "7"
        Then user sees the inscription "Вы выбрали билеты:" and sees the reserved seat "7" in the row "10"  
    Scenario: Should reservation two tickets on fourth day
        Given user is on "url" page
        When user selected the session on 4 day
        When user books two tickets at "14:00", seats "4, 5" in the 3 st row    
        Then user sees the inscription "Вы выбрали билеты:" and sees the reserved seat "4" and "5" in the row "3"   
     Scenario: Not reservation one ticket tomorrow  to already reserved seat
        Given user is on "url" page
        When user selected the session on 1 day
        When user books a ticket for the session at "19:00", seat "6" in the 10 st row and this seat is already reserved   
        Then user sees that the resrvation button is inactive     

