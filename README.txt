/*
    Spotify Backend + Auth
    ---------------------------------------------------------------------------------------
    Implement a basic backend for Spotify app with both frontend and backend authentication & authorization
    SERVER SIDE:
    Backend will manage the connection with rapidapi to get info about artists, songs and so on, so rapidapi key should be stored there and not in the react app.
    Example:
    FE wants to get the songs for a specific artist. It will create a request to your BE, BE will call rapidapi and then it will send back the response to FE
    Add a Users collection and implement Token based authentication 
    - Register
    - Login 
    - Implement Authorization for Profile. You can only mess with your own stuff. ex.: John's Profile can be only be viewed and modified by John only
    - [EXTRA] Implement refresh token technique
    - [EXTRA] Login With Facebook
    CLIENT SIDE:
    Create a Register and Login page.
    Save and use the JWT for accessing the APIs.
    [EXTRA] Login With Facebook
*/