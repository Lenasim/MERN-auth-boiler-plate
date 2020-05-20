const express = require('express')   
const app = express()  //펑션을 이용해서 새로운 앱을 만듬
const port = 5000 //서버포트를 임의로 정함
const bodyParser = require('body-parser')
const config = require('./config/key')
const {User} = require('./models/User')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
//application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/register', (req,res) => {
    //회원가입시 필요한 정보들을 클라이언트에서 가져오면 디비에 넣어준다
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
        success: true
        })
    })
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))