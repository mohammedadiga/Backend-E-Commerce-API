import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: string,
    logo: string,
  },
  { timeseries: true }
);

export const Brand = mongoose.model("Brand", brandSchema);
