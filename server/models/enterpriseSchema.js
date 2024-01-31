const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const enterpriseSchema = new mongoose.Schema({
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
            }
        }
    ],
    tasksAssigned: [
        {
            employeeEmail: {
                type: String
            },
            taskDate: {
                type: String
            },
            tasks: [
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
                required: true
            }
        }
    ]
});

enterpriseSchema.pre('save', async function (next) {
    try {
        if (this.isModified("password")) {
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (err) {
        console.log(err)
    }
})

enterpriseSchema.methods.generateToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.JWTSECRETKEY);
        this.tokens = [...this.tokens, { token }];
        await this.save();
        return token;
    } catch (err) {
        console.log(err)
    }
}

enterpriseSchema.methods.setDarkMode = async function (mode) {
    try {
        this.darkMode = mode;
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

enterpriseSchema.methods.addTeamMember = async function (employee) {
    try {
        this.teams = [...(this.teams), employee];
        await this.save();
    } catch (err) {
        console.log(err)
    }
}

enterpriseSchema.methods.addTask = async function (taskDetails) {
    try {
        if (this.tasksAssigned[0] === undefined) {
            this.tasksAssigned.push(taskDetails[0]);

        } else {
            const length = this.tasksAssigned.length;
            const latestTask = this.tasksAssigned[length - 1];

            if (latestTask.employeeEmail === taskDetails[0].employeeEmail && latestTask.taskDate === taskDetails[0].taskDate) {
                this.tasksAssigned[length - 1] = taskDetails[0];
            } else {
                let taskExists = false;
                for (let i = 0; i < this.tasksAssigned.length; i++) {
                    const taskObj = this.tasksAssigned[i];
                    if (taskObj.employeeEmail === taskDetails[0].employeeEmail && taskObj.taskDate === taskDetails[0].taskDate) {
                        this.tasksAssigned[i] = taskDetails[0];
                        taskExists = true;
                        break;
                    }
                }
                if (!taskExists) {
                    this.tasksAssigned.push(taskDetails[0]);
                }
            }
        }
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

enterpriseSchema.methods.deleteTask = async function (taskDetails) {
    try {
        for (let index = 0; index < this.tasksAssigned.length; index++) {
            const task = this.tasksAssigned[index];
            if (task.employeeEmail === taskDetails[0].employeeEmail && task.taskDate === taskDetails[0].taskDate) {
                this.tasksAssigned[index] = taskDetails[0];
            }
        }
        await this.save();
    } catch (err) {
        console.log(err);
    }
};

enterpriseSchema.methods.updateTodayTasks = async function (todayDate, updatedTasksArr, employeeEmail) {
    try {
        const length = this.tasksAssigned.length;
        for (let i = 0; i < length; i++) {
            let employeeTaskObj = this.tasksAssigned[i];
            if (employeeTaskObj.employeeEmail === employeeEmail && employeeTaskObj.taskDate === todayDate) {
                this.tasksAssigned[i].tasks = updatedTasksArr;
            }
        }
        await this.save();
    } catch (err) {
        console.log(err)
    }
}


enterpriseSchema.methods.purchasedPremium = async function () {
    try {
        this.isPremium = true;
        await this.save();
    } catch (err) {
        console.log(err)
    }
}
const Enterprise = new mongoose.model("Enterprise", enterpriseSchema);

module.exports = Enterprise;


