import crypto from "crypto";

const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LOWER = "abcdefghijkmnpqrstuvwxyz";
const DIGITS = "23456789";
const SYMBOLS = "!@#$%";
const ALL = UPPER + LOWER + DIGITS + SYMBOLS;

export function generateTemporaryPassword(length = 12) {
  let password = "";
  password += UPPER[crypto.randomInt(UPPER.length)];
  password += LOWER[crypto.randomInt(LOWER.length)];
  password += DIGITS[crypto.randomInt(DIGITS.length)];
  password += SYMBOLS[crypto.randomInt(SYMBOLS.length)];

  for (let i = password.length; i < length; i++) {
    password += ALL[crypto.randomInt(ALL.length)];
  }

  return password
    .split("")
    .sort(() => crypto.randomInt(3) - 1)
    .join("");
}

export function generateInvitationToken() {
  return crypto.randomBytes(32).toString("hex");
}
