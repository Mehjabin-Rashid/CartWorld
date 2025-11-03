import UsersModel from "../Models/UsersModel.js";
import { EncodeToken } from "../Utility/tokenUtility.js";
import bcrypt from "bcryptjs";
import { Cookie_EXPIRE_TIME } from "../Config/BD.js";

// Helper to sanitize user object (omit password)
const sanitizeUser = (userDoc) => {
	const u = userDoc.toObject ? userDoc.toObject() : userDoc;
	return {
		_id: u._id,
		name: u.name,
		email: u.email,
		role: u.role,
		isVerified: u.isVerified,
		sellerInfo: u.sellerInfo || {},
		createdAt: u.createdAt,
		updatedAt: u.updatedAt,
	};
};

// Register Service
export const RegisterService = async (req) => {
	try {
		const { name, email, password, role, sellerInfo } = req.body || {};

		// Basic validation
		if (!name || !email || !password) {
			return { status: "fail", message: "name, email and password are required" };
		}

		const normalizedEmail = String(email).toLowerCase().trim();

		// Check for existing user
		const exists = await UsersModel.findOne({ email: normalizedEmail }).lean();
		if (exists) {
			return { status: "fail", message: "Email already registered" };
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(String(password), 10);

		// Create user
		const user = await UsersModel.create({
			name: String(name).trim(),
			email: normalizedEmail,
			password: hashedPassword,
			...(role ? { role } : {}),
			...(sellerInfo ? { sellerInfo } : {}),
		});

		// Generate JWT token
		const token = EncodeToken(user.email, user._id.toString());

		return {
			status: "success",
			message: "Registration successful",
			data: {
				token,
				user: sanitizeUser(user),
			},
		};
	} catch (err) {
		// Handle duplicate key error and other exceptions
		if (err?.code === 11000 && err?.keyPattern?.email) {
			return { status: "fail", message: "Email already registered" };
		}
		return { status: "error", message: "Registration failed", error: err?.message };
	}
};

// Login Service
export const LoginService = async (req, res) => {
	try {
		const { email, password, role: requestedRole } = req.body || {};

		if (!email || !password) {
			return { status: "fail", message: "email and password are required" };
		}

		const normalizedEmail = String(email).toLowerCase().trim();
		const user = await UsersModel.findOne({ email: normalizedEmail });
		if (!user) {
			return { status: "fail", message: "Invalid credentials" };
		}

		const isMatch = await bcrypt.compare(String(password), user.password);
		if (!isMatch) {
			return { status: "fail", message: "Invalid credentials" };
		}

		// Optional role check: if client provided a role, ensure it matches the stored role
		if (requestedRole && String(requestedRole) !== String(user.role)) {
			return { status: "fail", message: `Role mismatch. This account is '${user.role}'.` };
		}

		const token = EncodeToken(user.email, user._id.toString());

		// Set httpOnly cookie for convenience (still return token in body)
		if (res && typeof res.cookie === "function") {
			const cookieOptions = {
				httpOnly: true,
				maxAge: Cookie_EXPIRE_TIME,
				sameSite: "lax",
				secure: false, // set true behind HTTPS
			};
			res.cookie("token", token, cookieOptions);
		}

		return {
			status: "success",
			message: "Login successful",
			data: {
				token,
				user: sanitizeUser(user),
			},
		};
	} catch (err) {
		return { status: "error", message: "Login failed", error: err?.message };
	}
};

// Logout Service
export const LogOutService = async (_req, res) => {
	try {
		if (res && typeof res.clearCookie === "function") {
			res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
		}
		return { status: "success", message: "Logged out" };
	} catch (err) {
		return { status: "error", message: "Logout failed", error: err?.message };
	}
};
