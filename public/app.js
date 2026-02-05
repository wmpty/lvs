// API Base URL
const API_URL = '/api';

// Load initial data
document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
    loadDonkeys();
});

// ==================== Navigation ====================
function showSection(sectionName, event) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Add active class to clicked button
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Load data for the section
    switch(sectionName) {
        case 'donkeys':
            loadDonkeys();
            break;
        case 'breeding':
            loadBreedingRecords();
            loadDonkeySelects(['breeding_male_id', 'breeding_female_id']);
            break;
        case 'foals':
            loadFoalRecords();
            loadDonkeySelects(['foal_mother_id', 'foal_father_id', 'foal_foal_id']);
            break;
        case 'milk':
            loadMilkRecords();
            loadDonkeySelects(['milk_donkey_id'], '母');
            break;
        case 'disease':
            loadDiseaseRecords();
            loadDonkeySelects(['disease_donkey_id']);
            break;
        case 'vaccination':
            loadVaccinationRecords();
            loadDonkeySelects(['vaccination_donkey_id']);
            break;
        case 'pedigree':
            loadDonkeySelects(['pedigree_donkey_id', 'pedigree_father_id', 'pedigree_mother_id',
                              'pedigree_grandfather_paternal_id', 'pedigree_grandmother_paternal_id',
                              'pedigree_grandfather_maternal_id', 'pedigree_grandmother_maternal_id',
                              'searchPedigreeDonkey']);
            break;
    }
}

// ==================== Statistics ====================
async function loadStatistics() {
    try {
        const response = await fetch(`${API_URL}/statistics`);
        const result = await response.json();
        
        if (result.data) {
            document.getElementById('totalDonkeys').textContent = result.data.total_donkeys || 0;
            document.getElementById('maleDonkeys').textContent = result.data.male_donkeys || 0;
            document.getElementById('femaleDonkeys').textContent = result.data.female_donkeys || 0;
            document.getElementById('totalBreedings').textContent = result.data.total_breedings || 0;
            document.getElementById('totalFoals').textContent = result.data.total_foals || 0;
        }
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

// ==================== Donkeys ====================
async function loadDonkeys() {
    try {
        const response = await fetch(`${API_URL}/donkeys`);
        const result = await response.json();
        
        const donkeysList = document.getElementById('donkeysList');
        
        if (result.data && result.data.length > 0) {
            donkeysList.innerHTML = result.data.map(donkey => `
                <div class="data-item">
                    <h4>${donkey.name} (${donkey.gender})</h4>
                    <p><span class="label">品种:</span> ${donkey.breed}</p>
                    <p><span class="label">出生日期:</span> ${donkey.birth_date || '未记录'}</p>
                    <p><span class="label">血缘:</span> ${donkey.bloodline || '未记录'}</p>
                    <p><span class="label">健康状态:</span> ${donkey.health_status || '未记录'}</p>
                    ${donkey.remarks ? `<p><span class="label">备注:</span> ${donkey.remarks}</p>` : ''}
                </div>
            `).join('');
        } else {
            donkeysList.innerHTML = '<div class="empty-state">暂无种驴信息</div>';
        }
    } catch (error) {
        console.error('Error loading donkeys:', error);
        document.getElementById('donkeysList').innerHTML = '<div class="empty-state">加载失败</div>';
    }
}

async function loadDonkeySelects(selectIds, gender = null) {
    try {
        const response = await fetch(`${API_URL}/donkeys`);
        const result = await response.json();
        
        if (result.data) {
            let donkeys = result.data;
            if (gender) {
                donkeys = donkeys.filter(d => d.gender === gender);
            }
            
            selectIds.forEach(selectId => {
                const select = document.getElementById(selectId);
                if (select) {
                    select.innerHTML = '<option value="">请选择</option>' +
                        donkeys.map(donkey => 
                            `<option value="${donkey.id}">${donkey.name} (${donkey.breed})</option>`
                        ).join('');
                }
            });
        }
    } catch (error) {
        console.error('Error loading donkey selects:', error);
    }
}

function showAddDonkeyForm() {
    document.getElementById('addDonkeyForm').style.display = 'block';
}

function hideAddDonkeyForm() {
    document.getElementById('addDonkeyForm').style.display = 'none';
    document.getElementById('addDonkeyForm').querySelector('form').reset();
}

async function addDonkey(event) {
    event.preventDefault();
    
    const data = {
        name: document.getElementById('donkey_name').value,
        breed: document.getElementById('donkey_breed').value,
        gender: document.getElementById('donkey_gender').value,
        birth_date: document.getElementById('donkey_birth_date').value,
        bloodline: document.getElementById('donkey_bloodline').value,
        health_status: document.getElementById('donkey_health_status').value,
        remarks: document.getElementById('donkey_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/donkeys`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddDonkeyForm();
            loadDonkeys();
            loadStatistics();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding donkey:', error);
        alert('添加失败');
    }
}

// ==================== Breeding Records ====================
async function loadBreedingRecords() {
    try {
        const response = await fetch(`${API_URL}/breeding-records`);
        const result = await response.json();
        
        const breedingList = document.getElementById('breedingList');
        
        if (result.data && result.data.length > 0) {
            breedingList.innerHTML = result.data.map(record => `
                <div class="data-item">
                    <h4>配种记录 #${record.id}</h4>
                    <p><span class="label">公驴:</span> ${record.male_name}</p>
                    <p><span class="label">母驴:</span> ${record.female_name}</p>
                    <p><span class="label">配种日期:</span> ${record.breeding_date}</p>
                    <p><span class="label">配种方式:</span> ${record.breeding_method || '未记录'}</p>
                    <p><span class="label">状态:</span> ${record.success ? '成功' : '待确认'}</p>
                    ${record.remarks ? `<p><span class="label">备注:</span> ${record.remarks}</p>` : ''}
                </div>
            `).join('');
        } else {
            breedingList.innerHTML = '<div class="empty-state">暂无配种记录</div>';
        }
    } catch (error) {
        console.error('Error loading breeding records:', error);
        document.getElementById('breedingList').innerHTML = '<div class="empty-state">加载失败</div>';
    }
}

function showAddBreedingForm() {
    document.getElementById('addBreedingForm').style.display = 'block';
    loadDonkeySelects(['breeding_male_id'], '公');
    loadDonkeySelects(['breeding_female_id'], '母');
}

function hideAddBreedingForm() {
    document.getElementById('addBreedingForm').style.display = 'none';
    document.getElementById('addBreedingForm').querySelector('form').reset();
}

async function addBreedingRecord(event) {
    event.preventDefault();
    
    const data = {
        male_donkey_id: document.getElementById('breeding_male_id').value,
        female_donkey_id: document.getElementById('breeding_female_id').value,
        breeding_date: document.getElementById('breeding_date').value,
        breeding_method: document.getElementById('breeding_method').value,
        success: document.getElementById('breeding_success').value,
        remarks: document.getElementById('breeding_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/breeding-records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddBreedingForm();
            loadBreedingRecords();
            loadStatistics();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding breeding record:', error);
        alert('添加失败');
    }
}

// ==================== Foal Records ====================
async function loadFoalRecords() {
    try {
        const response = await fetch(`${API_URL}/foal-records`);
        const result = await response.json();
        
        const foalsList = document.getElementById('foalsList');
        
        if (result.data && result.data.length > 0) {
            foalsList.innerHTML = result.data.map(record => `
                <div class="data-item">
                    <h4>产驹记录 #${record.id}</h4>
                    <p><span class="label">母驴:</span> ${record.mother_name}</p>
                    ${record.father_name ? `<p><span class="label">公驴:</span> ${record.father_name}</p>` : ''}
                    ${record.foal_name ? `<p><span class="label">驹驴:</span> ${record.foal_name}</p>` : ''}
                    <p><span class="label">出生日期:</span> ${record.birth_date}</p>
                    ${record.birth_weight ? `<p><span class="label">出生体重:</span> ${record.birth_weight} kg</p>` : ''}
                    ${record.health_condition ? `<p><span class="label">健康状况:</span> ${record.health_condition}</p>` : ''}
                    ${record.remarks ? `<p><span class="label">备注:</span> ${record.remarks}</p>` : ''}
                </div>
            `).join('');
        } else {
            foalsList.innerHTML = '<div class="empty-state">暂无产驹记录</div>';
        }
    } catch (error) {
        console.error('Error loading foal records:', error);
        document.getElementById('foalsList').innerHTML = '<div class="empty-state">加载失败</div>';
    }
}

function showAddFoalForm() {
    document.getElementById('addFoalForm').style.display = 'block';
    loadDonkeySelects(['foal_mother_id'], '母');
    loadDonkeySelects(['foal_father_id'], '公');
    loadDonkeySelects(['foal_foal_id']);
}

function hideAddFoalForm() {
    document.getElementById('addFoalForm').style.display = 'none';
    document.getElementById('addFoalForm').querySelector('form').reset();
}

async function addFoalRecord(event) {
    event.preventDefault();
    
    const data = {
        mother_id: document.getElementById('foal_mother_id').value,
        father_id: document.getElementById('foal_father_id').value || null,
        foal_id: document.getElementById('foal_foal_id').value || null,
        birth_date: document.getElementById('foal_birth_date').value,
        birth_weight: document.getElementById('foal_birth_weight').value || null,
        health_condition: document.getElementById('foal_health_condition').value,
        remarks: document.getElementById('foal_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/foal-records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddFoalForm();
            loadFoalRecords();
            loadStatistics();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding foal record:', error);
        alert('添加失败');
    }
}

// ==================== Milk Production ====================
async function loadMilkRecords() {
    try {
        const response = await fetch(`${API_URL}/milk-production`);
        const result = await response.json();
        
        const milkList = document.getElementById('milkList');
        
        if (result.data && result.data.length > 0) {
            milkList.innerHTML = result.data.map(record => `
                <div class="data-item">
                    <h4>${record.donkey_name} - ${record.record_date}</h4>
                    <p><span class="label">早上:</span> ${record.morning_amount || 0} L</p>
                    <p><span class="label">下午:</span> ${record.afternoon_amount || 0} L</p>
                    <p><span class="label">晚上:</span> ${record.evening_amount || 0} L</p>
                    <p><span class="label">总计:</span> ${record.total_amount || 0} L</p>
                    <p><span class="label">质量等级:</span> ${record.quality_grade || '未评级'}</p>
                    ${record.remarks ? `<p><span class="label">备注:</span> ${record.remarks}</p>` : ''}
                </div>
            `).join('');
        } else {
            milkList.innerHTML = '<div class="empty-state">暂无奶量记录</div>';
        }
    } catch (error) {
        console.error('Error loading milk records:', error);
        document.getElementById('milkList').innerHTML = '<div class="empty-state">加载失败</div>';
    }
}

function showAddMilkForm() {
    document.getElementById('addMilkForm').style.display = 'block';
    loadDonkeySelects(['milk_donkey_id'], '母');
}

function hideAddMilkForm() {
    document.getElementById('addMilkForm').style.display = 'none';
    document.getElementById('addMilkForm').querySelector('form').reset();
}

async function addMilkRecord(event) {
    event.preventDefault();
    
    const data = {
        donkey_id: document.getElementById('milk_donkey_id').value,
        record_date: document.getElementById('milk_record_date').value,
        morning_amount: document.getElementById('milk_morning_amount').value || 0,
        afternoon_amount: document.getElementById('milk_afternoon_amount').value || 0,
        evening_amount: document.getElementById('milk_evening_amount').value || 0,
        quality_grade: document.getElementById('milk_quality_grade').value,
        remarks: document.getElementById('milk_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/milk-production`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddMilkForm();
            loadMilkRecords();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding milk record:', error);
        alert('添加失败');
    }
}

// ==================== Disease Records ====================
async function loadDiseaseRecords() {
    try {
        const response = await fetch(`${API_URL}/disease-records`);
        const result = await response.json();
        
        const diseaseList = document.getElementById('diseaseList');
        
        if (result.data && result.data.length > 0) {
            diseaseList.innerHTML = result.data.map(record => `
                <div class="data-item">
                    <h4>${record.donkey_name} - ${record.detection_date}</h4>
                    ${record.disease_name ? `<p><span class="label">疾病名称:</span> ${record.disease_name}</p>` : ''}
                    <p><span class="label">检测结果:</span> ${record.detection_result || '未记录'}</p>
                    ${record.treatment ? `<p><span class="label">治疗方案:</span> ${record.treatment}</p>` : ''}
                    ${record.treatment_date ? `<p><span class="label">治疗日期:</span> ${record.treatment_date}</p>` : ''}
                    ${record.recovery_status ? `<p><span class="label">康复状态:</span> ${record.recovery_status}</p>` : ''}
                    ${record.remarks ? `<p><span class="label">备注:</span> ${record.remarks}</p>` : ''}
                </div>
            `).join('');
        } else {
            diseaseList.innerHTML = '<div class="empty-state">暂无疫病检测记录</div>';
        }
    } catch (error) {
        console.error('Error loading disease records:', error);
        document.getElementById('diseaseList').innerHTML = '<div class="empty-state">加载失败</div>';
    }
}

function showAddDiseaseForm() {
    document.getElementById('addDiseaseForm').style.display = 'block';
    loadDonkeySelects(['disease_donkey_id']);
}

function hideAddDiseaseForm() {
    document.getElementById('addDiseaseForm').style.display = 'none';
    document.getElementById('addDiseaseForm').querySelector('form').reset();
}

async function addDiseaseRecord(event) {
    event.preventDefault();
    
    const data = {
        donkey_id: document.getElementById('disease_donkey_id').value,
        detection_date: document.getElementById('disease_detection_date').value,
        disease_name: document.getElementById('disease_name').value,
        detection_result: document.getElementById('disease_detection_result').value,
        treatment: document.getElementById('disease_treatment').value,
        treatment_date: document.getElementById('disease_treatment_date').value,
        recovery_status: document.getElementById('disease_recovery_status').value,
        remarks: document.getElementById('disease_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/disease-records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddDiseaseForm();
            loadDiseaseRecords();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding disease record:', error);
        alert('添加失败');
    }
}

// ==================== Vaccination Records ====================
async function loadVaccinationRecords() {
    try {
        const response = await fetch(`${API_URL}/vaccination-records`);
        const result = await response.json();
        
        const vaccinationList = document.getElementById('vaccinationList');
        
        if (result.data && result.data.length > 0) {
            vaccinationList.innerHTML = result.data.map(record => `
                <div class="data-item">
                    <h4>${record.donkey_name} - ${record.vaccine_name}</h4>
                    <p><span class="label">接种日期:</span> ${record.vaccination_date}</p>
                    ${record.next_vaccination_date ? `<p><span class="label">下次接种:</span> ${record.next_vaccination_date}</p>` : ''}
                    ${record.batch_number ? `<p><span class="label">批次号:</span> ${record.batch_number}</p>` : ''}
                    ${record.administrator ? `<p><span class="label">接种人员:</span> ${record.administrator}</p>` : ''}
                    ${record.remarks ? `<p><span class="label">备注:</span> ${record.remarks}</p>` : ''}
                </div>
            `).join('');
        } else {
            vaccinationList.innerHTML = '<div class="empty-state">暂无疫苗接种记录</div>';
        }
    } catch (error) {
        console.error('Error loading vaccination records:', error);
        document.getElementById('vaccinationList').innerHTML = '<div class="empty-state">加载失败</div>';
    }
}

function showAddVaccinationForm() {
    document.getElementById('addVaccinationForm').style.display = 'block';
    loadDonkeySelects(['vaccination_donkey_id']);
}

function hideAddVaccinationForm() {
    document.getElementById('addVaccinationForm').style.display = 'none';
    document.getElementById('addVaccinationForm').querySelector('form').reset();
}

async function addVaccinationRecord(event) {
    event.preventDefault();
    
    const data = {
        donkey_id: document.getElementById('vaccination_donkey_id').value,
        vaccine_name: document.getElementById('vaccination_vaccine_name').value,
        vaccination_date: document.getElementById('vaccination_date').value,
        next_vaccination_date: document.getElementById('vaccination_next_date').value,
        batch_number: document.getElementById('vaccination_batch_number').value,
        administrator: document.getElementById('vaccination_administrator').value,
        remarks: document.getElementById('vaccination_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/vaccination-records`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddVaccinationForm();
            loadVaccinationRecords();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding vaccination record:', error);
        alert('添加失败');
    }
}

// ==================== Pedigree ====================
function showAddPedigreeForm() {
    document.getElementById('addPedigreeForm').style.display = 'block';
    loadDonkeySelects(['pedigree_donkey_id', 'pedigree_father_id', 'pedigree_mother_id',
                      'pedigree_grandfather_paternal_id', 'pedigree_grandmother_paternal_id',
                      'pedigree_grandfather_maternal_id', 'pedigree_grandmother_maternal_id']);
}

function hideAddPedigreeForm() {
    document.getElementById('addPedigreeForm').style.display = 'none';
    document.getElementById('addPedigreeForm').querySelector('form').reset();
}

async function addPedigree(event) {
    event.preventDefault();
    
    const data = {
        donkey_id: document.getElementById('pedigree_donkey_id').value,
        father_id: document.getElementById('pedigree_father_id').value || null,
        mother_id: document.getElementById('pedigree_mother_id').value || null,
        grandfather_paternal_id: document.getElementById('pedigree_grandfather_paternal_id').value || null,
        grandmother_paternal_id: document.getElementById('pedigree_grandmother_paternal_id').value || null,
        grandfather_maternal_id: document.getElementById('pedigree_grandfather_maternal_id').value || null,
        grandmother_maternal_id: document.getElementById('pedigree_grandmother_maternal_id').value || null,
        registration_number: document.getElementById('pedigree_registration_number').value,
        registration_date: document.getElementById('pedigree_registration_date').value,
        remarks: document.getElementById('pedigree_remarks').value
    };
    
    try {
        const response = await fetch(`${API_URL}/pedigree`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(result.message);
            hideAddPedigreeForm();
        } else {
            alert('添加失败: ' + result.error);
        }
    } catch (error) {
        console.error('Error adding pedigree:', error);
        alert('添加失败');
    }
}

async function searchPedigree() {
    const donkeyId = document.getElementById('searchPedigreeDonkey').value;
    
    if (!donkeyId) {
        document.getElementById('pedigreeDisplay').innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/pedigree/${donkeyId}`);
        const result = await response.json();
        
        if (result.data) {
            const pedigree = result.data;
            document.getElementById('pedigreeDisplay').innerHTML = `
                <div class="pedigree-tree">
                    <div class="pedigree-level">
                        <h4>📋 种驴信息</h4>
                        <div class="pedigree-info">
                            <div class="pedigree-info-item">
                                <div class="label">名称</div>
                                <div class="value">${pedigree.donkey_name || '未知'}</div>
                            </div>
                            <div class="pedigree-info-item">
                                <div class="label">登记号</div>
                                <div class="value">${pedigree.registration_number || '未登记'}</div>
                            </div>
                            <div class="pedigree-info-item">
                                <div class="label">登记日期</div>
                                <div class="value">${pedigree.registration_date || '未记录'}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pedigree-level">
                        <h4>👨‍👩‍👦 父母代</h4>
                        <div class="pedigree-info">
                            <div class="pedigree-info-item">
                                <div class="label">父亲</div>
                                <div class="value">${pedigree.father_name || '未记录'}</div>
                            </div>
                            <div class="pedigree-info-item">
                                <div class="label">母亲</div>
                                <div class="value">${pedigree.mother_name || '未记录'}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="pedigree-level">
                        <h4>👴👵 祖父母代</h4>
                        <div class="pedigree-info">
                            <div class="pedigree-info-item">
                                <div class="label">祖父(父系)</div>
                                <div class="value">${pedigree.grandfather_paternal_name || '未记录'}</div>
                            </div>
                            <div class="pedigree-info-item">
                                <div class="label">祖母(父系)</div>
                                <div class="value">${pedigree.grandmother_paternal_name || '未记录'}</div>
                            </div>
                            <div class="pedigree-info-item">
                                <div class="label">祖父(母系)</div>
                                <div class="value">${pedigree.grandfather_maternal_name || '未记录'}</div>
                            </div>
                            <div class="pedigree-info-item">
                                <div class="label">祖母(母系)</div>
                                <div class="value">${pedigree.grandmother_maternal_name || '未记录'}</div>
                            </div>
                        </div>
                    </div>
                    
                    ${pedigree.remarks ? `
                        <div class="pedigree-level">
                            <h4>📝 备注</h4>
                            <p>${pedigree.remarks}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        } else {
            document.getElementById('pedigreeDisplay').innerHTML = '<div class="empty-state">该种驴尚未登记血统信息</div>';
        }
    } catch (error) {
        console.error('Error searching pedigree:', error);
        document.getElementById('pedigreeDisplay').innerHTML = '<div class="empty-state">查询失败</div>';
    }
}
