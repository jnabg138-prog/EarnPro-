// =====================================================================
// 1. ADVERTICA GLOBAL POPUNDER INJECTION ENGINE (Sab Se Pehle Run Hoga)
// =====================================================================
(function() {
    var adScript = document.createElement('script');
    adScript.type = 'text/javascript';
    adScript.async = true;
    adScript.src = '//data527.click/7737eb87bda399db';
    adScript.setAttribute('placementName', 'EarnPro_Popup');
    
    // Ise page ke head mein sab se ooper daal rahay hain taake automatic trigger ho
    if (document.head) {
        document.head.appendChild(adScript);
    } else {
        document.getElementsByTagName('head')[0].appendChild(adScript);
    }
})();
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
let totalLimit = 2;
let taskReward = 18;
let taskTime = 120; 

// Login Check Security
const phone = localStorage.getItem("currentUser");
if (!phone) {
    alert("Pehle Login Ofline/Online karein!");
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
        
        // Dynamic Plan Selection Logic
        if (currentPlan === "Free") { totalLimit = 2; taskReward = 18; taskTime = 120; }
        else if (currentPlan === "Basic") { totalLimit = 5; taskReward = 33; taskTime = 100; }
        else if (currentPlan === "Standard") { totalLimit = 10; taskReward = 50; taskTime = 80; }
        else if (currentPlan === "Premium") { totalLimit = 15; taskReward = 70; taskTime = 60; }
        else if (currentPlan === "Ultimate") { totalLimit = 25; taskReward = 100; taskTime = 40; }
        
        // Updating Frontend Screen Elements
        if(document.getElementById("p-name")) document.getElementById("p-name").innerText = currentPlan + " Plan";
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
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki aaj ki task limit poori ho chuki hai!");
        return;
    }
    
    // 1. Monetag Ad Trigger: New window popunder
    window.open("https://omg10.com/4/11022523", "_blank");

    // 2. Start Button Hide and Timer Activation
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
