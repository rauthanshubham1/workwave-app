const jwt = require("jsonwebtoken");
const Employee = require("..//models/employeeSchema");
const Enterprise = require("..//models/enterpriseSchema");

const authentication = async (req, res, next) => {
    try {
        const { isEmployee } = req.query;
        if (isEmployee === "true") {
            // const { sessionToken } = req.cookies;
            const { sessionToken } = req.query;
            const verifyUser = jwt.verify(sessionToken, process.env.JWTSECRETKEY);
            const employee = await Employee.findOne({ _id: verifyUser._id, "tokens.token": sessionToken })
            if (!employee) {
                throw new Error("User not found");
            }
            req.sessionToken = sessionToken;
            req.userData = employee;
            req.userId = employee._id;
            next();
        } else {
            // const { sessionToken } = req.cookies;
            const { sessionToken } = req.query;
            const verifyUser = jwt.verify(sessionToken, process.env.JWTSECRETKEY);
            const enterprise = await Enterprise.findOne({ _id: verifyUser._id, "tokens.token": sessionToken });
            if (!enterprise) {
                throw new Error("User not found");
            }
            req.sessionToken = sessionToken;
            req.userData = enterprise;
            req.userId = enterprise._id;
            next();
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = authentication;