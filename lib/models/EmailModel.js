import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // optional but good for preventing duplicate subscriptions
  },
  date: {
    type: Date,
    default: Date.now, // ✅ pass the function reference, not Date.now()
  },
});

// ✅ Prevent OverwriteModelError in Next.js hot reload
const EmailModel =
  mongoose.models.Email || mongoose.model("Email", EmailSchema);

export default EmailModel;
