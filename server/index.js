const express = require('express')
const app = express()  //펑션을 이용해서 새로운 앱을 만듬
const port = 5000 //서버포트를 임의로 정함
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//application/json
app.use(bodyParser.json())
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/hello', (req, res) => res.send('dkssudgktpdy'))

app.post('/api/users/register', (req, res) => {
    //회원가입시 필요한 정보들을 클라이언트에서 가져오면 디비에 넣어준다
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})


//log-in : 1) search id among the inputs 2) verify password 3) if right create token
app.post('/api/users/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "No user matching the email"
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "Password is wrong"
                })
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                //토큰을 저장한다 ('쿠키' 외에도 로컬스토리지 등)
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id
                    })

            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 건 인증 통과했다는 말
    console.log('sucess')
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).send({ success: true })
        })

})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))