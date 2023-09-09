import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describe the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describe the properties
// that a User Model has
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  generateAuthToken(): string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      select: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

userSchema.pre("save", async function (done) {
  // only hash the password if it was modified (or is new)
  if (this.isModified("password")) {
    this.password = Password.toHash(this.password);
  }
  done();
});

userSchema.methods.generateAuthToken = function (): string {
  return jwt.sign(
    {
      id: this.id,
      email: this.email,
    },
    process.env.JWT_KEY!
  );
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
