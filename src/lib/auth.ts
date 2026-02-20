import { v4 as uuidv4 } from "uuid";

const USERS_KEY = "expense-tracker-users";
const SESSION_KEY = "expense-tracker-session";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export type SafeUser = Omit<User, "passwordHash">;

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "expense-tracker-salt");
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user: SafeUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getSession(): SafeUser | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

function toSafeUser(user: User): SafeUser {
  const { passwordHash: _hash, ...safe } = user;
  void _hash;
  return safe;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "An account with this email already exists" };
  }

  const user: User = {
    id: uuidv4(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);
  const safe = toSafeUser(user);
  setSession(safe);
  return { ok: true, user: safe };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ ok: true; user: SafeUser } | { ok: false; error: string }> {
  const users = getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
  if (!user) {
    return { ok: false, error: "No account found with this email" };
  }

  const hash = await hashPassword(password);
  if (hash !== user.passwordHash) {
    return { ok: false, error: "Incorrect password" };
  }

  const safe = toSafeUser(user);
  setSession(safe);
  return { ok: true, user: safe };
}

export function logoutUser(): void {
  clearSession();
}
