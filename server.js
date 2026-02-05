const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// ==================== API Routes ====================

// 种驴基础信息 API - Basic Donkey Information
app.get('/api/donkeys', (req, res) => {
    const query = 'SELECT * FROM donkeys ORDER BY created_at DESC';
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.get('/api/donkeys/:id', (req, res) => {
    const query = 'SELECT * FROM donkeys WHERE id = ?';
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: row });
    });
});

app.post('/api/donkeys', (req, res) => {
    const { name, breed, gender, birth_date, bloodline, health_status, remarks } = req.body;
    const query = `INSERT INTO donkeys (name, breed, gender, birth_date, bloodline, health_status, remarks) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [name, breed, gender, birth_date, bloodline, health_status, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '种驴信息添加成功' });
    });
});

app.put('/api/donkeys/:id', (req, res) => {
    const { name, breed, gender, birth_date, bloodline, health_status, remarks } = req.body;
    const query = `UPDATE donkeys SET name=?, breed=?, gender=?, birth_date=?, bloodline=?, 
                   health_status=?, remarks=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`;
    
    db.run(query, [name, breed, gender, birth_date, bloodline, health_status, remarks, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: '种驴信息更新成功' });
    });
});

// 配种记录 API - Breeding Records
app.get('/api/breeding-records', (req, res) => {
    const query = `SELECT br.*, 
                   m.name as male_name, f.name as female_name
                   FROM breeding_records br
                   LEFT JOIN donkeys m ON br.male_donkey_id = m.id
                   LEFT JOIN donkeys f ON br.female_donkey_id = f.id
                   ORDER BY br.breeding_date DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/breeding-records', (req, res) => {
    const { male_donkey_id, female_donkey_id, breeding_date, breeding_method, success, remarks } = req.body;
    const query = `INSERT INTO breeding_records (male_donkey_id, female_donkey_id, breeding_date, breeding_method, success, remarks)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [male_donkey_id, female_donkey_id, breeding_date, breeding_method, success, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '配种记录添加成功' });
    });
});

// 产驹记录 API - Foal Birth Records
app.get('/api/foal-records', (req, res) => {
    const query = `SELECT fr.*, 
                   m.name as mother_name, f.name as father_name, foal.name as foal_name
                   FROM foal_records fr
                   LEFT JOIN donkeys m ON fr.mother_id = m.id
                   LEFT JOIN donkeys f ON fr.father_id = f.id
                   LEFT JOIN donkeys foal ON fr.foal_id = foal.id
                   ORDER BY fr.birth_date DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/foal-records', (req, res) => {
    const { mother_id, father_id, breeding_record_id, foal_id, birth_date, birth_weight, health_condition, remarks } = req.body;
    const query = `INSERT INTO foal_records (mother_id, father_id, breeding_record_id, foal_id, birth_date, birth_weight, health_condition, remarks)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [mother_id, father_id, breeding_record_id, foal_id, birth_date, birth_weight, health_condition, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '产驹记录添加成功' });
    });
});

// 奶量记录 API - Milk Production Records
app.get('/api/milk-production', (req, res) => {
    const query = `SELECT mp.*, d.name as donkey_name
                   FROM milk_production mp
                   LEFT JOIN donkeys d ON mp.donkey_id = d.id
                   ORDER BY mp.record_date DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/milk-production', (req, res) => {
    const { donkey_id, record_date, morning_amount, afternoon_amount, evening_amount, quality_grade, remarks } = req.body;
    const total_amount = (parseFloat(morning_amount) || 0) + (parseFloat(afternoon_amount) || 0) + (parseFloat(evening_amount) || 0);
    
    const query = `INSERT INTO milk_production (donkey_id, record_date, morning_amount, afternoon_amount, evening_amount, total_amount, quality_grade, remarks)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [donkey_id, record_date, morning_amount, afternoon_amount, evening_amount, total_amount, quality_grade, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '奶量记录添加成功' });
    });
});

// 疫病检测 API - Disease Detection Records
app.get('/api/disease-records', (req, res) => {
    const query = `SELECT dr.*, d.name as donkey_name
                   FROM disease_records dr
                   LEFT JOIN donkeys d ON dr.donkey_id = d.id
                   ORDER BY dr.detection_date DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/disease-records', (req, res) => {
    const { donkey_id, detection_date, disease_name, detection_result, treatment, treatment_date, recovery_status, remarks } = req.body;
    const query = `INSERT INTO disease_records (donkey_id, detection_date, disease_name, detection_result, treatment, treatment_date, recovery_status, remarks)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [donkey_id, detection_date, disease_name, detection_result, treatment, treatment_date, recovery_status, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '疫病记录添加成功' });
    });
});

// 疫苗接种 API - Vaccination Records
app.get('/api/vaccination-records', (req, res) => {
    const query = `SELECT vr.*, d.name as donkey_name
                   FROM vaccination_records vr
                   LEFT JOIN donkeys d ON vr.donkey_id = d.id
                   ORDER BY vr.vaccination_date DESC`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

app.post('/api/vaccination-records', (req, res) => {
    const { donkey_id, vaccine_name, vaccination_date, next_vaccination_date, batch_number, administrator, remarks } = req.body;
    const query = `INSERT INTO vaccination_records (donkey_id, vaccine_name, vaccination_date, next_vaccination_date, batch_number, administrator, remarks)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [donkey_id, vaccine_name, vaccination_date, next_vaccination_date, batch_number, administrator, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '疫苗接种记录添加成功' });
    });
});

// 血统登记 API - Pedigree Registration
app.get('/api/pedigree/:donkeyId', (req, res) => {
    const query = `SELECT p.*, 
                   d.name as donkey_name,
                   f.name as father_name, m.name as mother_name,
                   gp.name as grandfather_paternal_name, gm_p.name as grandmother_paternal_name,
                   gp_m.name as grandfather_maternal_name, gm_m.name as grandmother_maternal_name
                   FROM pedigree p
                   LEFT JOIN donkeys d ON p.donkey_id = d.id
                   LEFT JOIN donkeys f ON p.father_id = f.id
                   LEFT JOIN donkeys m ON p.mother_id = m.id
                   LEFT JOIN donkeys gp ON p.grandfather_paternal_id = gp.id
                   LEFT JOIN donkeys gm_p ON p.grandmother_paternal_id = gm_p.id
                   LEFT JOIN donkeys gp_m ON p.grandfather_maternal_id = gp_m.id
                   LEFT JOIN donkeys gm_m ON p.grandmother_maternal_id = gm_m.id
                   WHERE p.donkey_id = ?`;
    
    db.get(query, [req.params.donkeyId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ data: row });
    });
});

app.post('/api/pedigree', (req, res) => {
    const { donkey_id, father_id, mother_id, grandfather_paternal_id, grandmother_paternal_id,
            grandfather_maternal_id, grandmother_maternal_id, registration_number, registration_date, remarks } = req.body;
    
    const query = `INSERT INTO pedigree (donkey_id, father_id, mother_id, grandfather_paternal_id, grandmother_paternal_id,
                   grandfather_maternal_id, grandmother_maternal_id, registration_number, registration_date, remarks)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [donkey_id, father_id, mother_id, grandfather_paternal_id, grandmother_paternal_id,
                   grandfather_maternal_id, grandmother_maternal_id, registration_number, registration_date, remarks], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: '血统登记成功' });
    });
});

// Statistics API
app.get('/api/statistics', (req, res) => {
    const stats = {};
    
    db.get('SELECT COUNT(*) as count FROM donkeys', [], (err, row) => {
        stats.total_donkeys = row ? row.count : 0;
        
        db.get('SELECT COUNT(*) as count FROM donkeys WHERE gender = "公"', [], (err, row) => {
            stats.male_donkeys = row ? row.count : 0;
            
            db.get('SELECT COUNT(*) as count FROM donkeys WHERE gender = "母"', [], (err, row) => {
                stats.female_donkeys = row ? row.count : 0;
                
                db.get('SELECT COUNT(*) as count FROM breeding_records', [], (err, row) => {
                    stats.total_breedings = row ? row.count : 0;
                    
                    db.get('SELECT COUNT(*) as count FROM foal_records', [], (err, row) => {
                        stats.total_foals = row ? row.count : 0;
                        
                        res.json({ data: stats });
                    });
                });
            });
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`毛驴育种管理系统服务器运行在端口 ${PORT}`);
    console.log(`Donkey Breeding Management System server running on port ${PORT}`);
    console.log(`访问 http://localhost:${PORT} 查看系统`);
});
