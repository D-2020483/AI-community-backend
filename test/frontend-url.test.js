import test from "node:test";
import assert from "node:assert/strict";
import { buildInviteUrl } from "../src/utils/frontendUrl.js";

test("builds a local accept-invite URL from the frontend origin", () => {
  assert.equal(
    buildInviteUrl("http://localhost:5173", "test-token"),
    "http://localhost:5173/accept-invite?token=test-token",
  );
});

test("builds a deployed accept-invite URL from the frontend origin", () => {
  assert.equal(
    buildInviteUrl("https://civic-link-frontend.vercel.app", "prod-token"),
    "https://civic-link-frontend.vercel.app/accept-invite?token=prod-token",
  );
});

test("encodes the invitation token in the query string", () => {
  assert.equal(
    buildInviteUrl("http://localhost:5173", "a+b/c"),
    "http://localhost:5173/accept-invite?token=a%2Bb%2Fc",
  );
});
