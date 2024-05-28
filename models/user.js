const UserSchema = new Schema({
  userID: { type: String, required: true },
  email: { type: String, default: null },
  connections: { type: Array, default: [] },
  guilds: { type: Array, default: [] },
  ban: {
    status: { type: Boolean, default: false },
    reason: { type: String, default: null },
    date: { type: String, default: null },
    adminID: { type: String, default: null },
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);