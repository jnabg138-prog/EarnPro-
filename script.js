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

// Global Variables Setup
let currentBalance = 0;
let tasksDoneToday = 0;
let totalLimit = 2;
let taskReward = 18;
let taskTime = 120; 

// User Login Check karna
const phone = localStorage.getItem("currentUser");
if (!phone) {
    alert("Pehle Login karein!");
    window.location.href = "login.html";
}

// Database se Live Data fetch karna
const userRef = db.ref("users/" + phone);
userRef.on("value", (snapshot) => {
    if (snapshot.exists()) {
        const userData = snapshot.val();
        
        currentBalance = parseInt(userData.balance || 0);
        tasksDoneToday = parseInt(userData.tasksDone || 0);
        let currentPlan = userData.plan || "Free";
        
        // Plans Configuration
        if (currentPlan === "Free") { totalLimit = 2; taskReward = 18; taskTime = 120; }
        else if (currentPlan === "Basic") { totalLimit = 5; taskReward = 33; taskTime = 100; }
        else if (currentPlan === "Standard") { totalLimit = 10; taskReward = 50; taskTime = 80; }
        else if (currentPlan === "Premium") { totalLimit = 15; taskReward = 70; taskTime = 60; }
        else if (currentPlan === "Ultimate") { totalLimit = 25; taskReward = 100; taskTime = 40; }
        
        // UI Text Update
        if(document.getElementById("p-name")) document.getElementById("p-name").innerText = currentPlan + " Plan";
        if(document.getElementById("t-count")) document.getElementById("t-count").innerText = "Tasks: " + tasksDoneToday + "/" + totalLimit;
        
        let vArea = document.getElementById("v-area");
        if (vArea) {
            vArea.innerHTML = `<p id="r-text" style="color: #38bdf8; font-size: 14px; font-weight: bold; margin-bottom: 10px;">Reward: Rs. ${taskReward}</p>
            <iframe src="https://www.youtube.com/embed/ScWrIexB5i4"></iframe>`;
        }
    }
});

// START TASK FUNCTION
function start() {
    if (tasksDoneToday >= totalLimit) {
        alert("Aapki aaj ki task limit khatam ho chuki hai!");
        return;
    }
    
    // 1. Monetag Direct Ad auto-khulega new tab mein
    window.open("https://omg10.com/4/11022523", "_blank");

    // 2. Timer process shuru ho jayega
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

// CLAIM REWARD FUNCTION
function claim() {
    const newBalance = currentBalance + taskReward;
    const newTasksDone = tasksDoneToday + 1;
    
    userRef.update({
        balance: newBalance,
        tasksDone: newTasksDone
    }).then(() => {
        alert("Mubarak ho! Reward aapke balance mein add kar diya gaya hai.");
        if(document.getElementById("c-btn")) document.getElementById("c-btn").style.display = "none";
        if(document.getElementById("s-btn")) document.getElementById("s-btn").style.display = "block";
        if(document.getElementById("timer")) document.getElementById("timer").innerText = "Wait for Start";
    }).catch((error) => {
        alert("Error: " + error.message);
    });
    }
