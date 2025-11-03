import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState('user');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setMessage(null);

		if (!name.trim() || !email.trim() || !password) {
			setError("Please fill in all fields.");
			return;
		}

		try {
			setLoading(true);
			const res = await fetch("http://localhost:5000/api/users/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ name: name.trim(), email: email.trim(), password, role: role === 'user' ? 'customer' : role }),
			});
			const data = await res.json().catch(() => ({}));
			if (res.ok && (data?.status === "success" || data?.data)) {
				// Auto-login after successful signup to avoid forcing the user to log in again
				const mappedRole = role === 'user' ? 'customer' : role;
				try {
					const loginRes = await fetch("http://localhost:5000/api/users/login", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						credentials: "include",
						body: JSON.stringify({ email: email.trim(), password, role: mappedRole }),
					});
					const loginData = await loginRes.json().catch(() => ({}));
					if (loginRes.ok && loginData?.status === "success") {
						const user = loginData?.data?.user || {};
						const nameVal = user?.name || name.trim();
						const roleVal = user?.role || mappedRole;
						login({ name: nameVal, role: roleVal });
						setMessage("Account created and logged in successfully.");
						setName("");
						setEmail("");
						setPassword("");
						// Go straight to dashboard
						setTimeout(() => navigate('/dashboard', { replace: true }), 500);
					} else {
						// Fallback: show success and send to login if auto-login fails
						setMessage("Account created successfully. Please log in.");
						setTimeout(() => navigate('/login', { replace: true }), 800);
					}
				} catch (_) {
					// Fallback if auto-login network fails
					setMessage("Account created successfully. Please log in.");
					setTimeout(() => navigate('/login', { replace: true }), 800);
				}
			} else {
				setError(data?.message || "Registration failed. Please try again.");
			}
		} catch (err) {
			setError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center px-4">
			<div className="relative w-full max-w-md">
				<div className="w-full rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 p-8">
					<form className="space-y-6" onSubmit={handleSubmit} noValidate>
						<div className="space-y-1">
							<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign up</h1>
							<p className="text-sm text-gray-500 dark:text-gray-400">Create a free account with your email.</p>
						</div>

						{message && (
							<div className="text-sm rounded-md bg-green-50 text-green-700 border border-green-200 px-3 py-2">
								{message}
							</div>
						)}
						{error && (
							<div className="text-sm rounded-md bg-red-50 text-red-700 border border-red-200 px-3 py-2">
								{error}
							</div>
						)}

						<div className="space-y-4">
							<div>
								<label htmlFor="name" className="sr-only">Full Name</label>
								<input
									id="name"
									type="text"
									placeholder="Full Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									autoComplete="name"
								/>
							</div>
							<div>
								<label htmlFor="email" className="sr-only">Email</label>
								<input
									id="email"
									type="email"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									autoComplete="email"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">Password</label>
								<input
									id="password"
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									autoComplete="new-password"
								/>
							</div>
							<div>
								<label htmlFor="role" className="sr-only">Role</label>
								<select
									id="role"
									value={role}
									onChange={(e) => setRole(e.target.value)}
									className="block w-full rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option value="user">User</option>
									<option value="seller">Seller</option>
								</select>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 font-medium shadow-sm transition-colors"
						>
							{loading ? "Creating account..." : "Sign up"}
						</button>
					</form>

					<div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
						<span>Have an account? </span>
						<Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Log in</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;

