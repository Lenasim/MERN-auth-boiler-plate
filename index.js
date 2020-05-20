const express = require('express')   
const app = express()  //펑션을 이용해서 새로운 앱을 만듬
const port = 5000 //서버포트를 임의로 정함

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://lena:sim@boilerplate-euxz3.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))