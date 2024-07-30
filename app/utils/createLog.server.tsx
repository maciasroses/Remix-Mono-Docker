import prisma from "~/services/prisma.server";
import z from "zod";

// SCHEMA
const logSchema = z.object({
  level: z.string(),
  message: z.string(),
  meta: z.object({}).optional(),
});
function validateLog(data: unknown) {
  return logSchema.safeParse(data);
}

// MODEL
async function createLogModel({
  data,
}: {
  data: (typeof prisma.log.create)["arguments"]["data"];
}) {
  return await prisma.log.create({ data });
}

// CONTROLLER
const createLog = async ({ body }: { body: unknown }) => {
  try {
    const data = validateLog(body);
    if (!data.success) {
      throw new Error(data.error.message);
    }
    return await createLogModel({ data: body });
  } catch (error) {
    throw new Error("Failed to create log");
  }
};

export default createLog;
