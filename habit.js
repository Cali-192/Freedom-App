// 1. Ngarkimi i të dhënave fillestare nga LocalStorage
let days = parseInt(localStorage.getItem('habitDays')) || 0;
let historyData = JSON.parse(localStorage.getItem('habitHistory')) || [];

// 2. Referencat e elementeve nga HTML
const dayDisplay = document.getElementById('dayCount');
const quoteDisplay = document.getElementById('quote');
const timeline = document.getElementById('timeline');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');
const rankDisplay = document.getElementById('userRank');

// Referencat e reja për Neuroplasticitetin
const dopamineDisplay = document.getElementById('dopamineLevel');
const healingDisplay = document.getElementById('healingPercent');

// 3. Funksioni për të përditësuar pamjen (UI)
function updateUI() {
    // Përditëso numrin e ditëve
    dayDisplay.innerText = days;

    // Përditësimi i Progress Bar (Objektivi 90 ditë)
    let percent = Math.min((days / 90) * 100, 100).toFixed(0);
    progressBar.style.width = percent + "%";
    progressPercent.innerText = percent + "%";

    // Përditësimi i Rank-ut dhe Statustit të Trurit
    updateRank();
    updateBrainStats();

    // Përditësimi i Historikut (Timeline) me ikona
    if (historyData.length === 0) {
        timeline.innerHTML = `<p class="text-muted small italic text-center">Nis betejën sot! Çdo hap vlen.</p>`;
    } else {
        timeline.innerHTML = historyData.map(item => `
            <div class="timeline-item d-flex justify-content-between align-items-center">
                <span><i class="fas fa-fire text-warning me-2"></i> Dita ${item.dayNum} ✅</span>
                <span class="text-info" style="font-size: 0.75rem;">${item.timestamp}</span>
            </div>
        `).reverse().join('');
    }
}

// 4. Funksioni për llogaritjen e Rank-ut (Dinamik)
function updateRank() {
    if (days < 7) {
        rankDisplay.innerText = "RANK: FILLERAR";
        rankDisplay.className = "badge bg-secondary text-white mt-2";
    } else if (days < 30) {
        rankDisplay.innerText = "RANK: LUFTËTAR";
        rankDisplay.className = "badge bg-info text-dark mt-2";
    } else if (days < 60) {
        rankDisplay.innerText = "RANK: ELITË";
        rankDisplay.className = "badge bg-primary text-white mt-2";
    } else if (days < 90) {
        rankDisplay.innerText = "RANK: MJESHTËR";
        rankDisplay.className = "badge bg-warning text-dark mt-2";
    } else {
        rankDisplay.innerText = "RANK: I LIRË (LEGJENDË)";
        rankDisplay.className = "badge bg-success text-white mt-2";
    }
}

// 5. Funksioni i ri: Llogaritja e Neuroplasticitetit
function updateBrainStats() {
    let healing;
    let status;

    if (days === 0) {
        status = "Resetting...";
        healing = 0;
    } else if (days < 7) {
        status = "Low/Irritable";
        healing = Math.min((days / 7) * 15, 15); 
    } else if (days < 21) {
        status = "Recalibrating";
        healing = 15 + ((days - 7) / 14) * 25; 
    } else if (days < 60) {
        status = "Stabilizing";
        healing = 40 + ((days - 21) / 39) * 40; 
    } else {
        status = "Healthy/Receptor Up";
        healing = Math.min(80 + ((days - 60) / 30) * 20, 100);
    }

    dopamineDisplay.innerText = status;
    healingDisplay.innerText = healing.toFixed(0) + "%";
}

// 6. Funksioni Check-in me Efekt Festimi dhe Programim Njoftimi
function checkIn() {
    // Shpërthimi i Confetti-t
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#ffffff', '#3b82f6', '#10b981']
    });

    days = days + 1;
    
    const now = new Date();
    const timestamp = now.toLocaleString('sq-AL', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Shto në historik
    historyData.push({
        dayNum: days,
        timestamp: timestamp
    });

    // Ruajtja në memorien e telefonit
    localStorage.setItem('habitDays', days);
    localStorage.setItem('habitHistory', JSON.stringify(historyData));

    // PROGRAMIMI I NJOFTIMIT (Pas 24 orësh)
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(registration => {
            // Koha: 24 orë (86,400,000 ms)
            // Për TEST: Ndryshoje në 10000 (10 sekonda)
            const delay24h = 86400000; 
            
            registration.active.postMessage({
                type: 'SCHEDULE_NOTIFICATION',
                delay: delay24h
            });
            console.log("Rikujtesa u programua.");
        });
    }

    // Mesazhet motivuese
    const quotes = [
        "Ti je më i fortë se instinkti!",
        "Vazhdo kështu, truri yt po shërohet.",
        "Sot zgjodhe lirinë!",
        "Krenar me ty, kampion!",
        "S25 Ultra në duart e një fituesi!",
        "Disciplina është liri.",
        "Mendja jote është e pastër sot!",
        "Një hap më afër versionit tënd më të mirë.",
        "Mposhte tundimin, fitove jetën!"
    ];
    quoteDisplay.innerText = quotes[Math.floor(Math.random() * quotes.length)];

    updateUI();
}

// 7. Funksioni i Emergjencës (Video motivuese)
function emergencyMode() {
    const confirmEmergency = confirm("Ndihesh nën presion? Mos u dorëzo tani! Do të hapet një video motivuese për të të kthyer në lojë.");
    if (confirmEmergency) {
        window.open("https://www.youtube.com/watch?v=wnHW6o8WMas", "_blank");
    }
}

// 8. Funksioni Reset me Mbrojtje PIN (0000)
function resetCounter() {
    let firstConfirm = confirm("KUJDES! Ky veprim do të fshijë çdo fitore dhe progres që ke bërë.");
    
    if (firstConfirm) {
        let pin = prompt("Për të konfirmuar dështimin, shkruaj PIN-in: 0000");
        
        if (pin === "0000") {
            days = 0;
            historyData = [];
            localStorage.setItem('habitDays', days);
            localStorage.setItem('habitHistory', JSON.stringify(historyData));
            
            dayDisplay.innerText = days;
            quoteDisplay.innerText = "Çdo dështim është një mësim. Fillojmë prapë, më fort!";
            updateUI();
        } else {
            alert("PIN i gabuar. Ky është një mesazh nga universi: MOS U DORËZO!");
        }
    }
}

// 9. Kërkesa për leje njoftimesh sapo hapet app-i
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                console.log("Njoftimet u lejuan nga përdoruesi.");
            }
        });
    }
}

// 10. Ekzekutimi fillestar
requestNotificationPermission();
updateUI();
