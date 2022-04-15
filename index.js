
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000
fs = require('fs');



function pathTo(s) {
	return path.join(__dirname , s)
}

app.use(express.static(path.join(__dirname , 'public')))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


var lastmessagetime = new Date().getTime()
app.get('/checknew',function (req,res,next) {
	res.json({lasttime:lastmessagetime })
})

app.get('/updatemessages',function (req,res,next) {
	t = fs.readFileSync(pathTo('ooopop.txt'))
	res.send(t)
})

app.post('/postmessage', function (req,res,next) {
	var msgData = req.body
	var clearName = msgData.username.replace(/#@#/g , " ")
	var clearMessage = msgData.message.replace(/#@#/g , " ")

	var line = "<div class=\"messagebox\"> <div class=\"messageid\"> " +clearName + "</div>" + clearMessage + "</div>\n"
	fs.appendFileSync(pathTo('ooopop.txt'),line)
	lastmessagetime = new Date().getTime()
	res.send('done')
})