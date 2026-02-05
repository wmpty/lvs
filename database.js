const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const db = new sqlite3.Database(path.join(__dirname, 'donkey_breeding.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initDatabase();
    }
});

// Initialize database schema
function initDatabase() {
    // 种驴基础信息表 - Basic Donkey Information
    db.run(`CREATE TABLE IF NOT EXISTS donkeys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        breed TEXT NOT NULL,
        gender TEXT CHECK(gender IN ('公', '母')) NOT NULL,
        birth_date TEXT,
        bloodline TEXT,
        health_status TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 配种记录表 - Breeding Records
    db.run(`CREATE TABLE IF NOT EXISTS breeding_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        male_donkey_id INTEGER NOT NULL,
        female_donkey_id INTEGER NOT NULL,
        breeding_date TEXT NOT NULL,
        breeding_method TEXT,
        success INTEGER DEFAULT 0,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (male_donkey_id) REFERENCES donkeys(id),
        FOREIGN KEY (female_donkey_id) REFERENCES donkeys(id)
    )`);

    // 产驹记录表 - Foal Birth Records
    db.run(`CREATE TABLE IF NOT EXISTS foal_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mother_id INTEGER NOT NULL,
        father_id INTEGER,
        breeding_record_id INTEGER,
        foal_id INTEGER,
        birth_date TEXT NOT NULL,
        birth_weight REAL,
        health_condition TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (mother_id) REFERENCES donkeys(id),
        FOREIGN KEY (father_id) REFERENCES donkeys(id),
        FOREIGN KEY (breeding_record_id) REFERENCES breeding_records(id),
        FOREIGN KEY (foal_id) REFERENCES donkeys(id)
    )`);

    // 奶量记录表 - Milk Production Records
    db.run(`CREATE TABLE IF NOT EXISTS milk_production (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donkey_id INTEGER NOT NULL,
        record_date TEXT NOT NULL,
        morning_amount REAL,
        afternoon_amount REAL,
        evening_amount REAL,
        total_amount REAL,
        quality_grade TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donkey_id) REFERENCES donkeys(id)
    )`);

    // 疫病检测记录表 - Disease Detection Records
    db.run(`CREATE TABLE IF NOT EXISTS disease_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donkey_id INTEGER NOT NULL,
        detection_date TEXT NOT NULL,
        disease_name TEXT,
        detection_result TEXT,
        treatment TEXT,
        treatment_date TEXT,
        recovery_status TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donkey_id) REFERENCES donkeys(id)
    )`);

    // 疫苗接种记录表 - Vaccination Records
    db.run(`CREATE TABLE IF NOT EXISTS vaccination_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donkey_id INTEGER NOT NULL,
        vaccine_name TEXT NOT NULL,
        vaccination_date TEXT NOT NULL,
        next_vaccination_date TEXT,
        batch_number TEXT,
        administrator TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donkey_id) REFERENCES donkeys(id)
    )`);

    // 血统登记表 - Pedigree Registration
    db.run(`CREATE TABLE IF NOT EXISTS pedigree (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donkey_id INTEGER NOT NULL,
        father_id INTEGER,
        mother_id INTEGER,
        grandfather_paternal_id INTEGER,
        grandmother_paternal_id INTEGER,
        grandfather_maternal_id INTEGER,
        grandmother_maternal_id INTEGER,
        registration_number TEXT UNIQUE,
        registration_date TEXT,
        remarks TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donkey_id) REFERENCES donkeys(id),
        FOREIGN KEY (father_id) REFERENCES donkeys(id),
        FOREIGN KEY (mother_id) REFERENCES donkeys(id)
    )`);

    console.log('Database tables initialized');
}

module.exports = db;
