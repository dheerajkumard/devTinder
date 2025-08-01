const validator = require('validator');

const validateSignupData = (req)=> {
    const { firstName, lastName, email, password } = req.body;
    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough");
    }
}

const validEditFields = (req) => {
    const allowedUpdateFields = ["firstName", "lastName", "email", "photoUrl","gender", "skills"];
    const updateFields = Object.keys(req.body).every(field => allowedUpdateFields.includes(field));
    if (!updateFields) {
        throw new Error("Invalid fields for update");
    }
    return updateFields;
}

const validPasswordEditField = (req) => {
    const allowedUpdateFields = ["password"];
    const updatePasswordField = Object.keys(req.body).every(field => allowedUpdateFields.includes(field));
    if (!updatePasswordField) {
        throw new Error("Invalid fields for password update");
    }
    return updatePasswordField;
}

module.exports = {
    validateSignupData,
    validEditFields,
    validPasswordEditField
};