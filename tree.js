import fs from "fs";
import path from "path";

const ignore = ["node_modules", ".git", ".vercel", "dist"];

function listDir(dir, prefix = "") {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (ignore.includes(file)) continue;

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const isDir = stat.isDirectory();

    console.log(prefix + (isDir ? "📁 " : "📄 ") + file);

    if (isDir) {
      listDir(filePath, prefix + "   ");
    }
  }
}

console.log("📂 Project structure:\n");
listDir(".");
