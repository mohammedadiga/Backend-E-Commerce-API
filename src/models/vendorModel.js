import mongoose, { isValidObjectId } from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    plan: {
      type: string,
      enum: ["basic", "primary"],
      required: true,
    },
    starDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
);

const vendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storName: {
      type: String,
      required: true,
      unique: true,
    },
    storDescription: {
      type: String,
      required: true,
    },
    storImage: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    subscription: subscriptionSchema,
  },
  { timeseries: true }
);

export const Vendor = mongoose.model("Vendor", vendorSchema);
