const firebaseConfig = {
    apiKey: "AIzaSyDbNNgoru1z4RoXvc4zy8DL8eiXlT1sEqE",
    authDomain: "vamos-conversar-c0188.firebaseapp.com",
    databaseURL: "https://vamos-conversar-c0188-default-rtdb.firebaseio.com",
    projectId: "vamos-conversar-c0188",
    storageBucket: "vamos-conversar-c0188.appspot.com",
    messagingSenderId: "24379303165",
    appId: "1:24379303165:web:ddec64b5008d441e6bca94"
  }; 
  firebase.initializeApp(firebaseConfig);
  userName = localStorage.getItem("userName");

  roomName = localStorage.getItem("roomName");

  function send()
  {
   msg = document.getElementById("msg").value;
   firebase.database().ref(roomName).push({
    name:userName,
    message:msg,
    like:0
   });
   
   document.getElementById("msg").value = "";
  }
function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebaseMessageId = childKey;
    messageData = childData;
//Início do código
    console.log(firebaseMessageId);
    console.log(messageData);
    name = messageData['name'];
    message = messageData['message'];
    like = messageData['like'];
    nameWithTag = "<h4> "+name+"<img class='user_tick' src='tick.png'> </h4>";
    messageWithTag = "<h4 class='message_h4'>"+message+"</h4>" ;
    like_button = "<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
    spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span> </button> <hr>";
    row = nameWithTag+messageWithTag+like_button+spanWithTag;
    document.getElementById("output").innerHTML = row;
//Fim do código
 } });  }); }
getData();

function updateLike(messageId){
    console.log("Botão De like Apertado -" +messageId);
    buttonId = messageId;
    likes = document.getElementById(buttonId).value;
    updatedLike = Number(likes)+1;
    console.log(updatedLike);
    firebase.database().ref(roomName).child(messageId).update({like:updatedLike});
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("roomName");
        window.location = "index.html";
    }