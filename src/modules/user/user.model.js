const mongoose = require("mongoose");
const validator = require("validator");
const { USER, PROJECT } = require("../../database/dbCollections");
const { encrypt, decrypt, decryptArrObj, decryptObj } = require("../../utils/encryption");
const { toJSON } = require("../../utils/plugins");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
      trim: true,
      validate: {
        validator: function (value) {
          const regex = /^[ A-Za-z ]+$/;
          return !value || !value.trim().length || regex.test(value);
        },
        message: "Provided name format is invalid.",
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    lastLogin: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);


userSchema.pre("save", function (next) {
  const user = this;
  if (user.password) {
    user.password = encrypt(user.password);
  }
  next();
});

userSchema.post("save", function (user, next) {
  if (user.password) {
    user.password = undefined;
  }
  next();
});

userSchema.pre("findOne", function (next) {
  if (this.getQuery().password) {
    this.getQuery().password = encrypt(this.getQuery().password);
  }
  next();
});

userSchema.post("findOne", function (user, next) {
  if (user?.password) {
    user.password = undefined;
  }
  next();
});

// userSchema.pre("find", function (next) {
//   if (this.getQuery().mobile) {
//     this.getQuery().mobile = encrypt(this.getQuery().mobile);
//   }
//   if (this.getQuery().email) {
//     this.getQuery().email = encrypt(this.getQuery().email);
//   }
//   next();
// });

// userSchema.post("find", function (result, next) {
//   result = decryptArrObj(result, ["mobile", "email"]);
//   next();
// });

// userSchema.pre("findOneAndUpdate", function (next) {
//   if (this?.getQuery()?.mobile) {
//     this.getQuery().mobile = encrypt(this.getQuery().mobile);
//   }

//   if (this?.getUpdate()?.$set?.email) {
//     this.getUpdate().$set.email = encrypt(this.getUpdate().$set.email);
//   }
//   next();
// });

// userSchema.pre("findOneAndDelete", function (next) {
//   if (this?.getQuery()?.mobile) {
//     this.getQuery().mobile = encrypt(this.getQuery().mobile);
//   }

//   if (this?.getUpdate()?.$set?.email) {
//     this.getUpdate().$set.email = encrypt(this.getUpdate().$set.email);
//   }
//   next();
// });

// userSchema.post("findOneAndUpdate", function (result, next) {
//   result = decryptObj(result, ["mobile", "email"]);
//   next();
// });

// userSchema.post("findOneAndDelete", function (result, next) {
//   result = decryptObj(result, ["mobile", "email"]);
//   next();
// });

userSchema.plugin(toJSON);
/**
 * @typedef User
 */
const User = new mongoose.model(USER, userSchema);
module.exports = User;
