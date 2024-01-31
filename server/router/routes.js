const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");
const cookieParser = require("cookie-parser");      // used when get method is used and authentication needed
router.use(cookieParser());
const Employee = require("../models/employeeSchema");
const Enterprise = require("../models/enterpriseSchema");
const razorpayInstance = require("../paymentInstance/instance");
const crypto = require('crypto');


// Verify user
router.get("/verifyUser", async (req, res) => {
    try {
        const { sessionToken } = req.cookies;
        const verifyUser = jwt.verify(sessionToken, process.env.JWTSECRETKEY);
        const employee = await Employee.findOne({ _id: verifyUser._id, "tokens.token": sessionToken })
        if (employee) {
            return res.status(200).json({ "Message": "true" });
        }
        const enterprise = await Enterprise.findOne({ _id: verifyUser._id, "tokens.token": sessionToken })
        if (enterprise) {
            return res.status(200).json({ "Message": "false" });
        }
        return res.status(401).json({ "Message": "Unauthorized" })
    } catch (err) {
        console.log(err);
    }


})

//  Login and Signup for employee
router.post("/signupEmployee", async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ "Error": "Please fill all the fields" });
        }
        const tempUser1 = await Employee.findOne({ email });
        if (tempUser1) {
            return res.status(422).json({ "Error": "Email already exists" });
        }
        const tempUser2 = await Employee.findOne({ phone });
        if (tempUser2) {
            return res.status(422).json({ "Error": "Phone number already exists" });
        }
        const employee = new Employee({ name, phone, email, password });
        await employee.save();
        console.log(employee);
        return res.status(201).json({ "Message": "User registered successfully" })
    } catch (err) {
        console.log(err);
    }
})

router.post("/loginEmployee", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "Error": "Please fill all the fields" });
        }
        const employee = await Employee.findOne({ email });
        if (employee) {
            const checkPassword = await bcrypt.compare(password, employee.password);
            if (checkPassword) {
                const token = await employee.generateToken();
                res.cookie("sessionToken", token, {
                    expires: new Date(Date.now() + 60000000000),
                    // httpOnly: true
                })
                return res.status(200).json({ "Message": "Login successful" });
            } else {
                return res.status(401).json({ "Error": "Invalid credentials" });
            }
        } else {
            return res.status(401).json({ "Error": "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
})

//  Login and Signup for enterprise
router.post("/signupEnterprise", async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({ "Error": "Please fill all the fields" });
        }
        const tempUser1 = await Enterprise.findOne({ email });
        if (tempUser1) {
            return res.status(422).json({ "Error": "Email already exists" });
        }
        const tempUser2 = await Enterprise.findOne({ phone });
        if (tempUser2) {
            return res.status(422).json({ "Error": "Phone number already exists" });
        }
        const enterprise = new Enterprise({ name, phone, email, password });
        await enterprise.save();
        console.log(enterprise);
        return res.status(201).json({ "Message": "User registered successfully" })
    } catch (err) {
        console.log(err);
    }
})

router.post("/loginEnterprise", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ "Error": "Please fill all the fields" });
        }
        const enterprise = await Enterprise.findOne({ email });
        if (enterprise) {
            const checkPassword = await bcrypt.compare(password, enterprise.password)
            if (checkPassword) {
                const token = await enterprise.generateToken();
                res.cookie("sessionToken", token, {
                    expires: new Date(Date.now() + 60000000000),
                    // httpOnly: true
                })
                return res.status(200).json({ "Message": "Login successful" });
            } else {
                return res.status(401).json({ "Error": "Invalid credentials" });
            }
        } else {
            return res.status(401).json({ "Error": "Invalid credentials" });
        }
    } catch (err) {
        console.log(err);
    }
})

// Send user data
router.get("/getUserData", authentication, async (req, res) => {
    try {
        const { isEmployee } = req.query;
        const { sessionToken, userData, userId } = req;
        if (isEmployee === "true") {
            const { name, isPremium, darkMode, phone, teams, profilePic, email, tasks } = userData;
            return res.status(200).json({ name, isPremium, darkMode, teams, phone, profilePic, email, tasks });
        } else {
            const { isPremium, darkMode, name, email, phone, teams, profilePic, tasksAssigned } = userData;
            return res.status(200).json({ isPremium, darkMode, name, email, phone, teams, profilePic, tasksAssigned });
        }

    } catch (err) {
        console.log(err);
    }
})

// Add team member by enterprise
router.post("/addTeamMember", authentication, async (req, res) => {
    const { userData } = req;
    const { searchUser } = req.body;
    try {
        const enterprise = await Enterprise.findOne({ email: userData.email });
        const employee = await Employee.findOne({ email: searchUser });
        if (enterprise && employee) {
            await enterprise.addTeamMember({ name: employee.name, email: employee.email, phone: employee.phone });
            console.log(enterprise.teams);
            for (let i = 0; i < enterprise.teams.length; i++) {
                let email = enterprise.teams[i].email;
                const employee = await Employee.findOne({ email });
                employee.appendTeam(enterprise.teams);
            }
            if (enterprise.isPremium === true) {
                await employee.purchasedPremium();
            }
            res.status(200).json({ "Message": "Team Member Added" });
        } else {
            res.status(400).json({ "Error": "Error Occurred" });
        }
    } catch (err) {
        console.log(err);
    }
})

// Change dark mode by employee
router.patch("/changeDarkMode", authentication, async (req, res) => {
    const { isEmployee } = req.query
    const { mode } = req.body
    if (isEmployee === "true") {
        const id = req.userId.toString();
        const employee = await Employee.findOne({ _id: id });
        employee.setDarkMode(mode);
        return res.status(200).json({ "Message": "Changed Mode" });
    } else {
        const id = req.userId.toString();
        const enterprise = await Enterprise.findOne({ _id: id });
        console.log(enterprise);
        enterprise.setDarkMode(mode);
        return res.status(200).json({ "Message": "Changed Mode" });
    }
})

// Get task requested by enterprise
router.get("/getTask", authentication, (req, res) => {
    const { employeeEmail, taskDate } = req.query;
    const allTasks = req.userData.tasksAssigned;
    const reqestedTasks = allTasks.filter(task =>
        task.employeeEmail === employeeEmail
        &&
        task.taskDate === taskDate
    )
    res.status(200).json({ "message": reqestedTasks })
})

// Add Tasks by enterprise
router.post("/assignTask", authentication, async (req, res) => {
    const { taskDetails } = req.body;
    const _id = req.userId.toString();
    try {
        const enterprise = await Enterprise.findOne({ _id });
        await enterprise.addTask(taskDetails);

        const employee = await Employee.findOne({ email: taskDetails[0].employeeEmail });
        await employee.addTask(taskDetails);

        res.status(200).json({ "message": "Tasks added" });
    } catch (err) {
        console.log(err)
    }
})

// Delete Tasks by enterprise
router.post("/deleteTask", authentication, async (req, res) => {
    const { taskDetails } = req.body;
    const _id = req.userId.toString();
    try {
        const enterprise = await Enterprise.findOne({ _id });
        await enterprise.deleteTask(taskDetails);

        const employee = await Employee.findOne({ email: taskDetails[0].employeeEmail });
        await employee.deleteTask(taskDetails);

        res.status(200).json({ "message": "Tasks Deleted" });
    } catch (err) {
        console.log(err)
    }
})

// Update today tasks by employee
router.patch("/updateTodayTasks", authentication, async (req, res) => {
    const { todayDate, updatedTasksArr } = req.body;
    const { userId, userData } = req;

    try {
        const id = userId.toString();
        const employee = await Employee.findOne({ _id: id });
        await employee.updateTodayTasks(todayDate, updatedTasksArr);

        const enterprise = await Enterprise.findOne({ "teams.email": userData.email, "tasksAssigned.employeeEmail": userData.email });
        await enterprise.updateTodayTasks(todayDate, updatedTasksArr, userData.email);
        
        res.status(200).json({ "message": "Task Updated" });
    } catch (err) {
        console.log(err)
    }
})

// Payment 
router.get("/razorpay-key", (req, res) => {
    res.status(200).json({ "key": process.env.RAZORPAY_API_ID });
});

router.post('/create-order', async (req, res) => {
    const amount = 1000;                    // Amount in paise (e.g. 1000 paise = ₹10)
    const options = {
        amount: amount,
        currency: 'INR',
    };
    try {
        const order = await razorpayInstance.orders.create(options);
        console.log(order);
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

function hmac_sha256(data, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data);
    return hmac.digest('hex');
}
router.post('/completeOrder/:email', async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const { email } = req.params;
    const generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_API_SECRET);

    if (generated_signature === razorpay_signature) {
        const enterprise = await Enterprise.findOne({ email });
        if (enterprise) {
            await enterprise.purchasedPremium();
            //  make all team members pro
            enterprise.teams.forEach(async emp => {
                const employee = await Employee.findOne({ email: emp.email });
                await employee.purchasedPremium();
            })
            res.redirect("http://localhost:3002");
        } else {
            res.status(400).json({ success: false });
        }
    } else {
        console.log("Payment verification failed");
        res.status(400).json({ success: false });
    }
});

// Logout user
router.get("/logout", (req, res) => {
    res.clearCookie("sessionToken", { path: "/" });
    res.status(200).json({ "Message": "Successfully logged out" });
})

module.exports = router;