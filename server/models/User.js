const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
})

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        //비밀번호암호화
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        });
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    //패스워드를 다시 암호화해서 비교
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function (callback) {
    var user = this
    //제이슨 웹토큰 모듈을 사용해서 토큰 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //user._id + secretToken = token
    user.token = token
    user.save(function (err, user) {
        if(err) return callback(err)
        callback(null, user)

    })
}

userSchema.statics.findByToken = function(token, callback){
    var user = this

    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저아이디를 이용해 유저를 찾은 뒤 클라이언트에서 가져온 도큰과 디비에 보관된 토큰이 일치하는지 확인
        user.findOne({
            "_id": decoded,
            "token": token
        },
        function(err, user){
            if(err) return callback(err)
            callback(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }