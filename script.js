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

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxkoq0EY9xsF7gTthM3ZajNX-upWVTfmo",
    authDomain: "earnpro-14953.firebaseapp.com",
    databaseURL: "https://earnpro-14953-default-rtdb.firebaseio.com",
    projectId: "earnpro-14953",
    storageBucket: "earnpro-14953.appspot.com",
    messagingSenderId: "754662452601",
    appId: "1:754662452601:web:0548a7ee70ffa1c31f3ad7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Application Variables
let currentBalance = 0;
let tasksDoneToday = 0;
let totalLimit = 2;       // Free Plan Limit
let taskReward = 15;      // Free Plan Reward
let taskTime = 30;        // Timer seconds

// Login Security Check
const phone = localStorage.getItem("currentUser");
if (!phone) {
    alert("Pehle Login Offline/Online karein!");
    window.location.href = "login.html";
}

// Today's Date Fetcher (Format: YYYY-MM-DD)
const getTodayDateString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// Live Firebase Data Synchronization
const userRef = db.ref("users/" + phone);
userRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        
        currentBalance = parseInt(userData.balance || 0);
        let currentPlan = userData.plan || "Free";
        const lastTaskDate = userData.lastTaskDate || "";
        const todayDate = getTodayDateString();

        // ⏰ AUTO REFRESH LOGIC (Raat 12 Bje Ke Baad Jab Bhi User App Kholega)
        if (lastTaskDate !== todayDate) {
            tasksDoneToday = 0;
            // Database me tasks ko reset aur nai date ko save karna
            userRef.update({
                tasksDone: 0,
                lastTaskDate: todayDate
            });
        } else {
            tasksDoneToday = parseInt(userData.tasksDone || 0);
        }
        
        // =============================================================
        // 🔥 NEW UPDATED TASK LIMITS & REWARDS (BASIC & STANDARD)
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
            totalLimit = 110; 
            taskReward = 20; 
            taskTime = 15; 
        }
        else if (currentPlan.includes("Ultimate")) { 
            totalLimit = 350; 
            taskReward = 22; 
            taskTime = 10; 
        }
        else { 
            totalLimit = 2; 
            taskReward = 15; 
            taskTime = 30; 
        }
        // =============================================================
        
        // Frontend Screen Update Live
        if(document.getElementById("p-name")) document.getElementById("p-name").innerText = currentPlan + (currentPlan.includes("Plan") ? "" : " Plan");
        if(document.getElementById("t-count")) document.getElementById("t-count").innerText = "Tasks: " + tasksDoneToday + "/" + totalLimit;
        
        let vArea = document.getElementById("v-area");
        if (vArea) {
            vArea.innerHTML = `<p id="r-text" style="color: #38bdf8; font-size: 14px; font-weight: bold; margin-bottom: 10px;">Reward: Rs. ${taskReward}</p>
            <iframe src="https://www.youtube.com/embed/ScWrIexB5i4"></iframe>`;
        }
    }
});

// START TASK ENGINE
function start() {
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki aaj ki daily task limit poori ho chuki hai! Raat 12 bje ke baad automatic refresh ho jayegi.");
        return;
    }
    
    window.open("https://omg10.com/4/11022523", "_blank");

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
    
    userRef.update({
        balance: newBalance,
        tasksDone: newTasksDone,
        lastTaskDate: todayDate // Date save rakhna taake refresh track ho sake
    }).then(() => {
        alert("Mubarak ho! Reward balance mein add ho gaya.");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        if(document.getElementById("timer")) document.getElementById("timer").innerText = "Wait for Start";
    }).catch((error) => {
        alert("Firebase Sync Error: " + error.message);
    });
    }
