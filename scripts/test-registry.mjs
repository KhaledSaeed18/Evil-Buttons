import { readFile, readdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const registryDir = resolve(root, "public/r");
const docsDir = resolve(root, "content/docs");

function normalizeNewlines(value) {
  return value.replace(/\r\n/g, "\n").trimEnd();
}

function fail(message) {
  errors.push(message);
}

const errors = [];

const indexRaw = await readFile(resolve(registryDir, "index.json"), "utf8");
const index = JSON.parse(indexRaw);

if (index.name !== "evil-buttons") {
  fail("index.json: expected name to be evil-buttons");
}

const indexNames = index.items.map((item) => item.name);
const jsonFiles = (await readdir(registryDir))
  .filter((file) => file.endsWith(".json") && file !== "index.json")
  .map((file) => file.replace(/\.json$/, ""));

for (const name of indexNames) {
  if (!jsonFiles.includes(name)) {
    fail(`Missing registry item file: public/r/${name}.json`);
  }
}

for (const name of jsonFiles) {
  if (!indexNames.includes(name)) {
    fail(`Orphan registry file not listed in index.json: public/r/${name}.json`);
  }
}

const docFiles = await readdir(docsDir);
const docContents = await Promise.all(
  docFiles
    .filter((file) => file.endsWith(".mdx"))
    .map(async (file) => ({
      file,
      content: await readFile(resolve(docsDir, file), "utf8"),
    })),
);

for (const name of indexNames) {
  const itemPath = resolve(registryDir, `${name}.json`);
  let item;

  try {
    item = JSON.parse(await readFile(itemPath, "utf8"));
  } catch {
    fail(`Could not parse public/r/${name}.json`);
    continue;
  }

  if (item.name !== name) {
    fail(`public/r/${name}.json: name field is "${item.name}"`);
  }

  if (item.type !== "registry:ui") {
    fail(`public/r/${name}.json: expected type registry:ui`);
  }

  if (!Array.isArray(item.files) || item.files.length === 0) {
    fail(`public/r/${name}.json: files array is missing or empty`);
    continue;
  }

  const indexItem = index.items.find((entry) => entry.name === name);
  const indexPaths = indexItem?.files ?? [];

  for (const fileEntry of item.files) {
    const sourcePath = resolve(root, fileEntry.path);

    try {
      const source = normalizeNewlines(await readFile(sourcePath, "utf8"));
      const embedded = normalizeNewlines(fileEntry.content ?? "");

      if (!embedded) {
        fail(`public/r/${name}.json: missing embedded content for ${fileEntry.path}`);
      } else if (embedded !== source) {
        fail(
          `public/r/${name}.json is stale for ${fileEntry.path}. Run pnpm registry:build`,
        );
      }
    } catch {
      fail(`Source file missing for ${name}: ${fileEntry.path}`);
    }

    if (!indexPaths.includes(fileEntry.path)) {
      fail(
        `index.json files list missing ${fileEntry.path} for registry item "${name}"`,
      );
    }
  }

  const hasDoc = docContents.some(({ content }) =>
    content.includes(`@evilbuttons/${name}`),
  );

  if (!hasDoc) {
    fail(`No docs page references @evilbuttons/${name}`);
  }
}

if (errors.length > 0) {
  console.error("Registry test failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Registry test passed (${indexNames.length} items).`);
