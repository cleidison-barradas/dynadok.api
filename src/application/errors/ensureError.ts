export const ensureError = (error: unknown) => {
  if (error instanceof Error) return error;

  let message = "[unknown error]";

  try {
    message = JSON.stringify(message);
  } catch (err) {
    console.error(err);
  }

  return new Error(`unknown error [${message}] `);
};
