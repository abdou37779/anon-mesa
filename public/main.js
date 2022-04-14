var userId = Math.floor(Math.random() * 9999999).toString()
var lasttimeupdate = new Date().getTime()
//send message
function sendMessage() {
	var data = {
		username: $('#username').val() || userId,
		message: $('#message').val()
	}

	$.post( "/postmessage",data).done(function () {
		$('#message').val("")
	});
}


$('#message-button').click(sendMessage());
$('#message').on('keypress',function(e) {
    if(e.which == 13) {
        sendMessage()
    }
});

function updateMessages() {
	$.get("/updatemessages",
  	function(data, status){
  		$("#mesages-pad").html(data)
  	})
}
updateMessages();
//refresh mesages
setInterval(function () {
	
  $.get("/checknew",
  	function(data, status){
  		console.log(data)
  		if(data.lasttime > lasttimeupdate)
  			updateMessages();
  	})
},1000)