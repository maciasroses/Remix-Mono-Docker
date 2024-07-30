import z from "zod";

const accountingCreateSchema = z.object({
  date: z.date({
    message: "Please enter a valid date",
  }),
  description: z.string().min(2, {
    message: "Please enter a valid description",
  }),
  amount: z.number().positive({
    message: "Please enter a valid amount",
  }),
  currency: z.string(z.enum(["USD", "MXN", "EUR", "GBP"])).min(1, {
    message: "Please select a valid currency",
  }),
  type: z.string(z.enum(["Income", "Expense", "Transfer"])).min(1, {
    message: "Please select a valid type",
  }),
  userId: z.string({
    message: "Please select a user",
  }),
});

const accountingUpdateSchema = z.object({
  date: z.date({
    message: "Please enter a valid date",
  }),
  description: z.string().min(2, {
    message: "Please enter a valid description",
  }),
  amount: z.number().positive({
    message: "Please enter a valid amount",
  }),
  currency: z.string(z.enum(["USD", "MXN", "EUR", "GBP"])).min(1, {
    message: "Please select a valid currency",
  }),
  type: z.string(z.enum(["Income", "Expense", "Transfer"])).min(1, {
    message: "Please select a valid type",
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const schemas: { [key: string]: z.ZodObject<any, any> } = {
  create: accountingCreateSchema,
  update: accountingUpdateSchema,
};

export function validateAccounting(action: string, data: unknown) {
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
