// =====================================================================
// 1. ADVERTICA GLOBAL POPUNDER INJECTION ENGINE (Safe Window Load)
// =====================================================================
window.addEventListener('DOMContentLoaded', function() {
    var adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.async = true;
    adScript.src = '//data527.click/7737eb87bda399db';
    adScript.setAttribute('placementName', 'EarnPro_Popup');
    
    if (document.head) {
        document.head.appendChild(adScript);
    } else {
        document.getElementsByTagName('head')[0].appendChild(adScript);
    }
});
// =====================================================================

// Firebase Configuration (Official Object)
const firebaseConfig = {
    apiKey: "AIzaSyAxkoq0EY9xsF7gTthM3ZajNX-upWVTfmo",
    authDomain: "earnpro-14953.firebaseapp.com",
    databaseURL: "https://earnpro-14953-default-rtdb.firebaseio.com",
    projectId: "earnpro-14953",
    storageBucket: "earnpro-14953.appspot.com",
    messagingSenderId: "754662452601",
    appId: "1:754662452601:web:0548a7ee70ffa1c31f3ad7"
};

// Initialize Firebase Elements
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Application Variables
let currentBalance = 0;
let tasksDoneToday = 0;
let totalLimit = 2;       // Default Limit
let taskReward = 18;      // Default Reward
let taskTime = 120;       // Default Time

// Login Check Security
const phone = localStorage.getItem("currentUser");
if (!phone) {
    alert("Pehle Login Offline/Online karein!");
    window.location.href = "login.html";
}

// Live Firebase Data Synchronization
const userRef = db.ref("users/" + phone);
userRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        
        currentBalance = parseInt(userData.balance || 0);
        tasksDoneToday = parseInt(userData.tasksDone || 0);
        let currentPlan = userData.plan || "Free";
        
        // =============================================================
        // 🔥 FIX: ALL PLANS & VIP LIMITS RIGID LOCK SYSTEM
        // =============================================================
        // Agar user ka plan string me "VIP" ya koi specific name ho, to yahan se control hoga:
        if (currentPlan === "Free") { totalLimit = 2; taskReward = 18; taskTime = 120; }
        else if (currentPlan === "Basic") { totalLimit = 5; taskReward = 33; taskTime = 100; }
        else if (currentPlan === "Standard") { totalLimit = 10; taskReward = 50; taskTime = 80; }
        else if (currentPlan === "Premium") { totalLimit = 15; taskReward = 70; taskTime = 60; }
        else if (currentPlan === "Ultimate") { totalLimit = 25; taskReward = 100; taskTime = 40; }
        
        // --- AAPKE VIP PLANS KI SETTINGS ---
        else if (currentPlan.includes("VIP 1")) { totalLimit = 5; taskReward = 25; taskTime = 90; }
        else if (currentPlan.includes("VIP 2")) { totalLimit = 7; taskReward = 35; taskTime = 80; }
        else if (currentPlan.includes("VIP 3")) { totalLimit = 10; taskReward = 45; taskTime = 70; }
        else if (currentPlan.includes("VIP 4")) { totalLimit = 12; taskReward = 60; taskTime = 60; }
        else if (currentPlan.includes("VIP 5")) { totalLimit = 15; taskReward = 80; taskTime = 50; }
        else if (currentPlan.includes("VIP 6")) { totalLimit = 20; taskReward = 100; taskTime = 40; }
        // VIP 7 Plan ke liye limits yahan lock kar di hain (Aap numbers marzi se badal sakte ho)
        else if (currentPlan.includes("VIP 7")) { totalLimit = 12; taskReward = 120; taskTime = 30; } 
        
        // Fallback agar koi aur naya plan name aa jaye jo ooper nahi hai
        else { totalLimit = 2; taskReward = 18; taskTime = 120; }
        // =============================================================
        
        // Updating Frontend Screen Elements Live
        if(document.getElementById("p-name")) document.getElementById("p-name").innerText = currentPlan + (currentPlan.includes("Plan") ? "" : " Plan");
        if(document.getElementById("t-count")) document.getElementById("t-count").innerText = "Tasks: " + tasksDoneToday + "/" + totalLimit;
        
        let vArea = document.getElementById("v-area");
        if (vArea) {
            vArea.innerHTML = `<p id="r-text" style="color: #38bdf8; font-size: 14px; font-weight: bold; margin-bottom: 10px;">Reward: Rs. ${taskReward}</p>
            <iframe src="https://www.youtube.com/embed/ScWrIexB5i4"></iframe>`;
        }
    }
});

// START TASK CORE ENGINE (With Automatic Monetag Trigger)
function start() {
    // 1. Strict limit verification before running the task
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki aaj ki task limit poori ho chuki hai!");
        return;
    }
    
    // Monetag Ad Trigger: New window popunder
    window.open("https://omg10.com/4/11022523", "_blank");

    // Start Button Hide and Timer Activation
    let sBtn = document.getElementById("s-btn");
    if(sBtn) sBtn.style.display = "none";
    
    let timeLeft = taskTime;
    const timerInterval = setInterval(() => {
        let timerDiv = document.getElementById("timer");
        if(timerDiv) timerDiv.innerText = "Wait: " + timeLeft + "s";
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            if(timerDiv) timerDiv.innerText = "Task Complete!";
            let cBtn = document.getElementById("c-btn");
            if(cBtn) cBtn.style.display = "block";
        }
    }, 1000);
}

// SECURE CLAIM REWARD ENGINE
function claim() {
    // Double check on client side before adding balance to avoid bypass leaks
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki daily task limit cross ho chuki hai!");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        return;
    }

    const newBalance = currentBalance + taskReward;
    const newTasksDone = tasksDoneToday + 1;
    
    userRef.update({
        balance: newBalance,
        tasksDone: newTasksDone
    }).then(() => {
        alert("Mubarak ho! Reward balance mein add ho gaya.");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        if(document.getElementById("timer")) document.getElementById("timer").innerText = "Wait for Start";
    }).catch((error) => {
        alert("Firebase Sync Error: " + error.message);
    });
}
