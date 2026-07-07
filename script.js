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

// 6-digit Referral Code Generator for the current user
const lastSixDigits = phone.toString().slice(-6);
const myInstantCode = "EP-" + lastSixDigits;

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
            userRef.update({
                tasksDone: 0,
                lastTaskDate: todayDate
            });
        } else {
            tasksDoneToday = parseInt(userData.tasksDone || 0);
        }

        // --- نیا اسکیننگ سسٹم (Total Invites Count) ---
        // اس بات کو یقینی بنائیں کہ آپ کے HTML میں "totalInvites" اور "permBonus" ki IDs موجود ہیں
        if (document.getElementById("permBonus")) {
            document.getElementById("permBonus").innerText = userData.bonusTasks || 0;
        }
        
        if (!userData.myCode || userData.myCode !== myInstantCode) {
            userRef.update({ myCode: myInstantCode });
        }

        db.ref("users").once("value", (allUsersSnapshot) => {
            let count = 0;
            allUsersSnapshot.forEach((childSnapshot) => {
                const u = childSnapshot.val();
                const referredByVal = u.referredBy ? u.referredBy.toString().trim() : "";
                if (referredByVal === myInstantCode.trim()) {
                    count++;
                }
            });
            if(document.getElementById("totalInvites")) {
                document.getElementById("totalInvites").innerText = count;
            }
        });
        // ----------------------------------------------
        
        // 🔥 ALL 4 INVESTMENT PLANS FIXED STRUCTURAL MATRIX
        if (currentPlan === "Free") { 
            totalLimit = 2; taskReward = 15; taskTime = 30; 
        }
        else if (currentPlan.includes("Basic")) { 
            totalLimit = 5; taskReward = 30; taskTime = 25; 
        }
        else if (currentPlan.includes("Standard")) { 
            totalLimit = 7; taskReward = 121; taskTime = 20; 
        }
        else if (currentPlan.includes("Premium")) { 
            totalLimit = 10; taskReward = 220; taskTime = 15;           
        }
        else if (currentPlan.includes("Ultimate")) { 
            totalLimit = 15; taskReward = 513; taskTime = 10;           
        }
        
        // Updating Frontend Screen Elements Live
        if(document.getElementById("p-name")) document.getElementById("p-name").innerText = currentPlan + (currentPlan.includes("Plan") ? "" : " Plan");
        if(document.getElementById("t-count")) document.getElementById("t-count").innerText = "Tasks: " + tasksDoneToday + "/" + totalLimit;
        
        let vArea = document.getElementById("v-area");
        if (vArea) {
            vArea.innerHTML = `<p id="r-text" style="color: #38bdf8; font-size: 14px; font-weight: bold; margin-bottom: 10px;">Reward: Rs. ${taskReward}</p>
            <iframe src="https://www.youtube.com/embed/5mD8t76f578"></iframe>`;
        }
    }
});

// START TASK CORE ENGINE
function start() {
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki aaj ki daily task limit poori ho chuki hai!");
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
    const newBalance = currentBalance + taskReward;
    const newTasksDone = tasksDoneToday + 1;
    const todayDate = getTodayDateString();
    
    userRef.update({
        balance: newBalance,
        tasksDone: newTasksDone,
        lastTaskDate: todayDate
    }).then(() => {
        alert("Mubarak ho! Reward balance mein add ho gaya.");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        if(document.getElementById("timer")) document.getElementById("timer").innerText = "Wait for Start";
    });
        }
