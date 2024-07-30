import { read, create } from "./model.server";
import { redirect, json, createCookieSessionStorage } from "@remix-run/node";
import bcrypt from "bcrypt";
import createLog from "~/utils/createLog.server";
import type { User } from "~/interfaces";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) throw new Error("SESSION_SECRET is not set");

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "auth-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession(
  userId: string,
  role: string,
  redirectTo: string
) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("role", role);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

interface RegisterProps {
  email: string;
  password: string;
  name: string;
  role: string;
}

export async function register(user: RegisterProps) {
  try {
    const userAlreadyExists = await read({ email: user.email });
    if (userAlreadyExists) {
      await createLog({
        body: {
          level: "warning",
          message: "User already exists",
          meta: {
            email: user.email,
          },
        },
      });
      return json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = (await create({ data: user })) as User;

    await createLog({
      body: {
        level: "info",
        message: "User registered",
        meta: {
          userId: newUser.id,
          user: {
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
          },
        },
      },
    });

    return createUserSession(newUser.id, newUser.role, "/home");
  } catch (error) {
    console.error(error);
    throw new Response("An internal error occurred", { status: 500 });
  }
}

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  try {
    const user = await read({ email });

    if (!user || !(await bcrypt.compare(password, (user as User).password))) {
      await createLog({
        body: {
          level: "warning",
          message: "Invalid login",
          meta: {
            email,
          },
        },
      });
      return json({ message: "Invalid email or password" }, { status: 401 });
    }

    await createLog({
      body: {
        level: "info",
        message: "User logged in",
        meta: {
          userId: (user as User).id,
        },
      },
    });

    return createUserSession((user as User).id, (user as User).role, "/home");
  } catch (error) {
    console.error(error);
    throw new Response("An internal error occurred", { status: 500 });
  }
}

async function getUserSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return redirect(`/login?${searchParams.toString()}`);
  }
  return userId;
}

async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") return null;

  try {
    const user = await read({ id: userId });
    return user;
  } catch {
    throw logout(request);
  }
}

export async function logout(request: Request) {
  try {
    const session = await getUserSession(request);
    // await createLog({
    //   body: {
    //     level: "info",
    //     message: "User logged out",
    //     meta: {
    //       userId: session.get("userId"),
    //     },
    //   },
    // });
    return redirect("/", {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    });
  } catch (error) {
    console.error(error);
    throw new Response("An internal error occurred", { status: 500 });
  }
}

export async function getUsers() {
  try {
    return await read({});
  } catch (error) {
    throw new Error("Failed to get users");
  }
}

export async function getUserById({ id }: { id: string }) {
  try {
    const user = await read({ id });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("Failed to get user");
  }
}

export async function getUserByEmail({ email }: { email: string }) {
  try {
    const user = await read({ email });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error("Failed to get user");
  }
}
