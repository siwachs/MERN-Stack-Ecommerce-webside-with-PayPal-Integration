import bcrypt from "bcryptjs";

export const Users = [
  {
    name: "Sh",
    email: "absc@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Sh",
    email: "sabc@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
  {
    name: "Sh",
    email: "adewbc@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
  {
    name: "Sh",
    email: "aweebc@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
];
