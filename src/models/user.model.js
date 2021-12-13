const bcrypt = require('bcryptjs');

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true },
    password: { type: 'string', required: true },
    profile_pic: [{ type: String, required: true }]
},
    {
        versionKey: false,
        timestamp: true,
    }
);

// userSchema.pre("save", function (next){
//     if(!this.isModified("password")) return next();

//     bcrypt.hash(this.password, 10, (err, hash) => {
//         this.password = hash;
//         return next();
//     });
// });

// userSchema.methods.checkPassword = function(password) {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(password, this.password, function(err, same) {
//             if(err) return reject(err);

//             return resolve(same);
//         });
//     });
// }

module.exports = model("user", userSchema);