// `npm run dev`: starts `next dev` and auto-publishes Keystatic edits.
//
// Keystatic (local mode) saves edits as files in content/, and the photos, videos, and
// PDFs they point to live in public/. This watches both folders and, a moment after each
// change, commits just those two folders and pushes them to GitHub, which redeploys the
// live site. Nothing else is ever committed, so code changes you're in the middle of are
// never pushed. Use `npm run dev:local` to edit without publishing.
//
// It also gives every project a media folder: when a project is created in Keystatic
// (content/projects/<slug>.yaml), it makes public/project-media/<slug>/ to put its
// photos and videos in.
import { spawn, execFile } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, watch, writeFileSync } from "node:fs";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const FOLDERS = ["content", "public"];
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
        .map((line) => line.split("\t").at(-1).replace(/^(content|public)\//, "").replace(/\.yaml$/, "")),
    ),
  ];
  const shown = names.slice(0, 4).join(", ");
  return `Update content: ${shown}${names.length > 4 ? ` and ${names.length - 4} more` : ""}`;
}

// Creates public/project-media/<slug>/ for any project that doesn't have one yet. A
// .gitkeep file inside lets git store the empty folder. Skips a project whose media
// already points at another existing folder (e.g. after renaming its slug), so a rename
// doesn't leave an extra empty folder behind.
function ensureMediaFolders() {
  const projects = path.join(root, "content", "projects");
  const media = path.join(root, "public", "project-media");
  for (const file of readdirSync(projects).filter((f) => f.endsWith(".yaml"))) {
    const slug = file.replace(/\.yaml$/, "");
    const folder = path.join(media, slug);
    if (existsSync(folder)) continue;
    const usedFolders = [...readFileSync(path.join(projects, file), "utf8").matchAll(
      /\/project-media\/([^/\s]+)\//g,
    )].map((m) => m[1]);
    if (usedFolders.some((f) => existsSync(path.join(media, f)))) continue;
    mkdirSync(folder, { recursive: true });
    writeFileSync(path.join(folder, ".gitkeep"), "");
    log(`created public/project-media/${slug}/ for the new project "${slug}"`);
  }
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
    ensureMediaFolders();
    await git("add", "-A", "--", ...FOLDERS);
    const changed = await git("diff", "--cached", "--name-status", "--", ...FOLDERS);
    if (changed) {
      const message = describe(changed);
      // The pathspec limits the commit to these folders, even if other files are staged.
      await git("commit", "-m", message, "--", ...FOLDERS);
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

for (const folder of FOLDERS) watch(path.join(root, folder), { recursive: true }, schedule);
log("watching content/ and public/ — changes will be committed and pushed automatically.");
publish(); // catch anything saved while the dev server wasn't running

const next = spawn("next", ["dev", ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
});
next.on("exit", (code) => process.exit(code ?? 0));
for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => next.kill(sig));
