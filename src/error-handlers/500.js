'use strict';

module.exports = function (err, req, res) {
    const errorMessage = err.message ? err.message : err;
    const error = {
        status: 500,
        message: errorMessage
    }
    res.status(500).json(error);
}