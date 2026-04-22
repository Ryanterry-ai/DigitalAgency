import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "public-delivery");
const out = path.join(root, "dist-public-delivery");

if (!existsSync(source)) {
  throw new Error("public-delivery folder not found");
}

if (existsSync(out)) {
  rmSync(out, { recursive: true, force: true });
}

mkdirSync(out, { recursive: true });
cpSync(source, out, { recursive: true });

writeFileSync(
  path.join(out, "BUILD-INFO.txt"),
  `Generated: ${new Date().toISOString()}\nProject: Sai Associates Management System\n`,
);

console.log("Public delivery bundle ready at dist-public-delivery");
