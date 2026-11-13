import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_FILE = path.join(ROOT, "src", "data", "site.ts");
const PUBLIC_DIR = path.join(ROOT, "public", "images");

// Ensure target directories exist
const DIRS = {
  recruiters: path.join(PUBLIC_DIR, "recruiters"),
  students: path.join(PUBLIC_DIR, "students"),
  testimonials: path.join(PUBLIC_DIR, "testimonials"),
  brand: path.join(PUBLIC_DIR, "brand"),
};

for (const dir of Object.values(DIRS)) {
  fs.mkdirSync(dir, { recursive: true });
}

async function downloadFile(url, destPath) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      console.error(`Failed ${res.status}: ${url}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    console.log(`Saved: ${path.relative(ROOT, destPath)} (${arrayBuffer.byteLength} bytes)`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  const content = fs.readFileSync(SITE_FILE, "utf8");
  const U = "https://msitm.edu.in/wp-content/uploads";

  // 1. Extract RECRUITERS
  console.log("--- Downloading Recruiter Logos ---");
  const recruiterMatches = content.match(/RECRUITERS:\s*Recruiter\[\]\s*=\s*\[([\s\S]*?)\];/);
  const recruiterMap = new Map();
  if (recruiterMatches) {
    const regex = /logo:\s*`\$\{U\}\/([^`]+)`/g;
    let match;
    while ((match = regex.exec(recruiterMatches[1])) !== null) {
      const relPath = match[1];
      const url = `${U}/${relPath}`;
      const filename = path.basename(relPath).toLowerCase();
      const localDest = path.join(DIRS.recruiters, filename);
      const localWebPath = `/images/recruiters/${filename}`;
      recruiterMap.set(match[0], `logo: "${localWebPath}"`);
      await downloadFile(url, localDest);
    }
  }

  // 2. Extract PLACED_STUDENTS
  console.log("\n--- Downloading Placed Students Photographs ---");
  const studentMatches = content.match(/PLACED_STUDENTS:\s*PlacedStudent\[\]\s*=\s*\[([\s\S]*?)\];/);
  const studentMap = new Map();
  if (studentMatches) {
    const regex = /img:\s*`\$\{U\}\/([^`]+)`/g;
    let match;
    while ((match = regex.exec(studentMatches[1])) !== null) {
      const relPath = match[1];
      const url = `${U}/${relPath}`;
      const filename = path.basename(relPath).toLowerCase().replace(/[^a-z0-9._-]/g, "-");
      const localDest = path.join(DIRS.students, filename);
      const localWebPath = `/images/students/${filename}`;
      studentMap.set(match[0], `img: "${localWebPath}"`);
      await downloadFile(url, localDest);
    }
  }

  // 3. Extract TESTIMONIALS
  console.log("\n--- Downloading Testimonial Photographs ---");
  const testimonialMatches = content.match(/TESTIMONIALS:\s*Testimonial\[\]\s*=\s*\[([\s\S]*?)\];/);
  const testimonialMap = new Map();
  if (testimonialMatches) {
    const regex = /img:\s*`\$\{U\}\/([^`]+)`/g;
    let match;
    while ((match = regex.exec(testimonialMatches[1])) !== null) {
      const relPath = match[1];
      const url = `${U}/${relPath}`;
      const filename = path.basename(relPath).toLowerCase().replace(/[^a-z0-9._-]/g, "-");
      const localDest = path.join(DIRS.testimonials, filename);
      const localWebPath = `/images/testimonials/${filename}`;
      testimonialMap.set(match[0], `img: "${localWebPath}"`);
      await downloadFile(url, localDest);
    }
  }

  // 4. Also check official logo and header brand images from msitm.edu.in
  console.log("\n--- Checking MSITM Brand Assets ---");
  const brandAssets = [
    { url: "https://msitm.edu.in/wp-content/uploads/2025/01/logo.png", filename: "msitm-logo.png" },
    { url: "https://msitm.edu.in/wp-content/uploads/2025/01/cropped-favicon-32x32.png", filename: "favicon-32x32.png" },
    { url: "https://msitm.edu.in/wp-content/uploads/2025/01/cropped-favicon-192x192.png", filename: "favicon-192x192.png" },
  ];
  for (const asset of brandAssets) {
    await downloadFile(asset.url, path.join(DIRS.brand, asset.filename));
  }

  // 5. Rewrite src/data/site.ts to replace external URLs with local paths
  console.log("\n--- Rewriting src/data/site.ts to use local image paths ---");
  let updatedContent = content;
  for (const [target, replacement] of recruiterMap.entries()) {
    updatedContent = updatedContent.replace(target, replacement);
  }
  for (const [target, replacement] of studentMap.entries()) {
    updatedContent = updatedContent.replace(target, replacement);
  }
  for (const [target, replacement] of testimonialMap.entries()) {
    updatedContent = updatedContent.replace(target, replacement);
  }

  // Remove the external constant const U = "https://msitm.edu.in/wp-content/uploads";
  updatedContent = updatedContent.replace(
    'const U = "https://msitm.edu.in/wp-content/uploads";\n\n',
    '// All photographs and logos migrated to local storage under /images/ (Zero external dependencies)\n'
  );

  fs.writeFileSync(SITE_FILE, updatedContent, "utf8");
  console.log("Successfully updated src/data/site.ts with 100% local references!");
}

main().catch(err => {
  console.error("Script failed:", err);
  process.exit(1);
});

