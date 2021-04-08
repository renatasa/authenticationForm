##  This is Todos app with authorisation.
###   It is based on React Javascript framework, Firebase Realtime Database is used as backend (for authentication and data stodage). Additionally it uses Redux, React router, CSS modules.

##   Interface
<img src="https://github.com/renatasa/authorisedTodosApp/blob/master/src/assets/SignUpForm.PNG" width="600" >
<img src="https://github.com/renatasa/authorisedTodosApp/blob/master/src/assets/LoginErrorMessage.PNG" width="600" >
<img src="https://github.com/renatasa/authorisedTodosApp/blob/master/src/assets/TodosWindow.PNG" width="600" >
<img src="https://github.com/renatasa/authorisedTodosApp/blob/master/src/assets/TodosWarning.PNG" width="600" >
<img src="https://github.com/renatasa/authorisedTodosApp/blob/master/src/assets/TodosNotFetchedError.PNG" width="600" >
<img src="https://github.com/renatasa/authorisedTodosApp/blob/master/src/assets/TodosError2.PNG" width="600" >

### Running the app
Tou can try demo version at https://rsalkevic.lt/auth . Or you can setup the app on your own local machine.
1.	Run npm install (make sure redux, react-redux, redux-thunk, react-router-dom, FontAwesome Icons (follow instructions at https://fontawesome.com/how-to-use/on-the-web/using-with/react) are installed)
2.	Tou need a Google (Firebase) account.
3.	Create Firebase Realtime Database project.
4.	In your Firebase account enable Firebase authentication with email and password, create API key (you can do this in project's settings).
5.	Set Firebase Realtime Database rules like this
{
  "rules": { 
    "todo":  {
    ".read": "auth != null",
    ".write": "auth != null"
  }
  }
}
7.	In Realtime Database Data section create todo object.
8.	On your local machine create .env file in project's my-app directory.
9.	Setup .env file like this
You will find Firebase Realtime database endpoint in Data section
REACT_APP_SIGN_IN=https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=  <-- add project's Firebase API key here
REACT_APP_SIGN_UP=https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=  <-- add project's Firebase API key here
REACT_APP_API_KEY=   <-- add project's Firebase API key here

REACT_APP_POST_TODO_DYNAMIC= add Realtime Database endpoint here with ending /todo/
REACT_APP_GET_TODO= add Realtime Database endpoint here with ending /todo/

10. Run npm start. Open http://localhost:3000/  to view it in the browser.
