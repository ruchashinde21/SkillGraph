/* =========================================================
   SKILLGRAPH - MAIN JAVASCRIPT
   Assessment + Dashboard + Roadmap + Skill Learning
   + Project Workspace + Authentication
   ========================================================= */


/* =========================================================
   SKILLGRAPH USER AUTHENTICATION
   ========================================================= */


/* =========================
   USER STORAGE
   ========================= */

function getUsers() {

    const savedUsers =
        localStorage.getItem("skillGraphUsers");

    if (!savedUsers) {
        return [];
    }

    try {

        return JSON.parse(savedUsers);

    } catch (error) {

        console.error(
            "Could not read users:",
            error
        );

        return [];

    }

}


/* =========================
   SAVE USERS
   ========================= */

function saveUsers(users) {

    localStorage.setItem(
        "skillGraphUsers",
        JSON.stringify(users)
    );

}


/* =========================
   CURRENT USER
   ========================= */

function getCurrentUser() {

    const userId =
        localStorage.getItem(
            "skillGraphCurrentUser"
        );

    if (!userId) {
        return null;
    }

    const users =
        getUsers();

    return users.find(
        user => user.id === userId
    ) || null;

}


/* =========================
   SET CURRENT USER
   ========================= */

function setCurrentUser(userId) {

    localStorage.setItem(
        "skillGraphCurrentUser",
        userId
    );

}


/* =========================================================
   USER DATA HELPERS
   ========================================================= */


/* =========================
   UPDATE CURRENT USER
   ========================= */

function updateCurrentUser(callback) {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return null;
    }

    const users =
        getUsers();

    const userIndex =
        users.findIndex(
            user =>
                user.id === currentUser.id
        );

    if (userIndex === -1) {
        return null;
    }

    callback(
        users[userIndex]
    );

    saveUsers(users);

    return users[userIndex];

}


/* =========================
   GET USER PROFILE
   ========================= */

function getUserProfile() {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return null;
    }

    return currentUser.profile || null;

}


/* =========================
   SAVE USER PROFILE
   ========================= */

function saveUserProfile(profile) {

    updateCurrentUser(user => {

        user.profile = profile;

    });

}


/* =========================
   GET COMPLETED SKILLS
   ========================= */

function getCompletedSkills() {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return [];
    }

    return currentUser.completedSkills || [];

}


/* =========================
   SAVE COMPLETED SKILLS
   ========================= */

function saveCompletedSkills(
    completedSkills
) {

    updateCurrentUser(user => {

        user.completedSkills =
            [...new Set(completedSkills)];

    });

}


/* =========================
   GET PROJECT PROGRESS
   ========================= */

function getProjectProgress(
    skillName
) {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return [];
    }

    const progress =
        currentUser.projectProgress || {};

    return progress[skillName] || [];

}


/* =========================
   SAVE PROJECT PROGRESS
   ========================= */

function saveProjectProgress(
    skillName,
    completedTasks
) {

    updateCurrentUser(user => {

        if (!user.projectProgress) {

            user.projectProgress = {};

        }

        user.projectProgress[skillName] =
            [...new Set(completedTasks)];

    });

}


/* =========================
   GET COMPLETED PROJECTS
   ========================= */

function getCompletedProjects() {

    const currentUser =
        getCurrentUser();

    if (!currentUser) {
        return [];
    }

    return currentUser.completedProjects || [];

}


/* =========================
   SAVE COMPLETED PROJECTS
   ========================= */

function saveCompletedProjects(
    projects
) {

    updateCurrentUser(user => {

        user.completedProjects =
            [...new Set(projects)];

    });

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    localStorage.removeItem(
        "skillGraphCurrentUser"
    );

    window.location.href =
        "login.html";

}


/* =========================================================
   USER PROFILE
   ========================================================= */

const userProfile = {

    career: "",

    skills: [],

    skillLevels: {},

    experience: "",

    learningTime: ""

};


/* =========================================================
   ASSESSMENT VARIABLES
   ========================================================= */

let currentStep = 1;

const totalSteps = 5;


/* =========================================================
   CAREER REQUIREMENTS
   ========================================================= */

const careerRequirements = {

    "Web Development": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Git"
    ],

    "AI / ML": [
        "Python",
        "SQL",
        "Git",
        "Machine Learning",
        "Statistics",
        "TensorFlow"
    ],

    "Cybersecurity": [
        "Python",
        "Linux",
        "Networking",
        "Git",
        "Cryptography",
        "Ethical Hacking"
    ],

    "Data Science": [
        "Python",
        "SQL",
        "Statistics",
        "Pandas",
        "NumPy",
        "Machine Learning"
    ],

    "Cloud Computing": [
        "Linux",
        "Git",
        "Docker",
        "AWS",
        "Networking",
        "Kubernetes"
    ],

    "Software Development": [
        "Python",
        "Java",
        "SQL",
        "Git",
        "Data Structures",
        "Algorithms"
    ]

};


/* =========================================================
   ASSESSMENT PAGE
   ========================================================= */

const assessmentContainer =
    document.querySelector(
        ".assessment-container"
    );

if (assessmentContainer) {

    initializeAssessment();

}


/* =========================================================
   INITIALIZE ASSESSMENT
   ========================================================= */

function initializeAssessment() {

    showStep(currentStep);

    setupCareerCards();

    setupExperienceCards();

    setupTimeCards();

    const nextButton =
        document.getElementById(
            "nextBtn"
        );

    const backButton =
        document.getElementById(
            "backBtn"
        );

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            handleNext
        );

    }

    if (backButton) {

        backButton.addEventListener(
            "click",
            handleBack
        );

    }

}


/* =========================================================
   CAREER SELECTION
   ========================================================= */

function setupCareerCards() {

    const careerCards =
        document.querySelectorAll(
            ".career-card"
        );

    careerCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                careerCards.forEach(c => {

                    c.classList.remove(
                        "selected"
                    );

                });

                card.classList.add(
                    "selected"
                );

                userProfile.career =
                    card.dataset.career ||
                    card.innerText.trim();

            }
        );

    });

}


/* =========================================================
   EXPERIENCE SELECTION
   ========================================================= */

function setupExperienceCards() {

    const cards =
        document.querySelectorAll(
            ".experience-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                cards.forEach(c => {

                    c.classList.remove(
                        "selected"
                    );

                });

                card.classList.add(
                    "selected"
                );

                userProfile.experience =
                    card.dataset.experience ||
                    card.innerText.trim();

            }
        );

    });

}


/* =========================================================
   LEARNING TIME SELECTION
   ========================================================= */

function setupTimeCards() {

    const cards =
        document.querySelectorAll(
            ".time-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                cards.forEach(c => {

                    c.classList.remove(
                        "selected"
                    );

                });

                card.classList.add(
                    "selected"
                );

                userProfile.learningTime =
                    card.dataset.time ||
                    card.innerText.trim();

            }
        );

    });

}


/* =========================================================
   GET SELECTED SKILLS
   ========================================================= */

function getSelectedSkills() {

    const selectedSkills = [];

    const checkboxes =
        document.querySelectorAll(
            '#step2 input[type="checkbox"]:checked'
        );

    checkboxes.forEach(checkbox => {

        const skill =
            checkbox.value ||
            checkbox.dataset.skill ||
            checkbox.parentElement.innerText.trim();

        selectedSkills.push(skill);

    });

    return selectedSkills;

}


/* =========================================================
   GENERATE SKILL LEVELS
   ========================================================= */

function generateSkillLevels() {

    const skillContainer =
        document.getElementById(
            "skillLevels"
        );

    if (!skillContainer) {
        return;
    }

    skillContainer.innerHTML = "";

    userProfile.skills.forEach(skill => {

        const skillBox =
            document.createElement(
                "div"
            );

        skillBox.className =
            "skill-level-box";

        skillBox.innerHTML = `

            <div class="skill-level-name">

                <strong>
                    ${skill}
                </strong>

            </div>

            <div class="level-buttons">

                <button
                    type="button"
                    class="level-btn"
                    data-skill="${skill}"
                    data-level="Beginner">

                    Beginner

                </button>

                <button
                    type="button"
                    class="level-btn"
                    data-skill="${skill}"
                    data-level="Intermediate">

                    Intermediate

                </button>

                <button
                    type="button"
                    class="level-btn"
                    data-skill="${skill}"
                    data-level="Advanced">

                    Advanced

                </button>

            </div>

        `;

        skillContainer.appendChild(
            skillBox
        );

    });

    addLevelListeners();

}


/* =========================================================
   LEVEL BUTTON LISTENERS
   ========================================================= */

function addLevelListeners() {

    const levelButtons =
        document.querySelectorAll(
            ".level-btn"
        );

    levelButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const skill =
                    button.dataset.skill;

                const level =
                    button.dataset.level;

                const buttonsForSkill =
                    document.querySelectorAll(
                        `.level-btn[data-skill="${skill}"]`
                    );

                buttonsForSkill.forEach(
                    btn => {

                        btn.classList.remove(
                            "selected"
                        );

                    }
                );

                button.classList.add(
                    "selected"
                );

                userProfile.skillLevels[
                    skill
                ] = level;

            }
        );

    });

}


/* =========================================================
   VALIDATE CURRENT STEP
   ========================================================= */

function validateStep() {

    /* STEP 1 */

    if (currentStep === 1) {

        if (!userProfile.career) {

            alert(
                "Please select your career goal."
            );

            return false;

        }

    }


    /* STEP 2 */

    if (currentStep === 2) {

        userProfile.skills =
            getSelectedSkills();

        if (
            userProfile.skills.length === 0
        ) {

            alert(
                "Please select at least one skill."
            );

            return false;

        }

        generateSkillLevels();

    }


    /* STEP 3 */

    if (currentStep === 3) {

        if (
            userProfile.skills.length === 0
        ) {

            alert(
                "Please select at least one skill."
            );

            return false;

        }

        for (
            const skill of userProfile.skills
        ) {

            if (
                !userProfile.skillLevels[
                    skill
                ]
            ) {

                alert(
                    `Please select a proficiency level for ${skill}.`
                );

                return false;

            }

        }

    }


    /* STEP 4 */

    if (currentStep === 4) {

        if (!userProfile.experience) {

            alert(
                "Please select your experience level."
            );

            return false;

        }

    }


    /* STEP 5 */

    if (currentStep === 5) {

        if (!userProfile.learningTime) {

            alert(
                "Please select your weekly learning time."
            );

            return false;

        }

    }

    return true;

}


/* =========================================================
   SHOW STEP
   ========================================================= */

function showStep(step) {

    const steps =
        document.querySelectorAll(
            ".step"
        );

    steps.forEach(
        (element, index) => {

            element.style.display =
                index === step - 1
                    ? "block"
                    : "none";

        }
    );


    const stepText =
        document.getElementById(
            "stepText"
        );

    if (stepText) {

        stepText.innerText =
            `Step ${step} of ${totalSteps}`;

    }


    const progressPercent =
        document.getElementById(
            "progressPercent"
        );

    const percentage =
        Math.round(
            (step / totalSteps) * 100
        );

    if (progressPercent) {

        progressPercent.innerText =
            `${percentage}%`;

    }


    const progressFill =
        document.getElementById(
            "progressFill"
        );

    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    const backButton =
        document.getElementById(
            "backBtn"
        );

    const nextButton =
        document.getElementById(
            "nextBtn"
        );


    if (backButton) {

        backButton.style.display =
            step === 1
                ? "none"
                : "inline-block";

    }


    if (nextButton) {

        nextButton.innerText =
            step === totalSteps
                ? "Generate My Roadmap →"
                : "Continue →";

    }

}


/* =========================================================
   NEXT BUTTON
   ========================================================= */

function handleNext() {

    if (!validateStep()) {
        return;
    }


    if (currentStep === 2) {

        userProfile.skills =
            getSelectedSkills();

        generateSkillLevels();

    }


    if (
        currentStep < totalSteps
    ) {

        currentStep++;

        showStep(
            currentStep
        );

    } else {

        saveProfile();

    }

}


/* =========================================================
   BACK BUTTON
   ========================================================= */

function handleBack() {

    if (currentStep > 1) {

        currentStep--;

        showStep(
            currentStep
        );

    }

}


/* =========================================================
   SAVE PROFILE
   ========================================================= */

function saveProfile() {

    const profile = {

        career:
            userProfile.career,

        skills:
            [...userProfile.skills],

        skillLevels:
            {...userProfile.skillLevels},

        experience:
            userProfile.experience,

        learningTime:
            userProfile.learningTime

    };


    const currentUser =
        getCurrentUser();

    if (!currentUser) {

        alert(
            "Please login before completing the assessment."
        );

        window.location.href =
            "login.html";

        return;

    }


    /*
       Save profile to the current user.
    */

    saveUserProfile(
        profile
    );


    /*
       New assessment means
       new roadmap and project progress.
    */

    updateCurrentUser(user => {

        user.completedSkills = [];

        user.projectProgress = {};

        user.completedProjects = [];

    });


    window.location.href =
        "dashboard.html";

}


/* =========================================================
   DASHBOARD
   ========================================================= */

const dashboard =
    document.querySelector(
        ".dashboard"
    );

if (dashboard) {

    loadDashboard();

}


/* =========================================================
   LOAD DASHBOARD
   ========================================================= */

function loadDashboard() {

    const profile =
        getUserProfile();

    if (
        !profile ||
        !profile.career
    ) {

        alert(
            "Please complete your assessment first."
        );

        window.location.href =
            "assessment.html";

        return;

    }


    /* CAREER */

    const careerGoal =
        document.getElementById(
            "careerGoal"
        );

    if (careerGoal) {

        careerGoal.innerText =
            profile.career ||
            "Not selected";

    }


    /* SKILL COUNT */

    const skillCount =
        document.getElementById(
            "skillCount"
        );

    if (skillCount) {

        skillCount.innerText =
            profile.skills.length;

    }


    /* READINESS */

    const readiness =
        calculateReadiness(
            profile
        );


    const readinessScore =
        document.getElementById(
            "readinessScore"
        );

    if (readinessScore) {

        readinessScore.innerText =
            `${readiness}%`;

    }


    const readinessBar =
        document.getElementById(
            "readinessBar"
        );

    if (readinessBar) {

        readinessBar.style.width =
            `${readiness}%`;

    }


    /* SKILLS */

    renderSkills(
        profile
    );


    /* GAPS */

    const gaps =
        generateSkillGaps(
            profile
        );

    renderSkillGaps(
        gaps
    );


    /* GRAPH */

    generateSkillGraph(
        profile
    );


    /* NEXT STEP */

    generateNextStep(
        profile
    );


    /* ROADMAP BUTTON */

    const roadmapButton =
        document.getElementById(
            "roadmapBtn"
        );

    if (roadmapButton) {

        roadmapButton.onclick =
            function () {

                window.location.href =
                    "roadmap.html";

            };

    }

}


/* =========================================================
   READINESS CALCULATION
   ========================================================= */

function calculateReadiness(
    profile
) {

    if (
        !profile.skills ||
        profile.skills.length === 0
    ) {

        return 0;

    }


    const levelValues = {

        "Beginner": 35,

        "Intermediate": 65,

        "Advanced": 90

    };


    let total = 0;


    profile.skills.forEach(
        skill => {

            const level =
                profile.skillLevels[
                    skill
                ];

            total +=
                levelValues[level] || 0;

        }
    );


    const average =
        total /
        profile.skills.length;


    return Math.round(
        average
    );

}


/* =========================================================
   RENDER USER SKILLS
   ========================================================= */

function renderSkills(
    profile
) {

    const skillList =
        document.getElementById(
            "skillList"
        );

    if (!skillList) {
        return;
    }


    skillList.innerHTML = "";


    profile.skills.forEach(
        skill => {

            const level =
                profile.skillLevels[
                    skill
                ] ||
                "Not specified";


            const skillItem =
                document.createElement(
                    "a"
                );


            skillItem.className =
                "dashboard-skill";


            skillItem.href =
                "skill.html?skill=" +
                encodeURIComponent(
                    skill
                );


            skillItem.innerHTML = `

                <div class="skill-info">

                    <span>
                        ${skill}
                    </span>

                    <span class="skill-level">
                        ${level}
                    </span>

                </div>

                <div class="skill-progress">

                    <div
                        class="skill-progress-fill"
                        style="width:${getLevelPercentage(level)}%">
                    </div>

                </div>

                <span class="skill-view">
                    Learn ${skill} →
                </span>

            `;


            skillList.appendChild(
                skillItem
            );

        }
    );

}


/* =========================================================
   LEVEL PERCENTAGE
   ========================================================= */

function getLevelPercentage(
    level
) {

    if (level === "Beginner") {
        return 35;
    }

    if (level === "Intermediate") {
        return 65;
    }

    if (level === "Advanced") {
        return 90;
    }

    return 0;

}


/* =========================================================
   GENERATE SKILL GAPS
   ========================================================= */

function generateSkillGaps(
    profile
) {

    const requiredSkills =
        careerRequirements[
            profile.career
        ] || [];


    const userSkills =
        profile.skills || [];


    const missingSkills =
        requiredSkills.filter(
            skill =>
                !userSkills.includes(
                    skill
                )
        );


    return missingSkills.map(
        (
            skill,
            index
        ) => {

            return {

                skill: skill,

                priority:
                    index < 2
                        ? "High Priority"
                        : "Medium Priority"

            };

        }
    );

}


/* =========================================================
   RENDER SKILL GAPS
   ========================================================= */

function renderSkillGaps(
    gaps
) {

    const gapList =
        document.getElementById(
            "gapList"
        );

    const gapCount =
        document.getElementById(
            "gapCount"
        );


    if (gapCount) {

        gapCount.innerText =
            gaps.length;

    }


    if (!gapList) {
        return;
    }


    gapList.innerHTML = "";


    if (gaps.length === 0) {

        gapList.innerHTML = `

            <div class="no-gaps">

                🎉 Great job!

                <br>

                You currently have no major
                skill gaps for your selected career.

            </div>

        `;

        return;

    }


    gaps.forEach(
        gap => {

            const gapItem =
                document.createElement(
                    "div"
                );


            gapItem.className =
                "gap-item";


            gapItem.innerHTML = `

                <div>

                    <strong>
                        ${gap.skill}
                    </strong>

                    <p>
                        Recommended for
                        ${getCareerName()}
                    </p>

                </div>

                <span class="priority">
                    ${gap.priority}
                </span>

            `;


            gapList.appendChild(
                gapItem
            );

        }
    );

}


/* =========================================================
   GET CAREER NAME
   ========================================================= */

function getCareerName() {

    const profile =
        getUserProfile();

    if (!profile) {

        return "your career";

    }

    return profile.career ||
        "your career";

}


/* =========================================================
   SKILL GRAPH
   ========================================================= */

function generateSkillGraph(
    profile
) {

    const graph =
        document.getElementById(
            "skillGraph"
        );


    if (!graph) {
        return;
    }


    graph.innerHTML = "";


    if (
        !profile.skills ||
        profile.skills.length === 0
    ) {

        graph.innerHTML =
            "<p>No skills available.</p>";

        return;

    }


    profile.skills.forEach(
        (
            skill,
            index
        ) => {

            const node =
                document.createElement(
                    "div"
                );


            node.className =
                "graph-node";


            node.innerHTML = `

                <strong>
                    ${skill}
                </strong>

                <span>

                    ${
                        profile.skillLevels[
                            skill
                        ] ||
                        "Not specified"
                    }

                </span>

            `;


            const angle =
                (
                    360 /
                    profile.skills.length
                ) *
                index;


            const radius = 165;


            const x =
                Math.cos(
                    angle *
                    Math.PI /
                    180
                ) *
                radius;


            const y =
                Math.sin(
                    angle *
                    Math.PI /
                    180
                ) *
                radius;


            node.style.transform =
                `translate(${x}px, ${y}px)`;


            graph.appendChild(
                node
            );

        }
    );

}


/* =========================================================
   RECOMMENDED NEXT STEP
   ========================================================= */

function generateNextStep(
    profile
) {

    const nextSkill =
        document.getElementById(
            "nextSkill"
        );

    const description =
        document.getElementById(
            "nextSkillDescription"
        );


    if (!nextSkill) {
        return;
    }


    const gaps =
        generateSkillGaps(
            profile
        );


    if (gaps.length > 0) {

        const firstGap =
            gaps[0];


        nextSkill.innerText =
            `Learn ${firstGap.skill}`;


        if (description) {

            description.innerText =
                `${firstGap.skill} is one of the important skills required for ${profile.career}. Start learning the basics and then build a practical project.`;

        }

    } else {

        nextSkill.innerText =
            "Build a Real-World Project 🚀";


        if (description) {

            description.innerText =
                "You have covered the major required skills. Now strengthen your knowledge by building a practical project.";

        }

    }

}


/* =========================================================
   PROFILE BUTTON
   ========================================================= */

const profileButton =
    document.querySelector(
        ".profile-circle"
    );


if (profileButton) {

    profileButton.addEventListener(
        "click",
        () => {

            const profile =
                getUserProfile();

            if (!profile) {
                return;
            }

            alert(

                `Career: ${profile.career}\n` +

                `Skills: ${profile.skills.length}\n` +

                `Experience: ${profile.experience}\n` +

                `Learning Time: ${profile.learningTime}`

            );

        }
    );

}


/* =========================================================
   HOME LINKS
   ========================================================= */

const homeLinks =
    document.querySelectorAll(
        'a[href="index.html"]'
    );


homeLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                window.location.href =
                    "index.html";

            }
        );

    }
);


/* =========================================================
   ROADMAP PAGE
   ========================================================= */

const roadmapPage =
    document.getElementById(
        "roadmapList"
    );


if (roadmapPage) {

    loadRoadmap();

}


/* =========================================================
   LOAD ROADMAP
   ========================================================= */

function loadRoadmap() {

    const profile =
        getUserProfile();


    if (!profile) {

        window.location.href =
            "assessment.html";

        return;

    }


    const requiredSkills =
        careerRequirements[
            profile.career
        ] || [];


    const userSkills =
        profile.skills || [];


    const missingSkills =
        requiredSkills.filter(
            skill =>
                !userSkills.includes(
                    skill
                )
        );


    /* TITLE */

    const title =
        document.getElementById(
            "roadmapTitle"
        );


    const subtitle =
        document.getElementById(
            "roadmapSubtitle"
        );


    if (title) {

        title.innerText =
            `${profile.career} Roadmap`;

    }


    if (subtitle) {

        subtitle.innerText =
            `A personalized learning path based on your current skills and your goal of becoming a ${profile.career} professional.`;

    }


    /* NO MISSING SKILLS */

    if (
        missingSkills.length === 0
    ) {

        createCompletedRoadmap(
            profile
        );

        return;

    }


    /* CREATE ROADMAP */

    const roadmap =
        document.getElementById(
            "roadmapList"
        );


    if (!roadmap) {
        return;
    }


    roadmap.innerHTML = "";


    missingSkills.forEach(
        (
            skill,
            index
        ) => {

            const priority =
                index < 2
                    ? "High Priority"
                    : "Recommended";


            const card =
                createRoadmapCard(
                    skill,
                    index + 1,
                    priority
                );


            roadmap.appendChild(
                card
            );

        }
    );


    updateRoadmapProgress();

    updateNextRoadmapSkill();

}


/* =========================================================
   CREATE ROADMAP CARD
   ========================================================= */

function createRoadmapCard(
    skill,
    number,
    priority
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "roadmap-item";


    const completed =
        getCompletedSkills();


    const isCompleted =
        completed.includes(
            skill
        );


    item.innerHTML = `

        <div class="roadmap-number">
            ${number}
        </div>

        <div class="roadmap-card ${
            isCompleted
                ? "completed"
                : ""
        }">

            <div class="roadmap-card-header">

                <div>

                    <h2 class="roadmap-skill-title">
                        ${skill}
                    </h2>

                    <p style="color:#7f89a5;font-size:13px;">
                        Skill Gap
                    </p>

                </div>

                <span class="roadmap-priority">
                    ${priority}
                </span>

            </div>


            <p class="roadmap-description">

                Build a strong foundation in
                ${skill} and apply it through
                practical work.

            </p>


            <div class="roadmap-stages">

                <div class="roadmap-stage">

                    <span>LEARN</span>

                    <p>
                        Understand the fundamentals,
                        concepts and important terminology.
                    </p>

                </div>


                <div class="roadmap-stage">

                    <span>PRACTICE</span>

                    <p>
                        Solve exercises and small
                        practical problems.
                    </p>

                </div>


                <div class="roadmap-stage">

                    <span>BUILD</span>

                    <p>
                        Create a small real-world
                        project using this skill.
                    </p>

                </div>

            </div>


            <button
                class="complete-btn"
                onclick="toggleRoadmapSkill('${skill}')">

                ${
                    isCompleted
                        ? "✓ Completed"
                        : "Mark as Complete"
                }

            </button>

        </div>

    `;


    return item;

}


/* =========================================================
   TOGGLE ROADMAP COMPLETION
   ========================================================= */

function toggleRoadmapSkill(
    skill
) {

    let completed =
        getCompletedSkills();


    if (
        completed.includes(skill)
    ) {

        completed =
            completed.filter(
                item =>
                    item !== skill
            );

    } else {

        completed.push(
            skill
        );

    }


    saveCompletedSkills(
        completed
    );


    loadRoadmap();

}


/* =========================================================
   UPDATE ROADMAP PROGRESS
   ========================================================= */

function updateRoadmapProgress() {

    const profile =
        getUserProfile();

    if (!profile) {
        return;
    }


    const requiredSkills =
        careerRequirements[
            profile.career
        ] || [];


    const userSkills =
        profile.skills || [];


    const missingSkills =
        requiredSkills.filter(
            skill =>
                !userSkills.includes(
                    skill
                )
        );


    const completed =
        getCompletedSkills();


    const completedRoadmapSkills =
        missingSkills.filter(
            skill =>
                completed.includes(
                    skill
                )
        );


    let percentage = 0;


    if (
        missingSkills.length > 0
    ) {

        percentage =
            Math.round(

                (
                    completedRoadmapSkills.length /
                    missingSkills.length

                ) * 100

            );

    }


    const fill =
        document.getElementById(
            "roadmapProgressFill"
        );


    if (fill) {

        fill.style.width =
            `${percentage}%`;

    }


    const percentageText =
        document.getElementById(
            "progressPercentage"
        );


    if (percentageText) {

        percentageText.innerText =
            `${percentage}%`;

    }


    const progressText =
        document.getElementById(
            "progressText"
        );


    if (progressText) {

        progressText.innerText =
            `${percentage}% completed`;

    }

}


/* =========================================================
   UPDATE NEXT ROADMAP SKILL
   ========================================================= */

function updateNextRoadmapSkill() {

    const profile =
        getUserProfile();


    if (!profile) {
        return;
    }


    const requiredSkills =
        careerRequirements[
            profile.career
        ] || [];


    const userSkills =
        profile.skills || [];


    const missingSkills =
        requiredSkills.filter(
            skill =>
                !userSkills.includes(
                    skill
                )
        );


    const completed =
        getCompletedSkills();


    const nextSkill =
        missingSkills.find(
            skill =>
                !completed.includes(
                    skill
                )
        );


    const title =
        document.getElementById(
            "nextRoadmapSkill"
        );


    const description =
        document.getElementById(
            "nextRoadmapDescription"
        );


    const button =
        document.getElementById(
            "nextSkillBtn"
        );


    /* ROADMAP COMPLETE */

    if (!nextSkill) {

        if (title) {

            title.innerText =
                "Roadmap Completed 🎉";

        }


        if (description) {

            description.innerText =
                "You have completed all the recommended skill gaps. Now build a strong portfolio project.";

        }


        if (button) {

            button.innerText =
                "Roadmap Completed ✓";

            button.disabled =
                true;

            button.onclick =
                null;

        }

        return;

    }


    /* NEXT SKILL */

    if (title) {

        title.innerText =
            `Learn ${nextSkill}`;

    }


    if (description) {

        description.innerText =
            `Start with the fundamentals of ${nextSkill}, practice the concepts and then build a small project.`;

    }


    if (button) {

        button.disabled =
            false;

        button.innerText =
            "Start Learning →";


        button.onclick =
            function () {

                window.location.href =
                    `skill.html?skill=${encodeURIComponent(
                        nextSkill
                    )}`;

            };

    }

}


/* =========================================================
   NO SKILL GAPS
   ========================================================= */

function createCompletedRoadmap(
    profile
) {

    const roadmap =
        document.getElementById(
            "roadmapList"
        );


    if (!roadmap) {
        return;
    }


    roadmap.innerHTML = `

        <div
            class="roadmap-card"
            style="text-align:center;"
        >

            <h2>
                🎉 You're Already Well Prepared!
            </h2>

            <p class="roadmap-description">

                Your current skills cover the major
                requirements for ${profile.career}.

                <br><br>

                The next step is to build real-world
                projects and create a strong portfolio.

            </p>

        </div>

    `;


    const fill =
        document.getElementById(
            "roadmapProgressFill"
        );


    const percentage =
        document.getElementById(
            "progressPercentage"
        );


    const text =
        document.getElementById(
            "progressText"
        );


    if (fill) {

        fill.style.width =
            "100%";

    }


    if (percentage) {

        percentage.innerText =
            "100%";

    }


    if (text) {

        text.innerText =
            "100% completed";

    }


    const nextTitle =
        document.getElementById(
            "nextRoadmapSkill"
        );


    const nextDescription =
        document.getElementById(
            "nextRoadmapDescription"
        );


    const nextButton =
        document.getElementById(
            "nextSkillBtn"
        );


    if (nextTitle) {

        nextTitle.innerText =
            "Build a Real-World Project 🚀";

    }


    if (nextDescription) {

        nextDescription.innerText =
            "You already cover the major skills. Now strengthen your portfolio by building a practical project.";

    }


    if (nextButton) {

        nextButton.innerText =
            "View Projects →";

        nextButton.disabled =
            false;

        nextButton.onclick =
            function () {

                alert(
                    "Project recommendations will be added here."
                );

            };

    }

}


/* =========================================================
   SKILL DATA
   ========================================================= */

const skillData = {

    "HTML": {

        description:
            "Learn how to structure modern web pages using HTML and build a strong foundation for web development.",

        concepts: [

            {
                name:
                    "HTML Fundamentals",

                description:
                    "Understand HTML, tags, elements and the basic structure of a webpage.",

                resource: {

                    title:
                        "MDN HTML Introduction",

                    description:
                        "Learn the basics of HTML and how webpages are structured.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content"

                }

            },

            {
                name:
                    "HTML Document Structure",

                description:
                    "Learn DOCTYPE, html, head, body, title and the basic page structure.",

                resource: {

                    title:
                        "HTML Document Structure",

                    description:
                        "Understand the standard structure of an HTML document.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax"

                }

            },

            {
                name:
                    "Text and Headings",

                description:
                    "Learn headings, paragraphs, lists and text formatting elements.",

                resource: {

                    title:
                        "HTML Text Fundamentals",

                    description:
                        "Learn how to organize text and headings in HTML.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax"

                }

            },

            {
                name:
                    "Links and Images",

                description:
                    "Learn how to add hyperlinks and images to webpages.",

                resource: {

                    title:
                        "HTML Links and Images",

                    description:
                        "Learn how to create links and add images to webpages.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images"

                }

            },

            {
                name:
                    "HTML Forms",

                description:
                    "Understand forms, inputs, buttons, labels and form controls.",

                resource: {

                    title:
                        "HTML Forms",

                    description:
                        "Learn how to create interactive forms using HTML.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms"

                }

            },

            {
                name:
                    "Semantic HTML",

                description:
                    "Learn semantic elements such as header, nav, section, article and footer.",

                resource: {

                    title:
                        "Semantic HTML",

                    description:
                        "Learn how semantic HTML improves structure and accessibility.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Glossary/Semantics"

                }

            }

        ],

        practice: [

            "Create a personal portfolio webpage.",

            "Create a registration form.",

            "Build a webpage using semantic HTML.",

            "Add images and navigation links."

        ],

        project: {

            title:
                "Personal Portfolio Website",

            description:
                "Build a responsive portfolio website containing your introduction, skills, projects and contact form.",

            technologies: [

                "HTML",

                "CSS",

                "JavaScript"

            ],

            tasks: [

                "Create the basic HTML page structure.",

                "Create the navigation bar.",

                "Add an introduction section.",

                "Add a skills section.",

                "Add a projects section.",

                "Create a contact form.",

                "Style the website using CSS.",

                "Make the website responsive.",

                "Test the website on different screen sizes."

            ]

        }

    },


    "CSS": {

        description:
            "Learn how to design and style modern responsive websites using CSS.",

        concepts: [

            {
                name:
                    "CSS Fundamentals",

                description:
                    "Understand selectors, properties, values and how CSS styles HTML elements.",

                resource: {

                    title:
                        "MDN CSS Basics",

                    description:
                        "Learn the fundamentals of CSS styling.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics"

                }

            },

            {
                name:
                    "Selectors",

                description:
                    "Learn element, class, ID, attribute and pseudo-class selectors.",

                resource: {

                    title:
                        "CSS Selectors",

                    description:
                        "Understand how CSS selects HTML elements.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors"

                }

            },

            {
                name:
                    "Box Model",

                description:
                    "Understand margin, border, padding and content dimensions.",

                resource: {

                    title:
                        "CSS Box Model",

                    description:
                        "Learn how the CSS box model controls element size and spacing.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model"

                }

            },

            {
                name:
                    "Flexbox",

                description:
                    "Learn how to arrange and align elements using CSS Flexbox.",

                resource: {

                    title:
                        "CSS Flexbox",

                    description:
                        "Learn how to create flexible layouts using Flexbox.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox"

                }

            },

            {
                name:
                    "CSS Grid",

                description:
                    "Learn how to create two-dimensional layouts using CSS Grid.",

                resource: {

                    title:
                        "CSS Grid",

                    description:
                        "Learn modern grid-based webpage layouts.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids"

                }

            },

            {
                name:
                    "Responsive Design",

                description:
                    "Learn media queries and techniques for creating mobile-friendly websites.",

                resource: {

                    title:
                        "Responsive Web Design",

                    description:
                        "Learn how to make websites work across different screen sizes.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design"

                }

            }

        ],

        practice: [

            "Create a responsive navigation bar.",

            "Build a Flexbox card layout.",

            "Create a CSS Grid dashboard.",

            "Make a webpage responsive using media queries."

        ],

        project: {

            title:
                "Responsive Landing Page",

            description:
                "Build a modern responsive landing page using Flexbox, Grid, animations and media queries.",

            technologies: [

                "HTML",

                "CSS"

            ],

            tasks: [

                "Create the landing page structure.",

                "Create the navigation section.",

                "Design the hero section.",

                "Create feature cards.",

                "Use Flexbox for layout.",

                "Use CSS Grid for sections.",

                "Add hover animations.",

                "Add responsive media queries.",

                "Test the page on mobile and desktop."

            ]

        }

    },


    "JavaScript": {

        description:
            "Build strong JavaScript fundamentals and learn how to create interactive web applications.",

        concepts: [

            {
                name:
                    "Variables and Data Types",

                description:
                    "Learn variables, constants and JavaScript data types.",

                resource: {

                    title:
                        "JavaScript Variables",

                    description:
                        "Learn how JavaScript stores and works with data.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables"

                }

            },

            {
                name:
                    "Functions",

                description:
                    "Learn how to create reusable blocks of JavaScript code.",

                resource: {

                    title:
                        "JavaScript Functions",

                    description:
                        "Understand function declaration, parameters and return values.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"

                }

            },

            {
                name:
                    "Arrays and Objects",

                description:
                    "Learn how to store and organize multiple values using arrays and objects.",

                resource: {

                    title:
                        "JavaScript Data Structures",

                    description:
                        "Learn arrays, objects and common data structures.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"

                }

            },

            {
                name:
                    "DOM Manipulation",

                description:
                    "Learn how JavaScript interacts with HTML elements through the DOM.",

                resource: {

                    title:
                        "DOM Introduction",

                    description:
                        "Learn how JavaScript can modify webpage content and structure.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"

                }

            },

            {
                name:
                    "Events",

                description:
                    "Learn how to respond to clicks, keyboard actions and other user interactions.",

                resource: {

                    title:
                        "JavaScript Events",

                    description:
                        "Learn how to handle user interactions using events.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events"

                }

            },

            {
                name:
                    "ES6 Features",

                description:
                    "Learn modern JavaScript features such as let, const, arrow functions and template literals.",

                resource: {

                    title:
                        "JavaScript Guide",

                    description:
                        "Explore modern JavaScript syntax and features.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"

                }

            },

            {
                name:
                    "Async JavaScript",

                description:
                    "Understand promises, async/await and asynchronous programming.",

                resource: {

                    title:
                        "Async JavaScript",

                    description:
                        "Learn promises and asynchronous JavaScript.",

                    url:
                        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS"

                }

            }

        ],

        practice: [

            "Create a calculator using JavaScript.",

            "Build a dynamic to-do list.",

            "Create an interactive form.",

            "Fetch data from a public API."

        ],

        project: {

            title:
                "Interactive Expense Tracker",

            description:
                "Build an expense tracker that allows users to add expenses, delete them and calculate total spending.",

            technologies: [

                "HTML",

                "CSS",

                "JavaScript"

            ],

            tasks: [

                "Create the HTML structure.",

                "Design the expense tracker interface.",

                "Create an input form for expenses.",

                "Add functionality to add expenses.",

                "Display expenses dynamically.",

                "Add functionality to delete expenses.",

                "Calculate the total spending.",

                "Store expense data using JavaScript.",

                "Test the complete application."

            ]

        }

    },


    "React": {

        description:
            "Learn how to build modern interactive user interfaces using React.",

        concepts: [

            {
                name:
                    "React Fundamentals",

                description:
                    "Understand React, components and the basic React application structure.",

                resource: {

                    title:
                        "React Learn",

                    description:
                        "Learn React fundamentals from the official documentation.",

                    url:
                        "https://react.dev/learn"

                }

            },

            {
                name:
                    "Components",

                description:
                    "Learn how to create reusable UI components.",

                resource: {

                    title:
                        "React Components",

                    description:
                        "Learn how React components work.",

                    url:
                        "https://react.dev/learn/your-first-component"

                }

            },

            {
                name:
                    "JSX",

                description:
                    "Learn how JSX allows HTML-like syntax inside JavaScript.",

                resource: {

                    title:
                        "Writing Markup with JSX",

                    description:
                        "Learn how to write JSX in React.",

                    url:
                        "https://react.dev/learn/writing-markup-with-jsx"

                }

            },

            {
                name:
                    "Props and State",

                description:
                    "Learn how components receive data and manage changing information.",

                resource: {

                    title:
                        "React State",

                    description:
                        "Understand props and state in React.",

                    url:
                        "https://react.dev/learn/state-a-components-memory"

                }

            },

            {
                name:
                    "Event Handling",

                description:
                    "Learn how React handles user interactions and events.",

                resource: {

                    title:
                        "Responding to Events",

                    description:
                        "Learn how to handle events in React.",

                    url:
                        "https://react.dev/learn/responding-to-events"

                }

            },

            {
                name:
                    "React Hooks",

                description:
                    "Learn useState, useEffect and other important React Hooks.",

                resource: {

                    title:
                        "React Hooks",

                    description:
                        "Learn how to use Hooks in React applications.",

                    url:
                        "https://react.dev/reference/react"

                }

            },

            {
                name:
                    "Conditional Rendering",

                description:
                    "Learn how to display different UI based on application state.",

                resource: {

                    title:
                        "Conditional Rendering",

                    description:
                        "Learn different ways to conditionally render React components.",

                    url:
                        "https://react.dev/learn/conditional-rendering"

                }

            },

            {
                name:
                    "React Router",

                description:
                    "Learn how to create multiple routes and pages in React applications.",

                resource: {

                    title:
                        "React Router",

                    description:
                        "Learn routing concepts for React applications.",

                    url:
                        "https://reactrouter.com/home"

                }

            }

        ],

        practice: [

            "Create a reusable React component.",

            "Build a counter using useState.",

            "Create a React form.",

            "Build a small task management application."

        ],

        project: {

            title:
                "React Task Manager",

            description:
                "Build a task management application where users can add, delete and complete tasks.",

            technologies: [

                "React",

                "JavaScript",

                "CSS"

            ],

            tasks: [

                "Create a new React project.",

                "Design the task manager interface.",

                "Create a component for displaying tasks.",

                "Add functionality to create new tasks.",

                "Add functionality to delete tasks.",

                "Add functionality to mark tasks as completed.",

                "Store and manage task data using React state.",

                "Test the complete application."

            ]

        }

    },


    "Node.js": {

        description:
            "Learn how to build backend applications and REST APIs using Node.js.",

        concepts: [

            {
                name:
                    "Node.js Fundamentals",

                description:
                    "Understand Node.js and how JavaScript runs outside the browser.",

                resource: {

                    title:
                        "Node.js Learn",

                    description:
                        "Learn Node.js fundamentals from the official documentation.",

                    url:
                        "https://nodejs.org/en/learn"

                }

            },

            {
                name:
                    "NPM",

                description:
                    "Learn how to manage packages and dependencies using npm.",

                resource: {

                    title:
                        "NPM Documentation",

                    description:
                        "Learn how npm manages JavaScript packages.",

                    url:
                        "https://docs.npmjs.com/"

                }

            },

            {
                name:
                    "Modules",

                description:
                    "Learn how to organize Node.js applications using modules.",

                resource: {

                    title:
                        "Node.js Modules",

                    description:
                        "Learn about modules and importing code in Node.js.",

                    url:
                        "https://nodejs.org/api/modules.html"

                }

            },

            {
                name:
                    "File System",

                description:
                    "Learn how Node.js reads, writes and manages files.",

                resource: {

                    title:
                        "Node.js File System",

                    description:
                        "Learn the fs module and file operations.",

                    url:
                        "https://nodejs.org/api/fs.html"

                }

            },

            {
                name:
                    "HTTP Server",

                description:
                    "Learn how to create basic web servers using Node.js.",

                resource: {

                    title:
                        "Node.js HTTP",

                    description:
                        "Learn how to create HTTP servers with Node.js.",

                    url:
                        "https://nodejs.org/api/http.html"

                }

            },

            {
                name:
                    "Express.js",

                description:
                    "Learn Express.js for building backend applications and APIs.",

                resource: {

                    title:
                        "Express.js Guide",

                    description:
                        "Learn Express.js from the official documentation.",

                    url:
                        "https://expressjs.com/"

                }

            },

            {
                name:
                    "REST APIs",

                description:
                    "Learn how to design and build RESTful APIs.",

                resource: {

                    title:
                        "Express Routing",

                    description:
                        "Learn how routes and API endpoints work with Express.",

                    url:
                        "https://expressjs.com/en/guide/routing.html"

                }

            },

            {
                name:
                    "Middleware",

                description:
                    "Understand middleware and how it processes HTTP requests.",

                resource: {

                    title:
                        "Express Middleware",

                    description:
                        "Learn how middleware works in Express applications.",

                    url:
                        "https://expressjs.com/en/guide/using-middleware.html"

                }

            }

        ],

        practice: [

            "Create a Node.js HTTP server.",

            "Build GET and POST API endpoints.",

            "Create an Express application.",

            "Connect an API to a database."

        ],

        project: {

            title:
                "Student REST API",

            description:
                "Build a REST API that allows users to create, read, update and delete student records.",

            technologies: [

                "Node.js",

                "Express.js",

                "MongoDB"

            ],

            tasks: [

                "Create a new Node.js project.",

                "Initialize the npm project.",

                "Install Express.js.",

                "Create the Express server.",

                "Create student API routes.",

                "Implement GET functionality.",

                "Implement POST functionality.",

                "Implement UPDATE functionality.",

                "Implement DELETE functionality.",

                "Connect the API to MongoDB.",

                "Test all API endpoints."

            ]

        }

    },


    "MongoDB": {

        description:
            "Learn how to store, manage and query application data using MongoDB.",

        concepts: [

            {
                name:
                    "MongoDB Basics",

                description:
                    "Understand MongoDB and how NoSQL databases work.",

                resource: {

                    title:
                        "MongoDB Documentation",

                    description:
                        "Learn MongoDB fundamentals from the official documentation.",

                    url:
                        "https://www.mongodb.com/docs/"

                }

            },

            {
                name:
                    "Databases and Collections",

                description:
                    "Learn how MongoDB organizes databases and collections.",

                resource: {

                    title:
                        "MongoDB Data Model",

                    description:
                        "Understand databases, collections and documents.",

                    url:
                        "https://www.mongodb.com/docs/manual/core/databases-and-collections/"

                }

            },

            {
                name:
                    "Documents",

                description:
                    "Learn how MongoDB stores information using BSON documents.",

                resource: {

                    title:
                        "MongoDB Documents",

                    description:
                        "Learn about MongoDB documents and data structure.",

                    url:
                        "https://www.mongodb.com/docs/manual/core/document/"

                }

            },

            {
                name:
                    "CRUD Operations",

                description:
                    "Learn how to create, read, update and delete MongoDB data.",

                resource: {

                    title:
                        "MongoDB CRUD",

                    description:
                        "Learn CRUD operations in MongoDB.",

                    url:
                        "https://www.mongodb.com/docs/manual/crud/"

                }

            },

            {
                name:
                    "Queries",

                description:
                    "Learn how to search and filter MongoDB documents.",

                resource: {

                    title:
                        "MongoDB Query Documents",

                    description:
                        "Learn how to query MongoDB documents.",

                    url:
                        "https://www.mongodb.com/docs/manual/tutorial/query-documents/"

                }

            },

            {
                name:
                    "Indexes",

                description:
                    "Learn how indexes improve MongoDB query performance.",

                resource: {

                    title:
                        "MongoDB Indexes",

                    description:
                        "Learn how MongoDB indexes improve query performance.",

                    url:
                        "https://www.mongodb.com/docs/manual/indexes/"

                }

            },

            {
                name:
                    "MongoDB Atlas",

                description:
                    "Learn how to use MongoDB Atlas cloud database services.",

                resource: {

                    title:
                        "MongoDB Atlas",

                    description:
                        "Learn how to work with MongoDB Atlas.",

                    url:
                        "https://www.mongodb.com/docs/atlas/"

                }

            }

        ],

        practice: [

            "Create a MongoDB database.",

            "Insert student documents.",

            "Perform CRUD operations.",

            "Write queries using filters."

        ],

        project: {

            title:
                "Student Database API",

            description:
                "Create a database system that stores student information and supports CRUD operations.",

            technologies: [

                "MongoDB",

                "Node.js",

                "Express.js"

            ],

            tasks: [

                "Install or configure MongoDB.",

                "Create a student database.",

                "Create a students collection.",

                "Insert student documents.",

                "Read student documents.",

                "Update student documents.",

                "Delete student documents.",

                "Create useful MongoDB queries.",

                "Create indexes for important fields.",

                "Test all CRUD operations."

            ]

        }

    },


    "Git": {

        description:
            "Learn version control and manage your software projects professionally using Git and GitHub.",

        concepts: [

            {
                name:
                    "Git Basics",

                description:
                    "Understand version control and why Git is used.",

                resource: {

                    title:
                        "Git Documentation",

                    description:
                        "Learn Git fundamentals from the official documentation.",

                    url:
                        "https://git-scm.com/doc"

                }

            },

            {
                name:
                    "Repositories",

                description:
                    "Learn how Git repositories store and track project changes.",

                resource: {

                    title:
                        "Git Repository Basics",

                    description:
                        "Learn how to create and work with Git repositories.",

                    url:
                        "https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository"

                }

            },

            {
                name:
                    "Commits",

                description:
                    "Learn how to save project changes using commits.",

                resource: {

                    title:
                        "Git Commit",

                    description:
                        "Learn how to record changes using Git commits.",

                    url:
                        "https://git-scm.com/docs/git-commit"

                }

            },

            {
                name:
                    "Branches",

                description:
                    "Learn how branches allow developers to work on different versions of a project.",

                resource: {

                    title:
                        "Git Branching",

                    description:
                        "Learn Git branches and basic branching workflows.",

                    url:
                        "https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell"

                }

            },

            {
                name:
                    "Merging",

                description:
                    "Learn how to combine changes from different Git branches.",

                resource: {

                    title:
                        "Git Merge",

                    description:
                        "Learn how to merge branches in Git.",

                    url:
                        "https://git-scm.com/docs/git-merge"

                }

            },

            {
                name:
                    "GitHub",

                description:
                    "Learn how GitHub is used to host and collaborate on Git repositories.",

                resource: {

                    title:
                        "GitHub Skills",

                    description:
                        "Practice GitHub through interactive learning exercises.",

                    url:
                        "https://skills.github.com/"

                }

            },

            {
                name:
                    "Pull Requests",

                description:
                    "Learn how developers propose and review code changes.",

                resource: {

                    title:
                        "GitHub Pull Requests",

                    description:
                        "Learn how pull requests work on GitHub.",

                    url:
                        "https://docs.github.com/en/pull-requests"

                }

            }

        ],

        practice: [

            "Create a Git repository.",

            "Make your first commit.",

            "Create and merge a branch.",

            "Push a project to GitHub."

        ],

        project: {

            title:
                "GitHub Portfolio",

            description:
                "Create and publish a professional developer portfolio using Git and GitHub.",

            technologies: [

                "Git",

                "GitHub",

                "HTML",

                "CSS",

                "JavaScript"

            ],

            tasks: [

                "Create a new portfolio project.",

                "Initialize a Git repository.",

                "Create the project files.",

                "Make the first Git commit.",

                "Create a GitHub repository.",

                "Connect the local repository to GitHub.",

                "Push the project to GitHub.",

                "Create a project branch.",

                "Make changes and commit them.",

                "Merge the branch.",

                "Publish the final portfolio."

            ]

        }

    }

};


/* =========================================================
   SKILL LEARNING PAGE
   ========================================================= */

function loadSkillPage() {

    const titleElement =
        document.getElementById(
            "skillTitle"
        );


    if (!titleElement) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const skillName =
        params.get("skill");


    if (
        !skillName ||
        !skillData[skillName]
    ) {

        titleElement.textContent =
            "Skill Not Found";

        return;

    }


    const skill =
        skillData[skillName];


    /* SKILL HEADER */

    titleElement.textContent =
        skillName;


    const skillDescription =
        document.getElementById(
            "skillDescription"
        );


    if (skillDescription) {

        skillDescription.textContent =
            skill.description;

    }


    /* CONCEPTS */

    const conceptList =
        document.getElementById(
            "conceptList"
        );


    if (conceptList) {

        conceptList.innerHTML = "";


        skill.concepts.forEach(
            (
                concept,
                index
            ) => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "learning-card";


                card.innerHTML = `

                    <span class="concept-number">

                        ${String(index + 1)
                            .padStart(2, "0")}

                    </span>

                    <h3>
                        ${concept.name}
                    </h3>

                    <p>
                        ${concept.description}
                    </p>

                `;


                conceptList.appendChild(
                    card
                );

            }
        );

    }


    /* RESOURCES */

    const resourceList =
        document.getElementById(
            "resourceList"
        );


    if (resourceList) {

        resourceList.innerHTML = "";


        skill.concepts.forEach(
            (
                concept,
                index
            ) => {

                const resource =
                    concept.resource;


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "resource-card";


                card.innerHTML = `

                    <div>

                        <span style="
                            color:#6c63ff;
                            font-size:11px;
                            font-weight:700;
                            letter-spacing:1px;
                        ">

                            CONCEPT
                            ${String(index + 1)
                                .padStart(2, "0")}

                        </span>

                        <h3>
                            ${concept.name}
                        </h3>

                        <p>
                            ${resource.description}
                        </p>

                    </div>

                    <a
                        href="${resource.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="resource-btn"
                    >

                        Learn Now ↗

                    </a>

                `;


                resourceList.appendChild(
                    card
                );

            }
        );

    }


    /* PRACTICE */

    const practiceList =
        document.getElementById(
            "practiceList"
        );


    if (practiceList) {

        practiceList.innerHTML = "";


        skill.practice.forEach(
            (
                task,
                index
            ) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "practice-item";


                item.innerHTML = `

                    <span>
                        ${index + 1}
                    </span>

                    <p>
                        ${task}
                    </p>

                `;


                practiceList.appendChild(
                    item
                );

            }
        );

    }


    /* PROJECT */

    const projectCard =
        document.getElementById(
            "projectCard"
        );


    if (projectCard) {

        projectCard.innerHTML = `

            <div>

                <span>
                    MINI PROJECT
                </span>

                <h2>
                    ${skill.project.title}
                </h2>

                <p>
                    ${skill.project.description}
                </p>

            </div>

            <button
                class="secondary-btn"
                id="startProjectBtn"
            >

                Start Project →

            </button>

        `;


        const startProjectBtn =
            document.getElementById(
                "startProjectBtn"
            );


        if (startProjectBtn) {

            startProjectBtn.onclick =
                function () {

                    window.location.href =
                        `project.html?skill=${encodeURIComponent(
                            skillName
                        )}`;

                };

        }

    }


    /* COMPLETE SKILL */

    const completeButton =
        document.getElementById(
            "completeSkillBtn"
        );


    if (!completeButton) {
        return;
    }


    const completedSkills =
        getCompletedSkills();


    if (
        completedSkills.includes(
            skillName
        )
    ) {

        const completeTitle =
            document.getElementById(
                "completeTitle"
            );


        if (completeTitle) {

            completeTitle.textContent =
                `${skillName} Completed 🎉`;

        }


        completeButton.textContent =
            "✓ Completed";


        completeButton.disabled =
            true;

    }


    completeButton.onclick =
        function () {

            let completed =
                getCompletedSkills();


            if (
                !completed.includes(
                    skillName
                )
            ) {

                completed.push(
                    skillName
                );

                saveCompletedSkills(
                    completed
                );

            }


            const completeTitle =
                document.getElementById(
                    "completeTitle"
                );


            if (completeTitle) {

                completeTitle.textContent =
                    `${skillName} Completed 🎉`;

            }


            completeButton.textContent =
                "✓ Completed";


            completeButton.disabled =
                true;

        };

}


/* =========================================================
   LOAD SKILL PAGE
   ========================================================= */

loadSkillPage();


/* =========================================================
   PROJECT WORKSPACE
   ========================================================= */

const projectWorkspace =
    document.getElementById(
        "projectTaskList"
    );


if (projectWorkspace) {

    loadProjectWorkspace();

}


/* =========================================================
   LOAD PROJECT
   ========================================================= */

function loadProjectWorkspace() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const skillName =
        params.get("skill");


    if (
        !skillName ||
        !skillData[skillName]
    ) {

        const title =
            document.getElementById(
                "projectTitle"
            );


        if (title) {

            title.textContent =
                "Project Not Found";

        }

        return;

    }


    const skill =
        skillData[skillName];


    const project =
        skill.project;


    /* PROJECT HEADER */

    const projectTitle =
        document.getElementById(
            "projectTitle"
        );


    if (projectTitle) {

        projectTitle.textContent =
            project.title;

    }


    const projectDescription =
        document.getElementById(
            "projectDescription"
        );


    if (projectDescription) {

        projectDescription.textContent =
            project.description;

    }


    /* PROJECT OVERVIEW */

    const overviewTitle =
        document.getElementById(
            "overviewTitle"
        );


    const overviewDescription =
        document.getElementById(
            "overviewDescription"
        );


    if (overviewTitle) {

        overviewTitle.textContent =
            project.title;

    }


    if (overviewDescription) {

        overviewDescription.textContent =
            project.description;

    }


    /* TECHNOLOGIES */

    const technologyList =
        document.getElementById(
            "technologyList"
        );


    if (technologyList) {

        technologyList.innerHTML = "";


        const technologies =
            project.technologies || [];


        technologies.forEach(
            technology => {

                const tag =
                    document.createElement(
                        "span"
                    );


                tag.className =
                    "technology-tag";


                tag.textContent =
                    technology;


                technologyList.appendChild(
                    tag
                );

            }
        );

    }


    /* TASKS */

    const taskList =
        document.getElementById(
            "projectTaskList"
        );


    if (!taskList) {
        return;
    }


    taskList.innerHTML = "";


    const tasks =
        project.tasks || [];


    const completedTasks =
        getProjectProgress(
            skillName
        );


    tasks.forEach(
        (
            task,
            index
        ) => {

            const isCompleted =
                completedTasks.includes(
                    index
                );


            const taskItem =
                document.createElement(
                    "div"
                );


            taskItem.className =
                `project-task ${
                    isCompleted
                        ? "completed"
                        : ""
                }`;


            taskItem.innerHTML = `

                <label class="task-checkbox">

                    <input
                        type="checkbox"
                        ${
                            isCompleted
                                ? "checked"
                                : ""
                        }
                        onchange="toggleProjectTask('${skillName}', ${index})"
                    >

                    <span class="custom-checkbox">
                        ✓
                    </span>

                </label>


                <div class="task-number">

                    ${String(index + 1)
                        .padStart(2, "0")}

                </div>


                <div class="task-content">

                    <h3>
                        ${task}
                    </h3>

                    <p>
                        Project Task
                    </p>

                </div>

            `;


            taskList.appendChild(
                taskItem
            );

        }
    );


    updateProjectProgress(
        skillName,
        tasks.length
    );


    updateProjectCompletion(
        skillName,
        tasks.length
    );

}


/* =========================================================
   TOGGLE PROJECT TASK
   ========================================================= */

function toggleProjectTask(
    skillName,
    taskIndex
) {

    let completed =
        getProjectProgress(
            skillName
        );


    if (
        completed.includes(
            taskIndex
        )
    ) {

        completed =
            completed.filter(
                index =>
                    index !== taskIndex
            );

    } else {

        completed.push(
            taskIndex
        );

    }


    saveProjectProgress(
        skillName,
        completed
    );


    loadProjectWorkspace();

}


/* =========================================================
   UPDATE PROJECT PROGRESS
   ========================================================= */

function updateProjectProgress(
    skillName,
    totalTasks
) {

    const completed =
        getProjectProgress(
            skillName
        );


    const completedCount =
        completed.length;


    let percentage = 0;


    if (totalTasks > 0) {

        percentage =
            Math.round(

                (
                    completedCount /
                    totalTasks
                ) * 100

            );

    }


    const completedTasks =
        document.getElementById(
            "completedTasks"
        );


    const totalTasksElement =
        document.getElementById(
            "totalTasks"
        );


    const percentageElement =
        document.getElementById(
            "projectPercentage"
        );


    const progressFill =
        document.getElementById(
            "projectProgressFill"
        );


    if (completedTasks) {

        completedTasks.textContent =
            completedCount;

    }


    if (totalTasksElement) {

        totalTasksElement.textContent =
            totalTasks;

    }


    if (percentageElement) {

        percentageElement.textContent =
            `${percentage}%`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   PROJECT COMPLETION
   ========================================================= */

function updateProjectCompletion(
    skillName,
    totalTasks
) {

    const completed =
        getProjectProgress(
            skillName
        );


    const button =
        document.getElementById(
            "completeProjectBtn"
        );


    const title =
        document.getElementById(
            "projectCompleteTitle"
        );


    const description =
        document.getElementById(
            "projectCompleteDescription"
        );


    if (!button) {
        return;
    }


    const projects =
        getCompletedProjects();


    /* ALREADY COMPLETED */

    if (
        projects.includes(
            skillName
        )
    ) {

        if (title) {

            title.textContent =
                "Project Completed 🎉";

        }


        if (description) {

            description.textContent =
                "You have successfully completed this project.";

        }


        button.textContent =
            "✓ Project Completed";


        button.disabled =
            true;


        return;

    }


    /* ALL TASKS COMPLETED */

    if (
        totalTasks > 0 &&
        completed.length === totalTasks
    ) {

        button.disabled =
            false;

        button.textContent =
            "✓ Mark Project Complete";

    } else {

        button.disabled =
            true;

        button.textContent =
            "Complete All Tasks First";

    }


    button.onclick =
        function () {

            const latestCompleted =
                getProjectProgress(
                    skillName
                );


            if (
                latestCompleted.length !==
                totalTasks
            ) {

                return;

            }


            const currentProjects =
                getCompletedProjects();


            if (
                !currentProjects.includes(
                    skillName
                )
            ) {

                currentProjects.push(
                    skillName
                );


                saveCompletedProjects(
                    currentProjects
                );

            }


            if (title) {

                title.textContent =
                    "Project Completed 🎉";

            }


            if (description) {

                description.textContent =
                    "Excellent work! You have completed your project milestone.";

            }


            button.textContent =
                "✓ Project Completed";


            button.disabled =
                true;

        };

}


/* =========================================================
   SIGN UP
   ========================================================= */

const signupForm =
    document.getElementById(
        "signupForm"
    );


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "signupName"
                ).value.trim();


            const email =
                document.getElementById(
                    "signupEmail"
                ).value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "signupPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "signupConfirmPassword"
                ).value;


            const error =
                document.getElementById(
                    "signupError"
                );


            if (error) {

                error.textContent =
                    "";

            }


            /* VALIDATION */

            if (
                password.length < 6
            ) {

                if (error) {

                    error.textContent =
                        "Password must contain at least 6 characters.";

                }

                return;

            }


            if (
                password !==
                confirmPassword
            ) {

                if (error) {

                    error.textContent =
                        "Passwords do not match.";

                }

                return;

            }


            const users =
                getUsers();


            const existingUser =
                users.find(
                    user =>
                        user.email ===
                        email
                );


            if (existingUser) {

                if (error) {

                    error.textContent =
                        "An account with this email already exists.";

                }

                return;

            }


            /* CREATE USER */

            const userId =
                "user_" +
                Date.now();


            const newUser = {

                id:
                    userId,

                name:
                    name,

                email:
                    email,

                password:
                    password,

                profile: {

                    career:
                        "",

                    skills:
                        [],

                    skillLevels:
                        {},

                    experience:
                        "",

                    learningTime:
                        ""

                },

                completedSkills:
                    [],

                projectProgress:
                    {},

                completedProjects:
                    [],

                achievements:
                    [],

                streak: {

                    lastActiveDate:
                        "",

                    current:
                        0,

                    longest:
                        0

                },

                feedback:
                    []

            };


            users.push(
                newUser
            );


            saveUsers(
                users
            );


            setCurrentUser(
                userId
            );


            window.location.href =
                "assessment.html";

        }
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

const loginForm =
    document.getElementById(
        "loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value
                .trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const error =
                document.getElementById(
                    "loginError"
                );


            if (error) {

                error.textContent =
                    "";

            }


            const users =
                getUsers();


            const user =
                users.find(
                    currentUser =>
                        currentUser.email ===
                            email &&

                        currentUser.password ===
                            password
                );


            if (!user) {

                if (error) {

                    error.textContent =
                        "Incorrect email or password.";

                }

                return;

            }


            setCurrentUser(
                user.id
            );


            window.location.href =
                "dashboard.html";

        }
    );

}


/* =========================================================
   PAGE PROTECTION
   ========================================================= */

function protectPage() {

    const publicPages = [

        "index.html",

        "login.html",

        "signup.html"

    ];


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const isPublicPage =
        publicPages.includes(
            currentPage
        );


    const currentUser =
        getCurrentUser();


    if (
        !isPublicPage &&
        !currentUser
    ) {

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   RUN PAGE PROTECTION
   ========================================================= */

protectPage();


/* =========================================================
   DEBUG
   ========================================================= */

console.log(
    "SkillGraph JavaScript loaded successfully 🚀"
);