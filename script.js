#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Extensões que valem a pena ler
const READABLE_EXTS = new Set([
  ".js", ".mjs", ".cjs",
  ".ts", ".tsx", ".jsx",
  ".json", ".jsonc",
  ".env", ".env.example", ".env.local",
  ".sql",
  ".html", ".css", ".scss",
  ".md", ".mdx", ".txt",
  ".yaml", ".yml",
  ".toml", ".ini", ".cfg",
  ".sh", ".bash",
  ".prisma",
  ".graphql", ".gql",
  ".xml",
  ".http", ".rest",
]);

// Pastas para ignorar completamente
const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next",
  "out", "coverage", ".cache", ".turbo", "tmp", "temp",
  ".vite", ".parcel-cache", "__pycache__", ".pytest_cache",
]);

// Arquivos para ignorar
const IGNORE_FILES = new Set([
  ".DS_Store", "Thumbs.db", "package-lock.json", "yarn.lock", "pnpm-lock.yaml",
]);

const rootDir = process.argv[2] || process.cwd();
const outputFile = path.join(process.cwd(), "project-dump.txt");

const lines = [];

function header(text) {
  const bar = "═".repeat(80);
  lines.push(`\n╔${bar}╗`);
  lines.push(`║  ${text.padEnd(78)}║`);
  lines.push(`╚${bar}╝`);
}

function subheader(filePath) {
  const rel = path.relative(rootDir, filePath);
  lines.push(`\n${"─".repeat(80)}`);
  lines.push(`📄  ${rel}`);
  lines.push("─".repeat(80));
}

function walkTree(dir, depth = 0) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    if (IGNORE_FILES.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    const indent = "  ".repeat(depth);

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) {
        lines.push(`${indent}📁 ${entry.name}/  [ignorado]`);
        continue;
      }
      lines.push(`${indent}📁 ${entry.name}/`);
      walkTree(fullPath, depth + 1);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      const readable = READABLE_EXTS.has(ext);
      lines.push(`${indent}${readable ? "📄" : "⛔"} ${entry.name}`);
    }
  }
}

function walkContent(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    if (IGNORE_FILES.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) walkContent(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!READABLE_EXTS.has(ext)) continue;

    subheader(fullPath);

    try {
      const content = fs.readFileSync(fullPath, "utf-8");
      if (content.trim() === "") {
        lines.push("[arquivo vazio]");
      } else {
        lines.push(content);
      }
    } catch {
      lines.push("[erro ao ler o arquivo]");
    }
  }
}

// === MAIN ===
header(`PROJECT DUMP — ${rootDir}`);
header("ESTRUTURA DE ARQUIVOS");
walkTree(rootDir);

header("CONTEÚDO DOS ARQUIVOS");
walkContent(rootDir);

const output = lines.join("\n");
fs.writeFileSync(outputFile, output, "utf-8");

const lineCount = output.split("\n").length;
const sizeKb = (Buffer.byteLength(output, "utf-8") / 1024).toFixed(1);
console.log(`✅ Dump gerado: project-dump.txt`);
console.log(`   ${lineCount} linhas — ${sizeKb} KB`);
console.log(`   Caminho: ${outputFile}`);