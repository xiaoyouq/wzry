const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./router/admin/index.js')(app)
require('./plugins/index.js')(app)

const port = 3000

app.listen(port,()=>{
  console.log("http:localhost:/3000")
})