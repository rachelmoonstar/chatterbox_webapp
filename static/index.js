document.addEventListener('DOMContentLoaded', () => {

  //when a new user visits the site, prompt the user to type in a username.
  if (!localStorage.getItem('username')) {
    var username = prompt("Please create a username to start chatting in ChatterBox!");
    localStorage.setItem('username', username);
  };

  // Connect to websocket
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, configure buttons
  socket.on('connect', () => {

      // Each button should emit a "submit vote" event
      document.querySelector("#new-message").onsubmit = () => {
          var message = document.querySelector("#message").value;
          socket.emit('send message', {'message': message});
          return false;
        };
      });

  // When a new vote is announced, add to the unordered list
  socket.on('announce message', data => {
      var time = new Date();
      localtime = time.toLocaleString();
      const li = document.createElement('li');
      li.innerHTML = `<span style = "font-size: 20px"><b> ${username} </b></span> <span style = "color: grey">(${localtime})</span><b>:</b> <br> &nbsp;${data.message}`;
      document.querySelector('#messages').append(li);
      document.querySelector("#message").value = '';
    });
  });
