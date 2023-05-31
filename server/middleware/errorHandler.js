const {status} = require('../status')
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case status.VALIDATION_ERROR:
            res.json({title: "VALIDATION ERROR", message: err.message, stackTrace: err.stack})
            break
        case status.UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack})
            break
        case status.FORBIDDEN:
            res.json({title: "FORBIDDEN", message: err.message, stackTrace: err.stack})
            break
        case status.NOT_FOUND:
            res.json({title: "NOT FOUND", message: err.message, stackTrace: err.stack})
            break
        case status.SERVER_ERROR:
            res.json({title: "SERVER ERROR", message: err.message, stackTrace: err.stack})
            break
        default:
            console.log("No Error Found")
            break
    }
}

module.exports = errorHandler