import z from "zod";

const userLoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Please enter a valid password",
  }),
});

const userRegisterSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  confirmPassword: z.string().min(8, {
    message: "Confirm password must be at least 8 characters long",
  }),
  role: z.enum(["user", "admin"], {
    message: "Role must be either user or admin",
  }),
  secretKey: z.string().optional().nullable(),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schemas: { [key: string]: z.ZodObject<any, any> } = {
  login: userLoginSchema,
  register: userRegisterSchema,
};

export function validateUser(action: string, data: unknown) {
  const schema = schemas[action];

  if (!schema) {
    throw new Error("Invalid action");
  }

  const result = schema.safeParse(data);

  if (result.success) {
    return {};
  } else {
    const errors = result.error.errors.reduce(
      (acc: { [key: string]: string }, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      },
      {}
    );
    return errors;
  }
}
