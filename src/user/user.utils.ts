import jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const verification: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verification) {
      const user = client.user.findUnique({
        where: { id: verification["id"] },
      });
      return user ? user : null;
    }
  } catch (error) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action",
      };
    }
    return ourResolver(root, args, context, info);
  };
