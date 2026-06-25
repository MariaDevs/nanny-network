import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "dev.db");
const db = new Database(dbPath);

async function main() {
  const existing = db.prepare("SELECT id FROM User WHERE email = ?").get("admin@nannynetwork.co.za");
  if (!existing) {
    const hash = await bcrypt.hash("Admin@NannyNetwork2024!", 12);
    const id = `admin_${Date.now()}`;
    db.prepare("INSERT INTO User (id, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)").run(
      id, "admin@nannynetwork.co.za", hash, "admin", new Date().toISOString()
    );
    console.log("✅ Admin created: admin@nannynetwork.co.za");
    console.log("   Password: Admin@NannyNetwork2024!");
  } else {
    console.log("ℹ️  Admin already exists.");
  }
  db.close();
}

main().catch(console.error);
