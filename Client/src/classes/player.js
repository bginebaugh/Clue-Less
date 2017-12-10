
export var Player = {
   m_xPos ,
   m_yPos ,
   m_userId ,
   m_character,
   m_userName, 

   setUserName: function (username) {
       m_userName = username;
   },

   getUserName: function () {
       return m_userName;
   },

   setUserId: function (userId){
       m_userId = userId;
   },

   getUserId : function () {
       return m_userId;
   },

   setCharacter : function (character) {
       m_character = character;
   },

   getCharacter : function () {
       return m_character;
   }
}
