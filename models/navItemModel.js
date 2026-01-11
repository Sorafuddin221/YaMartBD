const mongoose = require("mongoose");

const navItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name for the navigation item."],
  },
  path: {
    type: String,
    required: [true, "Please enter a path for the navigation item."],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NavItem",
    default: null,
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.models.NavItem || mongoose.model("NavItem", navItemSchema);
