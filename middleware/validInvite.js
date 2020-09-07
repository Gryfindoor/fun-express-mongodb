const express = require("express");
const app = express();

const validateEmpty = (req, res, next) => {
    const value = req.body;
    if(!value.firstName || !value.secoundName || !value.email) {
        return res.status(500).send({
            status: "Fail",
            error: "Empty value"
        });
    }
    next();
}

module.exports = validateEmpty;