const sqlite3 = require("sqlite3").verbose();
const xlsx = require("xlsx");
const path = require("path");

const workbook = xlsx.readFile(path.join(__dirname, "../data/dbsmith.xlsx")); 

const db = new sqlite3.Database(path.join(__dirname, "../dbsmith.db"));

workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { defval: null });

  if (data.length === 0) return;

  const columns = Object.keys(data[0]);
  const tableName = sheetName.replace(/\s+/g, "_").toLowerCase();

  const columnDefs = columns.map(col => `"${col.replace(/"/g, '""')}" TEXT`).join(", ");
  const createTableSQL = `CREATE TABLE IF NOT EXISTS "${tableName}" (${columnDefs});`;

  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS "${tableName}"`);
    db.run(createTableSQL);

    const placeholders = columns.map(() => "?").join(", ");
    const insertSQL = `INSERT INTO "${tableName}" (${columns.map(c => `"${c}"`).join(", ")}) VALUES (${placeholders});`;
    const stmt = db.prepare(insertSQL);

    data.forEach(row => {
      const values = columns.map(col => row[col]);
      stmt.run(values);
    });

    stmt.finalize();
    console.log(`Table "${tableName}" importée (${data.length} lignes)`);
  });
});

db.close(() => {
  console.log("Import terminé dans dbsmith.db");
});