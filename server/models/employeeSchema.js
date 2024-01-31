const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
    isPremium: {
        type: Boolean,
        default: false
    },
    darkMode: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    enterprise: {
        type: String,
    },
    teams: [
        {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: Number,
            },
        }
    ],
    tasks: [
        {
            taskDate: {
                type: String
            },
            task: [
                {
                    task: {
                        type: String
                    },
                    done: {
                        type: Boolean,
                        default: false
                    }
                }
            ]
        }
    ],
    profilePic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS10PKiP_JgIwAEgEN0iQjXUcx0HfCFmuB-rRDZQkj-0GxtZgb7hZmX9Ks4HEAAgY0832w&usqp=CAU"
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})

employeeSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

employeeSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWTSECRETKEY);
        this.tokens = [...this.tokens, { token }];
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}

employeeSchema.methods.setDarkMode = async function (mode) {
    try {
        this.darkMode = mode;
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

employeeSchema.methods.appendTeam = async function (allTeamArray) {
    try {
        this.teams = allTeamArray;
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

employeeSchema.methods.addTask = async function (taskDetails) {
    try {
        if (this.tasks[0] === undefined) {
            this.tasks = [
                {
                    taskDate: taskDetails[0].taskDate,
                    task: taskDetails[0].tasks,
                },
            ];
        } else {
            const length = this.tasks.length;
            const latestTaskObj = this.tasks[length - 1];

            if (latestTaskObj.taskDate === taskDetails[0].taskDate) {
                this.tasks[length - 1] = {
                    taskDate: taskDetails[0].taskDate,
                    task: taskDetails[0].tasks
                };
            } else {
                this.tasks.push({
                    taskDate: taskDetails[0].taskDate,
                    task: taskDetails[0].tasks
                });
            }
        }
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

employeeSchema.methods.deleteTask = async function (taskDetails) {
    try {
        const length = this.tasks.length;
        this.tasks[length - 1] = {
            taskDate: taskDetails[0].taskDate,
            task: taskDetails[0].tasks
        }

        await this.save();
    } catch (err) {
        console.log(err)
    }
}

employeeSchema.methods.updateTodayTasks = async function (todayDate, updatedTasksArr) {
    try {
        const length = this.tasks.length;
        if (this.tasks[length - 1].taskDate === todayDate) {
            this.tasks[length - 1].task = updatedTasksArr;
        }

        await this.save();
    } catch (err) {
        console.log(err)
    }
}

employeeSchema.methods.purchasedPremium = async function () {
    try {
        this.isPremium = true;
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

const Employee = new mongoose.model("Employee", employeeSchema); // Collection name is Employee

module.exports = Employee;