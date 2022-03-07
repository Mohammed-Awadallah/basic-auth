'use strict';

function handler404(req, res, next) {

    const errorMessage = {
        status: 404,
        message: 'Sorry, we could not find what you were looking for'
    }

    res.status(404).json(errorMessage);
}

module.exports = handler404;