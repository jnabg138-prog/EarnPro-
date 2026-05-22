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

// Firebase Configuration Object
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
let totalLimit = 2;       // Free Plan Fallback Limit
let taskReward = 15;      // Free Plan Fallback Reward
let taskTime = 30;        // Default Timer seconds

// Login Security Verification
const phone = localStorage.getItem("currentUser");
if (!phone) {
    alert("Pehle Login Offline/Online karein!");
    window.location.href = "login.html";
}

// Pakistani/Local Date Fetcher (Format: YYYY-MM-DD)
const getTodayDateString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Live Firebase Data Synchronization Engine
const userRef = db.ref("users/" + phone);
userRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        
        currentBalance = parseInt(userData.balance || 0);
        let currentPlan = userData.plan || "Free";
        const lastTaskDate = userData.lastTaskDate || "";
        const todayDate = getTodayDateString();

        // ⏰ 12:00 AM MIDNIGHT AUTO-REFRESH LOGIC
        if (lastTaskDate !== todayDate) {
            tasksDoneToday = 0;
            // Database mein automatic counter refresh aur nai date lock karna
            userRef.update({
                tasksDone: 0,
                lastTaskDate: todayDate
            });
        } else {
            tasksDoneToday = parseInt(userData.tasksDone || 0);
        }
        
        // =============================================================
        // 🔥 ALL 4 INVESTMENT PLANS FIXED STRUCTURAL MATRIX
        // =============================================================
        if (currentPlan === "Free") { 
            totalLimit = 2; 
            taskReward = 15; 
            taskTime = 30; 
        }
        else if (currentPlan.includes("Basic")) { 
            totalLimit = 5;          // 5 Tasks Daily
            taskReward = 30;         // Rs. 30 Per Task (Total Rs. 150)
            taskTime = 25; 
        }
        else if (currentPlan.includes("Standard")) { 
            totalLimit = 7;          // 7 Tasks Daily
            taskReward = 121;        // Rs. 121 Per Task (Total Rs. 847)
            taskTime = 20; 
        }
        else if (currentPlan.includes("Premium")) { 
            totalLimit = 10;         // 10 Tasks Daily
            taskReward = 220;        // Rs. 220 Per Task (Total Rs. 2200)
            taskTime = 15;           
        }
        else if (currentPlan.includes("Ultimate")) { 
            totalLimit = 15;         // 15 Tasks Daily
            taskReward = 513;        // Rs. 513 Per Task (Total Rs. 7695)
            taskTime = 10;           
        }
        else { 
            totalLimit = 2; 
            taskReward = 15; 
            taskTime = 30; 
        }
        // =============================================================
        
        // Updating Frontend Screen Elements Live
        if(document.getElementById("p-name")) document.getElementById("p-name").innerText = currentPlan + (currentPlan.includes("Plan") ? "" : " Plan");
        if(document.getElementById("t-count")) document.getElementById("t-count").innerText = "Tasks: " + tasksDoneToday + "/" + totalLimit;
        
        // 🔥 FIXED VIDEO INJECTION: Is embed link mein aapki requested video ka ID set kar diya hai
        let vArea = document.getElementById("v-area");
        if (vArea) {
            vArea.innerHTML = `<p id="r-text" style="color: #38bdf8; font-size: 14px; font-weight: bold; margin-bottom: 10px;">Reward: Rs. ${taskReward}</p>
            <iframe src="https://www.youtube.com/embed/FOlcoz_3TPY"></iframe>`;
        }
    }
});

// START TASK CORE ENGINE (With Monetag Popunder Integration)
function start() {
    // Intercept check to completely block limit bypass attempts
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki aaj ki daily task limit poori ho chuki hai! Raat 12 bje ke baad automatic refresh ho jayegi.");
        return;
    }
    
    // Ads Activation Trigger
    window.open("https://omg10.com/4/11022523", "_blank");

    // UI State Management (Hide Start, Show Countdowns)
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
    if (tasksDoneToday >= totalLimit) {
        alert("Daily task limit crossed!");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        return;
    }

    const newBalance = currentBalance + taskReward;
    const newTasksDone = tasksDoneToday + 1;
    const todayDate = getTodayDateString();
    
    // Synchronizing finalized parameters directly to Firebase
    userRef.update({
        balance: newBalance,
        tasksDone: newTasksDone,
        lastTaskDate: todayDate
    }).then(() => {
        alert("Mubarak ho! Reward balance mein add ho gaya.");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        if(document.getElementById("timer")) document.getElementById("timer").innerText = "Wait for Start";
    }).catch((error) => {
        alert("Firebase Sync Error: " + error.message);
    });
            }
