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

const User = mongoose.model('User', userSchema)

module.exports = { User }