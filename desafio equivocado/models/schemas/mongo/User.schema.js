const { Schema } = require("mongoose");

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email"]
  },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  admin: { type: Boolean },
  chatHistory: [{ type: Schema.Types.ObjectId, ref: "chat" }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
});
UserSchema.index({ email: 1 });

module.exports = UserSchema;