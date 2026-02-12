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

// 3. Funksioni për të përditësuar pamjen (UI)
function updateUI() {
    // Përditëso numrin e ditëve
    dayDisplay.innerText = days;

    // Përditësimi i Progress Bar (Objektivi 90 ditë)
    let percent = Math.min((days / 90) * 100, 100).toFixed(0);
    progressBar.style.width = percent + "%";
    progressPercent.innerText = percent + "%";

    // Përditësimi i Rank-ut (Titujve)
    updateRank();

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

// 5. Funksioni Check-in me Efekt Festimi
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

// 6. Funksioni i Emergjencës (Video e re aktive)
function emergencyMode() {
    const confirmEmergency = confirm("Ndihesh nën presion? Mos u dorëzo tani! Do të hapet një video motivuese për të të kthyer në lojë.");
    if (confirmEmergency) {
        // Linku i ri i videos (Motivational Speech)
        window.open("https://www.youtube.com/watch?v=wnHW6o8WMas", "_blank");
    }
}
// 7. Funksioni Reset me Mbrojtje PIN (0000)
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

// 8. Ekzekutimi fillestar për të ngarkuar të dhënat në ekran
updateUI();