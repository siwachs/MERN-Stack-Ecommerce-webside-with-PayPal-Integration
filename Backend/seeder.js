import dotenv from "dotenv";

import { Users } from "./DATA/users.js";
import { Products } from "./DATA/products.js";

import Order from "./Models/orderModel.js";
import Product from "./Models/productModel.js";
import User from "./Models/userModel.js";

dotenv.config();

import connectToDB from "./config/db.js";

connectToDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(Users);
    //Get Adimin User
    const Admin = createdUsers[0]._id;

    //Products add admin user to Each one
    const sampleProduct = Products.map((product) => {
      return { ...product, user: Admin };
    });

    await Product.insertMany(sampleProduct);
    console.log("Data Inserted");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1); //Exit Process But with Fail
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1); //Exit Process But with Fail
  }
};

//Execute From CLI
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
