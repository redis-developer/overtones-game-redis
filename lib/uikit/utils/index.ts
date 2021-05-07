import Color from "color";

export { default as withSpace } from "./withSpace";
export type { WithSpaceProps } from "./withSpace";
export { default as withText } from "./withText";
export type { WithTextProps } from "./withText";

export const addAlpha = (hex: string, value = 0.2) => {
  const colorString = Color(hex).alpha(value).string();
  const sanitized = colorString.replace(/\s/g, "");
  return sanitized;
};

/**
 * Get a value using a path from an object with an optional fallback
 */
// TODO test me
export const get = (
  obj: Record<string, any>,
  path: string,
  fallback: any = undefined
) => {
  const validPathRegex = /^([a-z0-9]+\.)*[a-z0-9]+$/gi;
  if (!validPathRegex.test(path)) {
    throw new Error(`Path "${path}" in utils/get is invalid!`);
  }

  const paths = path.split(".");
  let current = obj;

  for (let i = 0; i < paths.length; ++i) {
    if (current[paths[i]] === undefined) {
      return fallback;
    }

    current = current[paths[i]];
  }

  return current;
};
