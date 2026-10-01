// `npm run dev`: starts `next dev` and auto-publishes Keystatic edits.
//
// Keystatic (local mode) saves edits as files in content/. This watches that folder
// and, a moment after each save, commits just content/ and pushes it to GitHub, which
// redeploys the live site. Only content/ is ever committed, so code changes you're in
// the middle of are never pushed. Use `npm run dev:local` to edit without publishing.
import { spawn, execFile } from "node:child_process";
import { watch } from "node:fs";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const CONTENT = "content";
const QUIET_MS = 2500; // wait for Keystatic to finish writing (a rename is delete + create)

const log = (msg) => console.log(`\x1b[36m[autopush]\x1b[0m ${msg}`);
const git = async (...args) => (await run("git", args, { cwd: root })).stdout.trim();

// Commit message like "Update content: projects/frogger-game, pages/home".
function describe(nameStatus) {
  const names = [
    ...new Set(
      nameStatus
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split("\t").at(-1).replace(/^content\//, "").replace(/\.yaml$/, "")),
    ),
  ];
  const shown = names.slice(0, 4).join(", ");
  return `Update content: ${shown}${names.length > 4 ? ` and ${names.length - 4} more` : ""}`;
}

let busy = false;
let again = false;

async function publish() {
  if (busy) {
    again = true;
    return;
  }
  busy = true;
  try {
    await git("add", "-A", "--", CONTENT);
    const changed = await git("diff", "--cached", "--name-status", "--", CONTENT);
    if (changed) {
      const message = describe(changed);
      // The pathspec limits the commit to content/, even if other files are staged.
      await git("commit", "-m", message, "--", CONTENT);
      log(`committed "${message}"`);
    }
    const ahead = Number(await git("rev-list", "--count", "@{u}..HEAD"));
    if (ahead > 0) {
      const branch = await git("rev-parse", "--abbrev-ref", "HEAD");
      log(`pushing ${ahead} commit${ahead === 1 ? "" : "s"} to ${branch}...`);
      await git("push");
      log(`pushed — the live site will update once it redeploys (usually ~1 min).`);
      if (branch !== "main") log(`note: you're on "${branch}", not main, so the live site won't change.`);
    }
  } catch (err) {
    log(`\x1b[31mcouldn't publish:\x1b[0m ${(err.stderr || err.message).trim()}`);
    log("your edit is saved locally; it'll be pushed on your next save.");
  } finally {
    busy = false;
    if (again) {
      again = false;
      schedule();
    }
  }
}

let timer;
const schedule = () => {
  clearTimeout(timer);
  timer = setTimeout(publish, QUIET_MS);
};

watch(path.join(root, CONTENT), { recursive: true }, schedule);
log("watching content/ — Keystatic saves will be committed and pushed automatically.");
publish(); // catch anything saved while the dev server wasn't running

const next = spawn("next", ["dev", ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
});
next.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => next.kill(sig));
