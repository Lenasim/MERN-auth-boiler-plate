//개발 중일 때 로컬에서는 development 디플로이 후엔 production
if(process.env.NODE_ENV === "production") {
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}