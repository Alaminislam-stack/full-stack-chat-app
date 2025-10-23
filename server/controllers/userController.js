import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utility/asyncHedler.js";
import { errorHandler } from "../utility/errorHendler.js";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your-very-secret-key";

export const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, gender } = req.body;

  if (!username || !email || !password || !gender) {
    return next(new errorHandler("All fields are required", 400));
  }

  const existingUserByUserName = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUserByUserName) {
    return next(new errorHandler("User already exists", 400));
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return next(new errorHandler("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarType = gender === "male" ? "boy" : "girl";
  const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

  const user = await prisma.user.create({
    data: { username, email, password: hashedPassword, gender, avatar },
  });

  res.status(201).json(user);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorHandler("User not found", 401));
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return next(new errorHandler("Invalid credentials", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new errorHandler("Invalid credentials", 401));
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const { password: _, ...userWithoutPassword } = user;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000 * 24 * 7,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: userWithoutPassword,
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  if (!req.user.id) {
    return next(new errorHandler("Unauthorized", 401));
  }
  const userId = req.user.id;
  const profile = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!profile) {
    return next(new errorHandler("User not found", 404));
  }
  const { password: _, ...profileWithoutPassword } = profile;
  res.status(200).json({
    success: true,
    message: "profile fetched successfully",
    user: profileWithoutPassword,
  });
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  if (!req.user.id) {
    return next(new errorHandler("Unauthorized", 401));
  }

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  if (!req.user.id) {
    return next(new errorHandler("Unauthorized", 401));
  }

  const userId = req.user.id;
  const { otherUsename } = req.body;

  if (!otherUsename) {
    return next(new errorHandler("otherUsename is required", 400));
  }

  const otherUser = await prisma.user.findUnique({
    where: { username: otherUsename },
  });

  if (!otherUser) {
    return next(new errorHandler("No user found", 404));
  }

  if (otherUser.id === userId) {
    return next(new errorHandler("You cannot fetch your own profile", 400));
  }

  const { password, email, ...safeUser } = otherUser;

  res.status(200).json({
    success: true,
    message: "Other user fetched successfully",
    otherUser: safeUser,
  });
});


export const getUser = asyncHandler(async (req, res, next) => {
  if (!req.user.id) {
    return next(new errorHandler("Unauthorized", 401));
  }
  const userId = req.user.id;
  const { id } = req.body;
  if (!id) {
    return next(new errorHandler("id is required", 400));
  }

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return next(new errorHandler("No user found", 404));
  }

  res.status(200).json({
    success: true,
    message: "users fetched successful",
    User: user,
  });
});
