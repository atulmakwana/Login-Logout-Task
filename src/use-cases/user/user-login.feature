Feature: Login user

    Scenario Outline: Invalid inputs then throw error for login.
    Given user details email: "<email>" and password:"<password>" to login
    When Try user to login
    Then Throw error: "<error>" with message: "<message>" while login

    Examples:
        | email           |  password    | error           | message                                                         |
        |                 |  Atul@12345  | ValidationError | Validation error at userLogin \"email\" is required           |
        | atul@gmail.com  |              | ValidationError | Validation error at userLogin \"password\" is required        |
        | atul@           |  Atul@12345  | ValidationError | Validation error at userLogin \"email\" must be a valid email |
        | atul@gmail.com  |  Atul@1      | ValidationError | Validation error at userLogin \"password\" length must be at least 8 characters long |
        | atul@gmail.com  |  Atul1234    | ValidationError | Validation error at userLogin \"password\" with value \"Atul1234\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]+$/ |
        | atul@gmail.com  |  atul@1234   | ValidationError | Validation error at userLogin \"password\" with value \"atul@1234\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]+$/ |
        | atul@gmail.com  |  123456789   | ValidationError | Validation error at userLogin \"password\" with value \"123456789\" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()])[A-Za-z\\d!@#$%^&*()]+$/ |
        | atul1@gmail.com |  Atul@12345  | ObjectNotFound | There is no such user exist with this email!          |
        | atul@gmail.com  |  Atul@12378  | PasswordNotMatchError | Password doesn't match!          |


    Scenario Outline: Valid inputs then user logs in.
    Given user details email: "<email>" and password:"<password>" to login
    When Try user to login
    Then It login user with details: "<userDetails>"

    Examples:
        | email           |  password    |  userDetails        |
        | atul@gmail.com  |  Atul@12345  | '[{"id":"4c1e7d54-b379-4524-aa02-78f3ad8d494b","email":"atul@gmail.com","password":"Atul@12345"}]'  |