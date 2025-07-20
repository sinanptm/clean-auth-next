/**
 * Utility to wrap async calls in a standardized try-catch block.
 * Returns an object with either { data } or { error }.
 *
 * @template T - The type of the data expected from the async call.
 * @param {() => Promise<T>} call - The async function to execute.
 * @returns {Promise<{ data?: T; error?: string }>} - Result object.
 *
 * @example
 * const { data, error } = await tryCatch(async () => await getUserById(id));
 * if (error) { ... }
 */
export const tryCatch = async <T>(
  call: () => Promise<T>,
): Promise<{ data?: T; error?: string }> => {
  try {
    const data = await call();
    return { data };
    //eslint-disable-next-line
  } catch (error: any) {
    const errorMessage = error?.message || "Unknown error occurred";
    console.error(error);
    return { error: errorMessage };
  }
};
