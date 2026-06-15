import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().optional().or(z.literal("")),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
  NEXT_PUBLIC_USE_MOCKS: z.enum(["true", "false"]).optional(),
});

const serverEnvSchema = clientEnvSchema.extend({
  API_TOKEN: z.string().optional(),
  ADMIN_SESSION_SECRET: z.string().min(1).optional(),
});

const parsedClient = clientEnvSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS,
});

if (!parsedClient.success) {
  console.error("Invalid client env:", parsedClient.error.flatten().fieldErrors);
}

export const clientEnv = {
  apiUrl: parsedClient.data?.NEXT_PUBLIC_API_URL ?? "",
  whatsappNumber: parsedClient.data?.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  useMocks: (parsedClient.data?.NEXT_PUBLIC_USE_MOCKS ?? "true") === "true",
};

export function getServerEnv() {
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error("Invalid server env: " + JSON.stringify(parsed.error.flatten().fieldErrors));
  }
  return {
    apiUrl: parsed.data.NEXT_PUBLIC_API_URL ?? "",
    apiToken: parsed.data.API_TOKEN ?? "",
    adminSessionSecret: parsed.data.ADMIN_SESSION_SECRET ?? "dev-secret",
    whatsappNumber: parsed.data.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    useMocks: (parsed.data.NEXT_PUBLIC_USE_MOCKS ?? "true") === "true",
  };
}
