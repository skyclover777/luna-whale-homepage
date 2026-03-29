/**
 * Luna Whale Attendance Planner - V30 Daily Detail Pivot
 * Mon-Sun Calendar + Hover Expansion + Full-Page Daily Detail
 */

// State
let currentDate = new Date();
const DATA_KEY = "lw_planner_data";
const STUDENTS_KEY = "lw_planner_students";
const SCHEDULE_KEY = "lw_planner_schedule"; // Specific timeline layouts

let students = JSON.parse(localStorage.getItem(STUDENTS_KEY)) || [];
let attendanceData = JSON.parse(localStorage.getItem(DATA_KEY)) || {};
let scheduleData = JSON.parse(localStorage.getItem(SCHEDULE_KEY)) || {}; // { "2026-02-27": [{time: "09:00", type: "student", value: "Kim Soyeon"}, ...] }

// Matrix Specific State (Independent)
const MATRIX_STATE_KEY = "lw_matrix_state_v1";
let matrixState = JSON.parse(localStorage.getItem(MATRIX_STATE_KEY)) || {
    students: []
};

// DOM Elements
const monthDisplay = document.getElementById("current-month-display");
const gridEl = document.getElementById("calendar-grid");
const tabCalendar = document.getElementById("tab-calendar");
const tabMatrix = document.getElementById("tab-matrix");
const viewCalendar = document.getElementById("view-calendar");
const viewMatrix = document.getElementById("view-matrix");
const viewDetail = document.getElementById("view-detail");
const rosterEl = document.getElementById("student-roster");

// Daily Detail Elements
const detailDateTitle = document.getElementById("detail-date-title");
const detailDateSubtitle = document.getElementById("detail-date-subtitle");
const detailTimeline = document.getElementById("detail-timeline");
const detailRoster = document.getElementById("detail-roster");
const detailNewMemo = document.getElementById("detail-new-memo");

let activeDateStr = "";
let timelineStartHour = 8;
let timelineEndHour = 24; // Midnight


function getGradientForName(name) {
    if (!name) return "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.9))";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h1 = Math.abs(hash % 360);
    const h2 = (h1 + 40) % 360;
    const h3 = (h1 + 80) % 360;
    return `linear-gradient(135deg, hsla(${h1}, 85%, 65%, 0.9), hsla(${h2}, 80%, 60%, 0.9), hsla(${h3}, 75%, 55%, 0.85))`;
}

let currentUserUid = null;
let db = null;
let isLoadingData = true;

document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initMonthNav();

    if (window.firebase && firebase.auth) {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                currentUserUid = user.uid;
                db = window.LunaAuth && LunaAuth.getDb ? LunaAuth.getDb() : firebase.firestore();
                await loadDataFromFirebase();
            } else {
                currentUserUid = null;
                db = null;
            }
            migrateScheduleIds();
            isLoadingData = false;
            renderAll();
        });
    } else {
        migrateScheduleIds();
        isLoadingData = false;
        renderAll();
    }
});

async function loadDataFromFirebase() {
    if (!currentUserUid || !db) return;
    try {
        const docRef = db.collection('users').doc(currentUserUid).collection('plannerData').doc('main');
        const snap = await docRef.get();
        if (snap.exists) {
            const data = snap.data();
            if (data.students) students = data.students;
            if (data.attendanceData) attendanceData = data.attendanceData;
            if (data.scheduleData) scheduleData = data.scheduleData;
            if (data.matrixState) matrixState = data.matrixState;

            // Sync to local
            localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
            localStorage.setItem(DATA_KEY, JSON.stringify(attendanceData));
            localStorage.setItem(SCHEDULE_KEY, JSON.stringify(scheduleData));
            localStorage.setItem(MATRIX_STATE_KEY, JSON.stringify(matrixState));
        } else {
            // Document doesn't exist yet!
            // Start with a totally clean slate so old localStorage profiles don't bleed over.
            students = [];
            attendanceData = {};
            scheduleData = {};
            matrixState = { students: [] };

            // Sync clean slate to local storage
            localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
            localStorage.setItem(DATA_KEY, JSON.stringify(attendanceData));
            localStorage.setItem(SCHEDULE_KEY, JSON.stringify(scheduleData));
            localStorage.setItem(MATRIX_STATE_KEY, JSON.stringify(matrixState));

            // Push our newly cleaned state up to Firebase
            await saveFirebaseData();
        }
    } catch (error) {
        console.error("Error loading planner data from Firebase:", error);
    }
}

async function saveFirebaseData() {
    if (!currentUserUid || !db) return;
    try {
        const docRef = db.collection('users').doc(currentUserUid).collection('plannerData').doc('main');
        await docRef.set({
            students,
            attendanceData,
            scheduleData,
            matrixState,
            lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error("Error saving planner data to Firebase:", error);
    }
}

function migrateScheduleIds() {
    // V69: Migrate existing seriesIds to stable format for students to enable cross-day counting
    let modified = false;
    for (const d in scheduleData) {
        if (Array.isArray(scheduleData[d])) {
            scheduleData[d].forEach(item => {
                if ((item.type === 'student' || item.type === 'custom') && (!item.seriesId || !item.seriesId.startsWith('sid_'))) {
                    const safeName = (item.value || "unknown").trim().replace(/\s+/g, '_');
                    item.seriesId = `sid_${safeName}`;
                    modified = true;
                }
            });
        }
    }
    if (modified) saveData();
}

function saveData() {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
    localStorage.setItem(DATA_KEY, JSON.stringify(attendanceData));
    localStorage.setItem(SCHEDULE_KEY, JSON.stringify(scheduleData));
    if (!isLoadingData) saveFirebaseData();
}

function saveMatrixData() {
    localStorage.setItem(MATRIX_STATE_KEY, JSON.stringify(matrixState));
    if (!isLoadingData) saveFirebaseData();
}

function initMonthNav() {
    document.getElementById("btn-prev-month").onclick = () => { currentDate.setMonth(currentDate.getMonth() - 1); renderAll(); };
    document.getElementById("btn-next-month").onclick = () => { currentDate.setMonth(currentDate.getMonth() + 1); renderAll(); };
    document.getElementById("btn-today").onclick = () => { currentDate = new Date(); renderAll(); };
}

function initTabs() {
    if (!tabCalendar || !tabMatrix) return;
    tabCalendar.onclick = () => {
        tabCalendar.classList.add("bg-white", "shadow-sm", "text-primary");
        tabMatrix.classList.remove("bg-white", "shadow-sm", "text-primary");
        viewCalendar.classList.remove("hidden");
        viewMatrix.classList.add("hidden");
        viewDetail.classList.add("hidden");
    };
    tabMatrix.onclick = () => {
        tabMatrix.classList.add("bg-white", "shadow-sm", "text-primary");
        tabCalendar.classList.remove("bg-white", "shadow-sm", "text-primary");
        viewCalendar.classList.add("hidden");
        viewMatrix.classList.remove("hidden");
        viewDetail.classList.add("hidden");
    };
}

function renderAll() {
    if (!monthDisplay) return;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    monthDisplay.textContent = `${monthName} ${year}`;
    renderRoster();
    syncStudentsToMatrix();
    renderCalendarGrid(year, month);
    renderMatrixView(year, month);
}

// Auto-sync calendar roster students into matrixState
function syncStudentsToMatrix() {
    let changed = false;
    // Sync from calendar roster
    students.forEach(name => {
        if (!matrixState.students.find(s => s.name === name)) {
            matrixState.students.push({
                id: 'ms_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                name: name,
                weekly: [false, false, false, false, false, false, false],
                overrides: {}
            });
            changed = true;
        }
    });
    // Sync from timeline scheduleData (students dragged onto daily view)
    for (const dateStr in scheduleData) {
        (scheduleData[dateStr] || []).forEach(item => {
            if (item.type === 'student' && item.value && !item.inactive) {
                const sName = item.value.trim();
                if (!matrixState.students.find(s => s.name === sName)) {
                    matrixState.students.push({
                        id: 'ms_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                        name: sName,
                        weekly: [false, false, false, false, false, false, false],
                        overrides: {}
                    });
                    changed = true;
                }
            }
        });
    }
    if (changed) saveMatrixData();
}

function renderRoster() {
    if (!rosterEl) return;
    rosterEl.innerHTML = "";
    students.forEach((s, idx) => {
        const d = document.createElement("div");
        d.className = "flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300 cursor-default";
        d.innerHTML = `<span>${s}</span><button onclick="removeStudent(${idx})" class="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center ml-1"><span class="material-symbols-outlined text-[10px]">close</span></button>`;
        rosterEl.appendChild(d);
    });
}

window.addStudentInline = () => {
    const name = document.getElementById("new-student-input")?.value?.trim();
    if (name && !students.includes(name)) { students.push(name); saveData(); renderAll(); }
    if (document.getElementById("new-student-input")) document.getElementById("new-student-input").value = "";
};
window.removeStudent = (idx) => { students.splice(idx, 1); saveData(); renderAll(); }

/**
 * CALENDAR GRID (Mon-Sun layout)
 */
function renderCalendarGrid(year, month) {
    if (!gridEl) return;
    gridEl.innerHTML = "";

    // Day order: Mon=0, Tue=1, ..., Sat=5, Sun=6
    const firstDayDate = new Date(year, month, 1);
    let firstDayIndex = (firstDayDate.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toISOString().split('T')[0];

    // Empty cells for start padding
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "bg-slate-50/30 dark:bg-slate-800/20 rounded-2xl min-h-[100px]";
        gridEl.appendChild(emptyCell);
    }

    // Actual month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = dateStr === todayStr;
        const dObj = new Date(year, month, day);
        const dow = dObj.getDay(); // 0=Sun, 6=Sat

        const cell = document.createElement("div");
        cell.className = `calendar-day-cell flex flex-col rounded-2xl p-3 min-h-[140px] cursor-pointer border-2 transition-all ${isToday ? 'bg-primary/5 border-primary/40' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800'}`;
        cell.onclick = () => openDailyDetail(dateStr);

        let dayColorClass = "text-slate-700 dark:text-slate-200";
        if (dow === 0) dayColorClass = "text-red-500";
        if (dow === 6) dayColorClass = "text-blue-500";

        cell.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-black ${isToday ? 'text-primary' : dayColorClass}">${day}</span>
                <span class="material-symbols-outlined text-slate-300 text-sm">open_in_new</span>
            </div>
            <div id="mini-sched-${dateStr}" class="space-y-0.5 overflow-hidden">
                <!-- Mini items -->
            </div>
        `;
        gridEl.appendChild(cell);

        // Fill mini schedule grouped by time
        const miniSched = cell.querySelector(`#mini-sched-${dateStr}`);
        const daySched = scheduleData[dateStr] || [];

        if (daySched.length > 0) {
            // Group by time
            const groupedSched = {};
            daySched.forEach(item => {
                const displayTime = item.startTime || item.time || "00:00";
                if (!groupedSched[displayTime]) groupedSched[displayTime] = [];
                groupedSched[displayTime].push(item);
            });

            // Sort times
            const sortedTimes = Object.keys(groupedSched).sort();

            let totalRendered = 0;
            const MAX_DISPLAY = 5;

            sortedTimes.forEach(timeStr => {
                if (totalRendered >= MAX_DISPLAY) return;

                const timeStrClean = timeStr.trim();
                const itemsAtTime = groupedSched[timeStr];

                if (itemsAtTime.length > 1) {
                    // Bundled view for same-time items
                    const bundledDiv = document.createElement("div");
                    bundledDiv.className = `mini-schedule-item text-white shadow-sm overflow-hidden text-ellipsis whitespace-nowrap bg-slate-500/80`;

                    const names = itemsAtTime.map(it => it.value).join(", ");
                    bundledDiv.textContent = `${timeStrClean} ${names}`;
                    bundledDiv.title = names; // Tooltip for full names
                    miniSched.appendChild(bundledDiv);
                    totalRendered++;
                } else {
                    // Individual item (original logic)
                    itemsAtTime.forEach(item => {
                        if (totalRendered >= MAX_DISPLAY) return;

                        const itemDiv = document.createElement("div");
                        itemDiv.className = `mini-schedule-item text-white shadow-sm overflow-hidden text-ellipsis whitespace-nowrap`;
                        itemDiv.style.background = getGradientForName(item.value);

                        itemDiv.textContent = `${timeStrClean} ${item.value}`;
                        miniSched.appendChild(itemDiv);

                        totalRendered++;
                    });
                }
            });

            if (daySched.length > MAX_DISPLAY) {
                const more = document.createElement("div");
                more.className = "text-[8px] font-bold text-slate-400 mt-0.5 text-center";
                more.textContent = `+${daySched.length - MAX_DISPLAY} more`;
                miniSched.appendChild(more);
            }
        }
    }
}

/**
 * DAILY DETAIL VIEW (View 3)
 */
window.openDailyDetail = (dateStr) => {
    activeDateStr = dateStr;
    const d = new Date(dateStr);
    detailDateTitle.textContent = d.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    detailDateSubtitle.textContent = d.toLocaleDateString('default', { weekday: 'long' });

    viewCalendar.classList.add("hidden");
    viewMatrix.classList.add("hidden");
    viewDetail.classList.remove("hidden");

    renderTimeline();
    renderDetailRoster();
};

window.closeDailyDetail = () => {
    viewDetail.classList.add("hidden");
    viewCalendar.classList.remove("hidden");
    activeDateStr = "";
    renderAll();
};

window.saveDetailAndClose = () => {
    saveData();
    closeDailyDetail();
};

function renderTimeline() {
    if (!detailTimeline) return;
    detailTimeline.innerHTML = "";

    // Mobile/Touch: use tap-to-select UI instead of drag-and-drop
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouchDevice) {
        renderMobileTimeline();
        return;
    }

    const activeSched = scheduleData[activeDateStr] || [];

    const timeToMins = t => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    const timelineStartMins = timelineStartHour * 60;
    const timelineEndMins = timelineEndHour * 60;
    const totalMins = timelineEndMins - timelineStartMins;
    const totalHeight = (totalMins / 30) * 32;

    const sortedItems = [...activeSched].sort((a, b) => timeToMins(a.startTime || a.time) - timeToMins(b.startTime || b.time));

    // Add "+" button for expansion at the top
    const expandBtnRow = document.createElement("div");
    expandBtnRow.className = "flex justify-center mb-4";
    expandBtnRow.innerHTML = `
        <button onclick="expandTimelineUp()" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center">
            <span class="material-symbols-outlined text-lg">add</span>
        </button>
    `;
    detailTimeline.appendChild(expandBtnRow);

    // Global Wrapper for absolute positioning grid
    const NUM_COLS = 8;
    const labelOffset = 48; // Left offset for time headings

    const gridWrapper = document.createElement("div");
    gridWrapper.className = "relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900";
    gridWrapper.style.height = totalHeight + "px"; // Fix: Removed 800px min-height that created huge white block


    // Render Background Columns Grid
    const gridCols = document.createElement("div");
    gridCols.className = "absolute top-0 bottom-0 right-0 flex pointer-events-none";
    gridCols.style.left = `${labelOffset}px`;
    for (let c = 0; c < NUM_COLS; c++) {
        const colDiv = document.createElement("div");
        colDiv.className = "flex-1 border-r border-slate-100 dark:border-slate-800 border-dashed opacity-50";
        gridCols.appendChild(colDiv);
    }
    gridWrapper.appendChild(gridCols);

    // Render Horizontal Rows & Labels
    for (let m = timelineStartMins; m <= timelineEndMins; m += 30) {
        const h = Math.floor(m / 60);
        const mins = m % 60;
        const timeStr = `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        const topPx = ((m - timelineStartMins) / 30) * 32;

        const rowLine = document.createElement("div");
        rowLine.className = "absolute left-0 right-0 border-t border-slate-100 dark:border-slate-800 border-dashed flex items-start pointer-events-none";
        rowLine.style.top = `${topPx}px`;
        rowLine.style.height = "32px";

        rowLine.innerHTML = `<div class="w-[${labelOffset}px] text-[0.65rem] font-bold text-slate-400 text-right pr-2 select-none -translate-y-2 bg-white dark:bg-slate-900 pointer-events-auto">${timeStr}</div>`;
        gridWrapper.appendChild(rowLine);
    }

    // Dropzone for adding from sidebar
    gridWrapper.ondragover = (e) => { e.preventDefault(); };
    gridWrapper.ondrop = (e) => {
        e.preventDefault();
        try {
            const data = JSON.parse(e.dataTransfer.getData("application/json"));
            const rect = gridWrapper.getBoundingClientRect();

            // Calculate dropped time
            const y = e.clientY - rect.top;
            let droppedMins = Math.round(y / 32) * 30; // snap to 30 mins
            droppedMins += timelineStartMins;
            if (droppedMins < timelineStartMins) droppedMins = timelineStartMins;
            if (droppedMins > timelineEndMins - 30) droppedMins = timelineEndMins - 30;

            const dropH = Math.floor(droppedMins / 60);
            const dropM = droppedMins % 60;
            const timeStr = `${String(dropH).padStart(2, '0')}:${String(dropM).padStart(2, '0')}`;

            // Calculate dropped column
            const x = e.clientX - rect.left - labelOffset;
            const dropWidth = rect.width - labelOffset;
            let col = Math.floor((x / dropWidth) * NUM_COLS);
            if (col < 0) col = 0;
            if (col >= NUM_COLS - 1) col = NUM_COLS - 2; // Default width is 2

            data.col = col;
            data.colSpan = 2; // Default block width
            handleDropScheduleItem(timeStr, data);
        } catch (err) { }
    };

    // Render Badges Absolutely
    sortedItems.forEach(item => {
        const startMins = timeToMins(item.startTime || item.time);
        const topPx = ((startMins - timelineStartMins) / 30) * 32;
        const badge = createBadge(item, topPx);
        gridWrapper.appendChild(badge);
    });

    detailTimeline.appendChild(gridWrapper);

    // Add "+" button for expansion at the bottom
    const expandBtnRowBottom = document.createElement("div");
    expandBtnRowBottom.className = "flex justify-center mt-4 mb-8";
    expandBtnRowBottom.innerHTML = `
        <button onclick="expandTimelineDown()" class="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center">
            <span class="material-symbols-outlined text-lg">add</span>
        </button>
    `;
    detailTimeline.appendChild(expandBtnRowBottom);
}

window.expandTimelineUp = () => {
    if (timelineStartHour > 0) {
        timelineStartHour--;
        renderTimeline();
    }
};

window.expandTimelineDown = () => {
    if (timelineEndHour < 24) {
        timelineEndHour++;
        renderTimeline();
    }
};

function createBadge(item, topPx) {
    const NUM_COLS = 8;
    const labelOffset = 48; // Must match timeline global offset

    const b = document.createElement("div");
    const duration = item.duration || 30;
    const height = (duration / 30) * 32;
    const itemColor = getGradientForName(item.value);

    // Migrate old items seamlessly
    if (item.col === undefined) item.col = 0;
    if (item.colSpan === undefined) item.colSpan = 2; // Default 2 columns wide

    const col = item.col;
    const colSpan = item.colSpan;

    const widthPct = (colSpan / NUM_COLS) * 100;
    const leftPct = (col / NUM_COLS) * 100;

    // Apply custom percentage width if available, otherwise fallback to column span percentage
    let finalWidthPct = widthPct;
    if (item.customWidthPct) {
        finalWidthPct = item.customWidthPct;
    }

    b.className = `absolute rounded-lg text-[10px] font-bold flex flex-col gap-0 shadow-lg z-10 overflow-hidden border border-white/20 select-none group focus-within:z-50`;

    // Remove native drag
    b.draggable = false;

    b.style.top = `${topPx}px`;
    b.style.height = `${height - 2}px`;
    b.style.width = `calc(${finalWidthPct}% - 4px)`;
    b.style.left = `calc(${labelOffset}px + ${leftPct}%)`;

    if (item.inactive) {
        b.style.background = "rgba(156, 163, 175, 0.5)";
        b.style.opacity = "0.7";
        b.style.backdropFilter = "blur(4px)";
    } else {
        b.style.background = itemColor;
        b.style.backdropFilter = "blur(12px)";
        b.style.webkitBackdropFilter = "blur(12px)";
    }
    b.style.color = "white";
    b.style.padding = "0 12px";

    if (!document.getElementById('number-huge-style')) {
        const style = document.createElement('style');
        style.id = 'number-huge-style';
        style.innerHTML = `
            .number-huge::-webkit-inner-spin-button,
            .number-huge::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            .number-huge {
                -moz-appearance: textfield;
            }
        `;
        document.head.appendChild(style);
    }

    const lessonNum = getLessonNumber(item.seriesId, activeDateStr, item.id);

    b.innerHTML = `
        <!-- DRAG LAYER: Covers the background perfectly -->
        <div class="drag-handle absolute inset-0 cursor-move z-10" style="border-radius: 8px;"></div>
        
        <!-- CONTENT LAYER: Sits on top of the drag layer -->
        <div class="absolute inset-0 z-30 flex flex-col justify-between pointer-events-none p-1.5 overflow-hidden" style="border-radius: 8px;">
            <!-- Top Row: Name and Action Buttons -->
            <div class="flex justify-between items-start w-full">
                <!-- Large, bold, top-left Name -->
                <span class="font-sans font-black text-lg tracking-tight drop-shadow-md z-30 pointer-events-none truncate mr-1">${item.value}</span>
                
                <!-- Buttons -->
                <div class="flex flex-col items-center gap-1 shrink-0 bg-black/20 p-1 rounded-md pointer-events-auto backdrop-blur-md shadow-sm">
                    <button type="button" 
                            onmousedown="event.stopPropagation(); toggleScheduleStatus('${item.id}');" 
                            ontouchstart="event.stopPropagation(); toggleScheduleStatus('${item.id}');"
                            class="flex items-center text-white/80 hover:text-yellow-300 transition-colors p-0.5" title="Toggle Inactive">
                        <span class="material-symbols-outlined text-[14px] drop-shadow-sm pointer-events-none">block</span>
                    </button>
                    <!-- Delete button removed in favor of drag-to-trash -->
                </div>
            </div>
            
            <!-- Bottom Right Corner: Huge Translucent Number perfectly attached -->
            <div class="absolute bottom-0 right-0 w-40 h-32 flex justify-end items-end pointer-events-auto rounded-br-lg overflow-hidden translate-x-3 translate-y-3">
                <input type="number" 
                       class="number-huge bg-transparent text-white/30 hover:text-white/80 focus:text-white focus:bg-black/30 w-full h-full text-right text-[7rem] leading-none font-sans font-black outline-none focus:outline-none focus:ring-0 border-none cursor-text transition-all rounded-br-lg p-0 m-0" 
                       style="-webkit-user-select: auto; user-select: auto; letter-spacing: -4px;"
                       placeholder="1"
                       value="${lessonNum}"
                       onchange="updateLessonNumber('${item.id}', this.value)"
                       onmousedown="event.stopPropagation();"
                       ontouchstart="event.stopPropagation();"
                       onclick="event.stopPropagation(); this.focus();" />
            </div>
        </div>
        
        <!-- RESIZE HANDLES -->
        <div class="resize-handle absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize z-[60] opacity-0 group-hover:opacity-100 transition-opacity" style="background: linear-gradient(to top, rgba(0,0,0,0.1), transparent);"></div>
        <div class="resize-handle-x absolute top-0 bottom-0 right-0 w-4 cursor-ew-resize z-[60] opacity-0 group-hover:opacity-100 transition-opacity" style="background: linear-gradient(to left, rgba(0,0,0,0.1), transparent);"></div>
    `;

    // Custom Drag-to-Move Logic
    const dragHandle = b.querySelector(".drag-handle");
    let initialX = 0, initialY = 0;
    let initialLeftPctNum = 0, initialTop = 0;
    let isDragging = false;

    const startDrag = (e) => {
        // Since dragHandle is now a naked sibling, ALL clicks on it are pure drags.
        e.preventDefault();
        e.stopPropagation();

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

        initialX = clientX;
        initialY = clientY;
        initialLeftPctNum = (item.col / NUM_COLS) * 100;
        initialTop = parseFloat(b.style.top);
        isDragging = true;
        b.style.zIndex = 50;
        b.style.transition = 'none';

        // Show global trash zone
        let trashZone = document.getElementById('global-trash-zone');
        if (!trashZone) {
            trashZone = document.createElement('div');
            trashZone.id = 'global-trash-zone';
            trashZone.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-8 py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 z-[9999] opacity-0 transition-opacity pointer-events-none border border-red-400 backdrop-blur-md';
            trashZone.innerHTML = `<span class="material-symbols-outlined text-3xl animate-bounce">delete</span><span class="font-bold tracking-tight">Drop here to delete</span>`;
            document.body.appendChild(trashZone);
        }
        // Force reflow
        void trashZone.offsetWidth;
        trashZone.style.opacity = '1';

        const onMove = (moveEvent) => {
            if (!isDragging) return;
            // Prevent default zooming/scrolling on touch devices
            if (moveEvent.cancelable && moveEvent.type.includes('touch')) {
                moveEvent.preventDefault();
            }
            const moveX = moveEvent.type.includes('touch') ? moveEvent.touches[0].clientX : moveEvent.clientX;
            const moveY = moveEvent.type.includes('touch') ? moveEvent.touches[0].clientY : moveEvent.clientY;

            const deltaX = moveX - initialX;
            const deltaY = moveY - initialY;
            b.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            b.style.opacity = '0.8';
        };

        const onUp = (upEvent) => {
            if (!isDragging) return;
            isDragging = false;

            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.removeEventListener("touchmove", onMove);
            document.removeEventListener("touchend", onUp);

            b.style.transform = '';
            b.style.transition = '';
            b.style.opacity = '';

            const upX = upEvent.type.includes('touch') ? (upEvent.changedTouches[0].clientX) : upEvent.clientX;
            const upY = upEvent.type.includes('touch') ? (upEvent.changedTouches[0].clientY) : upEvent.clientY;

            // Hide trash zone
            const trashZone = document.getElementById('global-trash-zone');
            if (trashZone) {
                trashZone.style.opacity = '0';
                setTimeout(() => trashZone.remove(), 300);
            }

            // Check if dropped in bottom 15% of screen (Trash area)
            const viewportHeight = window.innerHeight;
            if (upY > viewportHeight * 0.85) {
                // Delete the item immediately
                const trueItemIndex = scheduleData[activeDateStr]?.findIndex(i => i.id === item.id);
                if (trueItemIndex !== undefined && trueItemIndex > -1) {
                    const targetItem = scheduleData[activeDateStr][trueItemIndex];
                    const sId = targetItem.seriesId;

                    scheduleData[activeDateStr].splice(trueItemIndex, 1);

                    // Cascade delete to all future occurrences with same seriesId
                    if (sId) {
                        const currentDateObj = new Date(activeDateStr);
                        const allDates = Object.keys(scheduleData).filter(d => new Date(d) > currentDateObj);

                        allDates.forEach(d => {
                            if (scheduleData[d]) {
                                const fIndex = scheduleData[d].findIndex(i => i.seriesId === sId);
                                if (fIndex > -1) {
                                    scheduleData[d].splice(fIndex, 1);
                                }
                            }
                        });
                    }

                    saveData();
                    renderTimeline();
                }
                return;
            }

            const deltaY = upY - initialY;
            const finalTop = initialTop + deltaY;

            // Snap logic (nearest 32px block for time)
            const snappedTop = Math.max(0, Math.round(finalTop / 32) * 32);
            const newMins = (snappedTop / 32) * 30 + (timelineStartHour * 60);
            const newH = Math.floor(newMins / 60);
            const newM = newMins % 60;
            const timeStr = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')} `;

            // Snap logic X (columns)
            const gridWrapper = detailTimeline.querySelector('.relative');
            const rect = gridWrapper.getBoundingClientRect();
            const dropWidth = rect.width - labelOffset;
            const deltaX = upX - initialX;
            const colWidthPx = dropWidth / NUM_COLS;

            const colsShifted = Math.round(deltaX / colWidthPx);
            let newCol = item.col + colsShifted;

            if (newCol < 0) newCol = 0;
            if (newCol + item.colSpan > NUM_COLS) newCol = NUM_COLS - item.colSpan;

            // Critical Fix: Mutate the actual stored object, not the mapped copy
            const trueItem = scheduleData[activeDateStr]?.find(i => i.id === item.id);
            if (trueItem) {
                trueItem.col = newCol;
                trueItem.startTime = timeStr;
                trueItem.time = timeStr;

                // Cascade position to all future occurrences with same seriesId
                if (trueItem.seriesId) {
                    const currentDateObj = new Date(activeDateStr);
                    const allDates = Object.keys(scheduleData).filter(d => new Date(d) > currentDateObj);
                    allDates.forEach(d => {
                        const futureItems = scheduleData[d] || [];
                        futureItems.forEach(fItem => {
                            if (fItem.seriesId === trueItem.seriesId) {
                                fItem.col = newCol;
                                fItem.startTime = timeStr;
                                fItem.time = timeStr;
                            }
                        });
                    });
                }

                saveData();
                renderTimeline();
            }
        };

        document.addEventListener("mousemove", onMove, { passive: false });
        document.addEventListener("mouseup", onUp);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("touchend", onUp);
    };

    dragHandle.addEventListener('mousedown', startDrag);
    dragHandle.addEventListener('touchstart', startDrag, { passive: false });

    // VERTICAL RESIZE
    const resizeHandle = b.querySelector('.resize-handle');
    let isResizing = false;
    let initialH = 0;

    const startResize = (e) => {
        e.preventDefault();
        e.stopPropagation();
        initialY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        initialH = parseInt(b.style.height) || b.getBoundingClientRect().height;
        isResizing = true;
        b.style.transition = 'none';

        const onMove = (moveEvent) => {
            if (!isResizing) return;
            if (moveEvent.cancelable && moveEvent.type.includes('touch')) moveEvent.preventDefault();
            const moveY = moveEvent.type.includes('touch') ? moveEvent.touches[0].clientY : moveEvent.clientY;
            let deltaY = moveY - initialY;
            b.style.height = `${initialH + deltaY}px`;
        };

        const onUp = (upEvent) => {
            if (!isResizing) return;
            isResizing = false;
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
            document.removeEventListener("touchmove", onMove);
            document.removeEventListener("touchend", onUp);

            b.style.transition = '';
            const upY = upEvent.type.includes('touch') ? (upEvent.changedTouches ? upEvent.changedTouches[0].clientY : upEvent.clientY) : upEvent.clientY;
            let deltaY = upY - initialY;

            let blocksToAdd = Math.round(deltaY / 32);
            let newDuration = duration + (blocksToAdd * 30);
            if (newDuration < 30) newDuration = 30;

            const trueItem = scheduleData[activeDateStr]?.find(i => i.id === item.id);
            if (trueItem) {
                trueItem.duration = newDuration;
                if (trueItem.seriesId) {
                    const currentDateObj = new Date(activeDateStr);
                    const allDates = Object.keys(scheduleData).filter(d => new Date(d) > currentDateObj);
                    allDates.forEach(d => {
                        const futureItems = scheduleData[d] || [];
                        futureItems.forEach(fItem => {
                            if (fItem.seriesId === trueItem.seriesId) fItem.duration = newDuration;
                        });
                    });
                }
                saveData();
                renderTimeline();
            }
        };

        document.addEventListener("mousemove", onMove, { passive: false });
        document.addEventListener("mouseup", onUp);
        document.addEventListener("touchmove", onMove, { passive: false });
        document.addEventListener("touchend", onUp);
    };

    if (resizeHandle) {
        resizeHandle.addEventListener('mousedown', startResize);
        resizeHandle.addEventListener('touchstart', startResize, { passive: false });
    }

    // HORIZONTAL RESIZE
    const resizeHandleX = b.querySelector('.resize-handle-x');
    let isResizingX = false;
    let initialColSpanNumX = 0;
    let startDragX = 0;

    const startResizeX = (e) => {
        e.preventDefault();
        e.stopPropagation();
        startDragX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        initialColSpanNumX = item.colSpan || 2;
        isResizingX = true;
        b.style.transition = 'none';

        const initialW = b.getBoundingClientRect().width;

        const onMoveX = (moveEvent) => {
            if (!isResizingX) return;
            if (moveEvent.cancelable && moveEvent.type.includes('touch')) moveEvent.preventDefault();
            const moveX = moveEvent.type.includes('touch') ? moveEvent.touches[0].clientX : moveEvent.clientX;
            let deltaX = moveX - startDragX;
            b.style.width = `${initialW + deltaX}px`;
        };

        const onUpX = (upEvent) => {
            if (!isResizingX) return;
            isResizingX = false;
            document.removeEventListener("mousemove", onMoveX);
            document.removeEventListener("mouseup", onUpX);
            document.removeEventListener("touchmove", onMoveX);
            document.removeEventListener("touchend", onUpX);

            b.style.transition = '';
            const upX = upEvent.type.includes('touch') ? (upEvent.changedTouches ? upEvent.changedTouches[0].clientX : upEvent.clientX) : upEvent.clientX;
            let deltaX = upX - startDragX;

            const gridWrapper = detailTimeline.querySelector('.relative');
            const gridRect = gridWrapper.getBoundingClientRect();
            const dropWidth = gridRect.width - labelOffset;
            const colWidthPx = dropWidth / NUM_COLS;

            let colsToAdd = Math.round(deltaX / colWidthPx);
            let newColSpan = initialColSpanNumX + colsToAdd;

            if (newColSpan < 1) newColSpan = 1;
            const currentItemCol = item.col || 0;
            if (currentItemCol + newColSpan > NUM_COLS) newColSpan = NUM_COLS - currentItemCol;

            const trueItem = scheduleData[activeDateStr]?.find(i => i.id === item.id);
            if (trueItem) {
                trueItem.colSpan = newColSpan;
                if (trueItem.customWidthPct !== undefined) delete trueItem.customWidthPct;

                if (trueItem.seriesId) {
                    const currentDateObj = new Date(activeDateStr);
                    const allDates = Object.keys(scheduleData).filter(d => new Date(d) > currentDateObj);
                    allDates.forEach(d => {
                        const futureItems = scheduleData[d] || [];
                        futureItems.forEach(fItem => {
                            if (fItem.seriesId === trueItem.seriesId) {
                                fItem.colSpan = newColSpan;
                                if (fItem.customWidthPct !== undefined) delete fItem.customWidthPct;
                            }
                        });
                    });
                }
                saveData();
                renderTimeline();
            }
        };

        document.addEventListener("mousemove", onMoveX, { passive: false });
        document.addEventListener("mouseup", onUpX);
        document.addEventListener("touchmove", onMoveX, { passive: false });
        document.addEventListener("touchend", onUpX);
    };

    if (resizeHandleX) {
        resizeHandleX.addEventListener('mousedown', startResizeX);
        resizeHandleX.addEventListener('touchstart', startResizeX, { passive: false });
    }

    return b;
}

function renderDetailRoster() {
    if (!detailRoster) return;
    detailRoster.innerHTML = "";
    students.forEach(s => {
        const d = document.createElement("div");
        const gradient = getGradientForName(s);
        d.className = "px-3 py-1.5 rounded-full text-[11px] font-black text-white cursor-grab hover:scale-105 transition-all flex items-center gap-1.5 shadow-sm";
        d.style.background = gradient;
        d.style.textShadow = "0 1px 2px rgba(0,0,0,0.2)";
        d.draggable = true;
        d.ondragstart = (e) => { e.dataTransfer.setData("application/json", JSON.stringify({ type: 'student', value: s })); };
        d.innerHTML = `<span class="material-symbols-outlined text-white text-[12px]">person</span> ${s}`;
        detailRoster.appendChild(d);
    });
}

// ============================================
// MOBILE TIMELINE - Tap-to-Select UI
// ============================================
function renderMobileTimeline() {
    const activeSched = scheduleData[activeDateStr] || [];
    const timeToMins = t => { if (!t) return 0; const [h, m] = t.split(':').map(Number); return h * 60 + m; };

    // Hide right sidebar on mobile (not needed - we use bottom sheet)
    const sidebar = document.querySelector('#view-detail .w-80');
    if (sidebar) sidebar.style.display = 'none';

    // Make timeline container full width
    const timelineContainer = document.querySelector('#view-detail .flex-1.flex');
    if (timelineContainer) timelineContainer.style.flexDirection = 'column';

    // Build mobile time slot list
    const wrapper = document.createElement('div');
    wrapper.className = 'space-y-0 pb-32';

    // Build a map of which items cover which time slots
    // Key: timeStr, Value: array of items that START or SPAN into this slot
    const timelineStartMins = timelineStartHour * 60;
    const timelineEndMins = timelineEndHour * 60;

    // For each slot, find items that span into it
    const slotData = {};
    for (let m = timelineStartMins; m < timelineEndMins; m += 30) {
        const h = Math.floor(m / 60);
        const mins = m % 60;
        const timeStr = `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        slotData[timeStr] = { mins: m, startItems: [], spanItems: [] };
    }

    // Classify each item
    activeSched.filter(i => !i.inactive).forEach(item => {
        const startTime = item.startTime || item.time || '00:00';
        const startMins = timeToMins(startTime);
        const duration = item.duration || 60;
        const endMins = startMins + duration;

        for (let m = timelineStartMins; m < timelineEndMins; m += 30) {
            const h = Math.floor(m / 60);
            const mins = m % 60;
            const timeStr = `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
            if (m === startMins) {
                slotData[timeStr].startItems.push(item);
            } else if (m > startMins && m < endMins) {
                slotData[timeStr].spanItems.push(item);
            }
        }
    });

    // Render slots
    for (let m = timelineStartMins; m < timelineEndMins; m += 30) {
        const h = Math.floor(m / 60);
        const mins = m % 60;
        const timeStr = `${String(h).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
        const sd = slotData[timeStr];
        const hasStart = sd.startItems.length > 0;
        const hasSpan = sd.spanItems.length > 0;

        const slot = document.createElement('div');
        slot.className = 'flex items-stretch gap-3 px-4 transition-all';
        slot.style.minHeight = '40px';

        // Time label
        const timeLabel = document.createElement('div');
        timeLabel.className = 'text-[11px] font-black text-slate-400 dark:text-slate-500 w-12 shrink-0 text-right pt-2.5';
        timeLabel.textContent = timeStr;
        slot.appendChild(timeLabel);

        // Content area
        const contentArea = document.createElement('div');
        contentArea.className = 'flex-1 flex items-start gap-1.5 py-1 border-t border-slate-100 dark:border-slate-800 border-dashed min-h-[40px]';

        // Render items that START at this time
        sd.startItems.forEach(item => {
            const dur = item.duration || 60;
            const slots = Math.max(1, Math.round(dur / 30));
            const tag = document.createElement('div');
            const gradient = getGradientForName(item.value || '');
            const heightPx = slots * 40 - 4; // 40px per slot minus gap
            tag.className = 'px-3 rounded-xl text-[11px] font-black text-white flex items-center gap-1 shadow-sm';
            tag.style.background = gradient;
            tag.style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
            tag.style.height = `${heightPx}px`;
            tag.style.minWidth = '60px';
            const durLabel = dur >= 60 ? `${dur / 60}h` : `${dur}m`;
            tag.innerHTML = `<span class="truncate">${item.value || ''}</span><span class="text-[9px] opacity-70 ml-1">${durLabel}</span>`;

            // Tap to delete
            tag.onclick = (e) => {
                e.stopPropagation();
                showMobileDeleteConfirm(item, tag);
            };
            contentArea.appendChild(tag);
        });

        // If this slot only has spanning items (continuation), show a subtle indicator
        if (!hasStart && hasSpan) {
            const cont = document.createElement('div');
            cont.className = 'text-[9px] text-slate-300 dark:text-slate-600 italic pt-2';
            cont.textContent = '↕';
            contentArea.appendChild(cont);
        }

        // Add button (only if slot is not a continuation-only slot)
        if (!hasSpan || hasStart) {
            const addBtn = document.createElement('button');
            addBtn.className = 'w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 hover:bg-primary/20 active:scale-90 transition-all mt-1 ml-auto';
            addBtn.innerHTML = '<span class="material-symbols-outlined text-base">add</span>';
            addBtn.onclick = () => openMobileStudentSelector(timeStr);
            contentArea.appendChild(addBtn);
        }

        slot.appendChild(contentArea);
        wrapper.appendChild(slot);
    }

    detailTimeline.appendChild(wrapper);
}

function showMobileDeleteConfirm(item, tagEl) {
    // Toggle red state - tap again to confirm delete
    if (tagEl.dataset.confirmDelete === 'true') {
        // Second tap - delete
        const sched = scheduleData[activeDateStr] || [];
        const idx = sched.findIndex(i => i.id === item.id);
        if (idx >= 0) sched.splice(idx, 1);
        saveData();
        renderTimeline();
        return;
    }
    // First tap - show confirm state
    tagEl.dataset.confirmDelete = 'true';
    tagEl.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    tagEl.innerHTML = `<span class="material-symbols-outlined text-[12px]">delete</span><span class="truncate">삭제?</span>`;
    // Reset after 2 seconds
    setTimeout(() => {
        if (tagEl.isConnected) renderTimeline();
    }, 2000);
}

function openMobileStudentSelector(timeStr) {
    // Remove existing sheet
    const existing = document.getElementById('mobile-student-sheet');
    if (existing) existing.remove();

    const backdrop = document.createElement('div');
    backdrop.id = 'mobile-student-sheet';
    backdrop.className = 'fixed inset-0 z-[600] flex items-end justify-center';
    backdrop.style.background = 'rgba(0,0,0,0.3)';
    backdrop.style.backdropFilter = 'blur(4px)';
    backdrop.style.webkitBackdropFilter = 'blur(4px)';

    backdrop.onclick = (e) => {
        if (e.target === backdrop) closeMobileStudentSelector();
    };

    const sheet = document.createElement('div');
    sheet.className = 'w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl shadow-2xl p-6 pb-10';
    sheet.style.maxHeight = '70vh';
    sheet.style.overflowY = 'auto';
    sheet.style.animation = 'slideUp 0.25s ease-out';

    // Header + Duration selector + Student grid + Custom input
    sheet.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <div>
                <div class="text-lg font-black text-slate-900 dark:text-white">${timeStr}</div>
                <div class="text-xs font-bold text-slate-400">시간 → 학생 선택</div>
            </div>
            <button onclick="closeMobileStudentSelector()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-symbols-outlined text-slate-500 text-lg">close</span>
            </button>
        </div>
        <div class="mb-4">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">수업 시간</div>
            <div class="flex gap-2" id="mobile-duration-selector">
                <button data-dur="60" class="mobile-dur-btn px-4 py-2 rounded-xl text-xs font-black border-2 transition-all selected">1시간</button>
                <button data-dur="90" class="mobile-dur-btn px-4 py-2 rounded-xl text-xs font-black border-2 transition-all">1.5시간</button>
                <button data-dur="120" class="mobile-dur-btn px-4 py-2 rounded-xl text-xs font-black border-2 transition-all">2시간</button>
            </div>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-4" id="mobile-student-grid"></div>
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">커스텀 항목</div>
            <div class="flex gap-2">
                <input type="text" id="mobile-custom-input" placeholder="수업 이름..." class="flex-1 px-3 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent">
                <button onclick="addMobileCustomItem('${timeStr}')" class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl active:scale-95 transition-transform">추가</button>
            </div>
        </div>
    `;

    backdrop.appendChild(sheet);
    document.body.appendChild(backdrop);

    // Duration button styles
    window._mobileDuration = 60; // default
    const durBtns = sheet.querySelectorAll('.mobile-dur-btn');
    const updateDurStyles = () => {
        durBtns.forEach(b => {
            const dur = parseInt(b.dataset.dur);
            if (dur === window._mobileDuration) {
                b.style.background = 'var(--primary, #4f46e5)';
                b.style.color = 'white';
                b.style.borderColor = 'var(--primary, #4f46e5)';
            } else {
                b.style.background = 'transparent';
                b.style.color = '';
                b.style.borderColor = 'rgb(226,232,240)';
            }
        });
    };
    updateDurStyles();
    durBtns.forEach(b => {
        b.onclick = () => {
            window._mobileDuration = parseInt(b.dataset.dur);
            updateDurStyles();
        };
    });

    // Populate student grid
    const grid = document.getElementById('mobile-student-grid');
    students.forEach(s => {
        const btn = document.createElement('button');
        const gradient = getGradientForName(s);
        btn.className = 'px-3 py-3 rounded-2xl text-[12px] font-black text-white shadow-sm active:scale-90 transition-transform truncate';
        btn.style.background = gradient;
        btn.style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
        btn.textContent = s;
        btn.onclick = () => {
            addMobileStudentToTime(timeStr, s);
        };
        grid.appendChild(btn);
    });
}

window.closeMobileStudentSelector = () => {
    const sheet = document.getElementById('mobile-student-sheet');
    if (sheet) sheet.remove();
};

function addMobileStudentToTime(timeStr, studentName) {
    const dur = window._mobileDuration || 60;
    handleDropScheduleItem(timeStr, { type: 'student', value: studentName, col: 0, colSpan: 2, duration: dur });
    closeMobileStudentSelector();
    renderTimeline();
}

window.addMobileCustomItem = (timeStr) => {
    const input = document.getElementById('mobile-custom-input');
    const val = input ? input.value.trim() : '';
    if (!val) return;
    const dur = window._mobileDuration || 60;
    handleDropScheduleItem(timeStr, { type: 'custom', value: val, col: 0, colSpan: 2, duration: dur });
    closeMobileStudentSelector();
    renderTimeline();
};

window.createCustomClassItem = () => {
    const val = detailNewMemo.value.trim();
    if (!val) return;
    const tempItem = document.createElement("div");
    const gradient = getGradientForName(val);
    tempItem.className = "px-3 py-1.5 rounded-full text-[11px] font-black text-white cursor-grab hover:scale-105 transition-all flex items-center gap-1.5 shadow-sm animate-pulse";
    tempItem.style.background = gradient;
    tempItem.style.textShadow = "0 1px 2px rgba(0,0,0,0.2)";
    tempItem.draggable = true;
    tempItem.ondragstart = (e) => { e.dataTransfer.setData("application/json", JSON.stringify({ type: 'custom', value: val })); };
    tempItem.innerHTML = `<span class="material-symbols-outlined text-white text-[12px]">label</span> ${val}`;
    detailRoster.prepend(tempItem);
    detailNewMemo.value = "";
    detailNewMemo.focus();
};

function handleDropScheduleItem(time, data) {
    if (!scheduleData[activeDateStr]) scheduleData[activeDateStr] = [];

    // All items dropped from the sidebar are new additions
    addScheduleItem(time, data);
}

function addScheduleItem(time, data, precomputedSeriesId = null) {
    if (!scheduleData[activeDateStr]) scheduleData[activeDateStr] = [];
    const itemId = Math.random().toString(36).substr(2, 9);

    // V69: Use stable seriesId for students based on name to allow cross-day counting
    let seriesId = precomputedSeriesId;
    if (!seriesId && (data.type === 'student' || data.type === 'custom')) {
        const safeName = (data.value || "unknown").trim().replace(/\s+/g, '_');
        seriesId = `sid_${safeName}`;
    }
    if (!seriesId) {
        seriesId = Math.random().toString(36).substr(2, 9);
    }

    const newItem = {
        id: itemId,
        seriesId: seriesId,
        startTime: time,
        time: time, // backwards compatibility
        duration: data.duration || 60, // Default duration
        col: data.col !== undefined ? data.col : 0,
        colSpan: data.colSpan || 2,
        type: data.type,
        value: data.value,
        inactive: data.inactive || false,
        assignedLesson: "" // Initializes blank
    };
    scheduleData[activeDateStr].push(newItem);

    // Auto-sync: if student dropped on timeline, ensure they're in matrixState
    if (data.type === 'student' && data.value) {
        const sName = data.value.trim();
        if (!matrixState.students.find(s => s.name === sName)) {
            matrixState.students.push({
                id: 'ms_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
                name: sName,
                weekly: [false, false, false, false, false, false, false],
                overrides: {}
            });
            saveMatrixData();
        }
    }

    saveData();
    renderTimeline();

    // If it's a completely new drop (not part of an internal recurring loop), automate 104 weeks silently
    if (!precomputedSeriesId) {
        const currentDateObj = new Date(activeDateStr);
        // Register for roughly 2 years (104 weeks) to simulate infinite loop without crashing browser limits
        for (let w = 1; w <= 104; w++) {
            const nextDate = new Date(currentDateObj);
            nextDate.setDate(currentDateObj.getDate() + (w * 7));
            const nextDateStr = nextDate.toISOString().split('T')[0];

            if (!scheduleData[nextDateStr]) scheduleData[nextDateStr] = [];

            // Copy properties but with unique id, keeping seriesId intact
            scheduleData[nextDateStr].push({
                ...newItem,
                id: Math.random().toString(36).substr(2, 9)
            });
        }
        saveData();
        renderTimeline();
    }
}

/** Dynamic Lesson Logic */
function getLessonNumber(seriesId, targetDateStr, targetItemId) {
    if (!seriesId) return "";

    // Unify Student Counting logic with Matrix Global Count
    if (seriesId.startsWith("sid_")) {
        const items = scheduleData[targetDateStr] || [];
        const item = items.find(i => i.id === targetItemId);
        let sName = seriesId.substring(4).replace(/_/g, ' ');
        if (item && item.value) sName = item.value;

        const mStudent = matrixState.students.find(s => s.name === sName);
        if (mStudent) {
            return getGlobalCountForDate(mStudent, targetDateStr);
        }
    }

    const dates = Object.keys(scheduleData).sort();
    let currentLesson = 1;
    let isZeroFixed = false;

    const timeToMins = t => {
        if (!t) return 0;
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
    };

    for (let d of dates) {
        const items = scheduleData[d] || [];
        // Important: resolve items in the same day chronologically to sequence correctly if multiple occur
        const sortedItems = [...items].sort((a, b) => timeToMins(a.startTime || a.time) - timeToMins(b.startTime || b.time));

        for (let item of sortedItems) {
            if (item.seriesId === seriesId) {
                // Determine if user explicitly forced a number here
                if (item.assignedLesson !== undefined && item.assignedLesson !== null && item.assignedLesson !== "") {
                    currentLesson = parseInt(item.assignedLesson, 10);
                    isZeroFixed = (currentLesson === 0);
                }

                // If it's the exact item we're asking for, return its resolved number
                if (item.id === targetItemId && d === targetDateStr) {
                    return currentLesson !== null ? currentLesson : "";
                }

                // Before moving to next item chronologically, auto-increment unless zero or inactive
                if (currentLesson !== null && !isZeroFixed && !item.inactive) {
                    currentLesson++;
                }
            }
        }
    }
    return "";
}

window.updateLessonNumber = (id, newBaseStr) => {
    if (!scheduleData[activeDateStr]) return;
    const trueItem = scheduleData[activeDateStr].find(i => i.id === id);
    if (trueItem) {
        if (newBaseStr.trim() === "") {
            delete trueItem.assignedLesson;
        } else {
            const newBase = parseInt(newBaseStr, 10);
            if (!isNaN(newBase)) {
                trueItem.assignedLesson = newBase;
            }
        }

        // Cascade rule: When overwriting a lesson number, erase manual overrides in all future weeks of the same series
        if (trueItem.seriesId) {
            const currentDateObj = new Date(activeDateStr);
            const dates = Object.keys(scheduleData).filter(d => new Date(d) > currentDateObj);

            for (let d of dates) {
                const futureItems = scheduleData[d] || [];
                for (let fItem of futureItems) {
                    if (fItem.seriesId === trueItem.seriesId) {
                        delete fItem.assignedLesson;
                    }
                }
            }
        }

        // --- NEW CONTENT ---
        // Sync with Matrix state so Matrix view is immediately aware of manual overrides on badges
        if (trueItem.type === 'student') {
            const sName = trueItem.value;
            const mStudent = matrixState.students.find(s => s.name === sName);
            if (mStudent) {
                if (!mStudent.overrides[activeDateStr]) mStudent.overrides[activeDateStr] = {};
                if (newBaseStr.trim() === "") {
                    delete mStudent.overrides[activeDateStr].counter;
                    if (Object.keys(mStudent.overrides[activeDateStr]).length === 0) delete mStudent.overrides[activeDateStr];
                } else {
                    mStudent.overrides[activeDateStr].counter = parseInt(newBaseStr, 10);
                }
                saveMatrixData();
            }
        }
        // --- END NEW CONTENT ---

        saveData();
        renderTimeline();
    }
};

window.promptRemoveScheduleItem = (id) => {
    removeScheduleItem(id);
};

window.removeScheduleItem = (id) => {
    if (!scheduleData[activeDateStr]) return;
    const targetItem = scheduleData[activeDateStr].find(i => i.id === id);

    // Check if we need to cascade delete
    if (targetItem && targetItem.seriesId) {
        // Automatically delete future occurrences if it's a series
        const currentDateObj = new Date(activeDateStr);
        for (let w = 1; w <= 104; w++) {
            const nextDate = new Date(currentDateObj);
            nextDate.setDate(currentDateObj.getDate() + (w * 7));
            const nextDateStr = nextDate.toISOString().split('T')[0];
            if (scheduleData[nextDateStr]) {
                const fIndex = scheduleData[nextDateStr].findIndex(i => i.seriesId === targetItem.seriesId);
                if (fIndex > -1) {
                    scheduleData[nextDateStr].splice(fIndex, 1);
                }
            }
        }
    }

    scheduleData[activeDateStr] = scheduleData[activeDateStr].filter(i => i.id !== id);
    saveData();
    renderTimeline();
};

window.toggleScheduleStatus = (id) => {
    if (!scheduleData[activeDateStr]) return;
    const trueItem = scheduleData[activeDateStr].find(i => i.id === id);
    if (trueItem) {
        trueItem.inactive = !trueItem.inactive;
        saveData();
        renderTimeline();
    }
};

/**
 * MATRIX VIEW (Mon-Sun logic friendly)
 */
/**
 * MATRIX VIEW OVERHAUL (Independent Attendance & Tuition)
 */
function getGlobalCountForDate(student, targetDateStr) {
    const year = parseInt(targetDateStr.split('-')[0]);
    // UTC-safe local date string helper
    const toLocalISO = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    let currentDate = new Date(year, 0, 1);
    let count = student.baseCount !== undefined ? student.baseCount : 1;

    let latestOverrideDate = null;
    let latestOverrideCounter = null;
    if (student.overrides) {
        for (const date in student.overrides) {
            if (student.overrides[date].counter !== undefined && date <= targetDateStr) {
                if (!latestOverrideDate || date > latestOverrideDate) {
                    latestOverrideDate = date;
                    latestOverrideCounter = student.overrides[date].counter;
                }
            }
        }
    }

    if (latestOverrideDate) {
        if (latestOverrideDate === targetDateStr) return latestOverrideCounter;
        currentDate = new Date(latestOverrideDate);
        count = latestOverrideCounter;
        const dayIdx = currentDate.getDay();
        const ovr = student.overrides[latestOverrideDate];
        const dStrOvr = toLocalISO(currentDate);
        const hasTimelineOvr = (scheduleData[dStrOvr] || []).some(item => item.value === student.name && !item.inactive);
        if ((student.weekly[dayIdx] && !ovr.skip) || ovr.forceActive || hasTimelineOvr) count++;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    while (true) {
        const dStr = toLocalISO(currentDate);
        if (dStr > targetDateStr) break;
        const dayIdx = currentDate.getDay();
        const override = student.overrides[dStr] || {};
        const hasTimeline = (scheduleData[dStr] || []).some(item => item.value === student.name && !item.inactive);

        if (dStr === targetDateStr) return count;
        if ((student.weekly[dayIdx] && !override.skip) || override.forceActive || hasTimeline) {
            count++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getFullYear() > year) break;
    }
    return count;
}

window.renderMatrixView = (year, month) => {
    const headerRow = document.getElementById("matrix-header"),
        tBody = document.getElementById("matrix-body");
    if (!headerRow || !tBody) return;

    const dim = new Date(year, month + 1, 0).getDate();
    const daysArr = ["일", "월", "화", "수", "목", "금", "토"];

    // 1. Render Header
    let headerHtml = `
        <th class="p-4 sticky-col bg-slate-50 dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 min-w-[160px]">
            <span class="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Student</span>
        </th>
    `;

    for (let d = 1; d <= dim; d++) {
        const dateObj = new Date(year, month, d);
        const dayIdx = dateObj.getDay();
        const isSunday = dayIdx === 0;
        headerHtml += `
            <th class="matrix-header-cell border-r dark:border-slate-700 min-w-[60px] ${isSunday ? 'sunday-text' : 'text-slate-500 dark:text-slate-400'}">
                <div class="matrix-header-date">${d}</div>
                <div class="matrix-header-day">${daysArr[dayIdx]}</div>
            </th>
        `;
    }
    headerRow.innerHTML = headerHtml;

    // 2. Render Rows
    tBody.innerHTML = "";
    matrixState.students.forEach((student, sIdx) => {
        const tr = document.createElement("tr");
        const rowColor = getPastelColor(student.name);
        tr.className = "group matrix-row-pastel transition-colors";
        tr.style.backgroundColor = rowColor;

        // Name Cell with Order Controls
        let rowHtml = `
            <td class="p-4 sticky-col border-r dark:border-slate-700 font-bold" style="background-color: ${rowColor}">
                <div class="flex items-center gap-3">
                    <div class="flex flex-col gap-1">
                        <button onclick="moveMatrixRow(${sIdx}, -1)" class="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                            <span class="material-symbols-outlined text-[12px]">keyboard_arrow_up</span>
                        </button>
                        <button onclick="moveMatrixRow(${sIdx}, 1)" class="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                            <span class="material-symbols-outlined text-[12px]">keyboard_arrow_down</span>
                        </button>
                    </div>
                    <span class="text-sm font-black text-slate-700 dark:text-slate-200">${student.name}</span>
                </div>
            </td>
        `;

        // Calculate starting lesson number for the 1st of this month
        const firstOfMonthStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        let lessonCounter = getGlobalCountForDate(student, firstOfMonthStr);

        for (let d = 1; d <= dim; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dateObj = new Date(year, month, d);
            const dayIdx = dateObj.getDay();

            const override = student.overrides[dateStr] || {};
            const isWeeklyActive = student.weekly[dayIdx];
            const hasTimelineEntry = (scheduleData[dateStr] || []).some(item => item.value === student.name && !item.inactive);
            const isActive = (isWeeklyActive && !override.skip) || override.forceActive || hasTimelineEntry;

            // Start counter override
            if (override.counter !== undefined) {
                lessonCounter = override.counter;
            }

            // Increment counter if active
            let displayCount = "";
            if (isActive) {
                displayCount = lessonCounter;
                lessonCounter++;
            }

            const cellColor = override.color || "";

            const memoText = override.memo || '';
            const memoLen = memoText.length;
            // Auto-size: short text = bigger, long text = smaller
            const memoFontSize = memoLen <= 2 ? 14 : memoLen <= 4 ? 12 : memoLen <= 6 ? 10 : memoLen <= 10 ? 9 : 7;

            rowHtml += `
                <td class="matrix-cell border-r border-slate-100 dark:border-slate-800 p-0" onclick="openCellActions(${sIdx}, '${dateStr}', event)">
                    ${cellColor ? `<div class="color-overlay" data-matrix-color="${cellColor}"></div>` : ''}
                    ${override.memo ? `<div class="memo-indicator"></div>` : ''}
                    
                    <div class="absolute top-1 left-1 z-10 pointer-events-none">
                        <span class="lesson-badge ${isActive ? '' : 'inactive text-slate-300 dark:text-slate-700'}">
                            ${isActive ? (displayCount === 0 ? 0 : displayCount) : (isWeeklyActive ? 'X' : '')}
                        </span>
                    </div>

                    ${memoText ? `<div class="memo-inline" style="font-size:${memoFontSize}px">${memoText}</div>` : ''}
                </td>
            `;
        }
        tr.innerHTML = rowHtml;
        tBody.appendChild(tr);
    });
};

// --- Matrix Action Handlers ---

window.addMatrixStudent = () => {
    const name = prompt("학생 이름을 입력하세요:");
    if (name && name.trim()) {
        const trimmed = name.trim();
        // Add to main roster if not already there
        if (!students.includes(trimmed)) {
            students.push(trimmed);
            saveData();
        }
        // Add to matrix if not already there
        if (!matrixState.students.find(s => s.name === trimmed)) {
            matrixState.students.push({
                id: 'ms_' + Date.now(),
                name: trimmed,
                weekly: [false, false, false, false, false, false, false],
                overrides: {}
            });
            saveMatrixData();
        }
        renderAll();
    }
};

window.moveMatrixRow = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= matrixState.students.length) return;
    const temp = matrixState.students[idx];
    matrixState.students[idx] = matrixState.students[newIdx];
    matrixState.students[newIdx] = temp;
    saveMatrixData();
    renderAll();
};

window.toggleWeeklyActivation = (sIdx, dayIdx) => {
    matrixState.students[sIdx].weekly[dayIdx] = !matrixState.students[sIdx].weekly[dayIdx];
    saveMatrixData();
    renderAll();
};

window.incrementMatrixCounter = (sIdx, dateStr) => {
    const student = matrixState.students[sIdx];
    const year = parseInt(dateStr.split('-')[0]);
    const month = parseInt(dateStr.split('-')[1]) - 1;
    const day = parseInt(dateStr.split('-')[2]);
    const dim = new Date(year, month + 1, 0).getDate();

    // We need to find what the current count IS for this specific day
    let currentCalcCount = getGlobalCountForDate(student, dateStr);

    if (!student.overrides[dateStr]) student.overrides[dateStr] = {};
    student.overrides[dateStr].counter = currentCalcCount + 1;

    saveMatrixData();
    renderAll();
};

window.decrementMatrixCounter = (sIdx, dateStr) => {
    const student = matrixState.students[sIdx];
    let currentCalcCount = getGlobalCountForDate(student, dateStr);
    if (currentCalcCount <= 0) return;

    if (!student.overrides[dateStr]) student.overrides[dateStr] = {};
    student.overrides[dateStr].counter = currentCalcCount - 1;

    saveMatrixData();
    renderAll();
};

window.toggleDayState = (sIdx, dateStr) => {
    const student = matrixState.students[sIdx];
    if (!student.overrides[dateStr]) student.overrides[dateStr] = {};
    const override = student.overrides[dateStr];

    const d = new Date(dateStr);
    const dayIdx = d.getDay();
    const isWeekly = student.weekly[dayIdx];

    if (isWeekly) {
        // Toggle from Active to Skip
        override.skip = !override.skip;
    } else {
        // Toggle from Inactive to Force Active
        override.forceActive = !override.forceActive;
    }

    saveMatrixData();
    renderAll();
};

window.setMatrixColor = (sIdx, dateStr, color) => {
    if (!matrixState.students[sIdx].overrides[dateStr]) matrixState.students[sIdx].overrides[dateStr] = {};
    matrixState.students[sIdx].overrides[dateStr].color = color;
    closeCellActions();
    saveMatrixData();
    renderAll();
};

// --- Matrix Memo Logic ---
let currentMemoRef = null;

window.showMatrixMemo = (sIdx, dateStr) => {
    const student = matrixState.students[sIdx];
    const override = student.overrides[dateStr] || {};
    const modal = document.getElementById("matrix-memo-modal");
    const input = document.getElementById("matrix-memo-input");
    const dateLabel = document.getElementById("memo-date-label");
    const studentLabel = document.getElementById("memo-student-label");

    if (!modal || !input) return;

    currentMemoRef = { sIdx, dateStr };

    // Format date nicely
    const [y, m, d] = dateStr.split('-');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    dateLabel.textContent = `${months[parseInt(m) - 1]} ${d}, ${y}`;
    studentLabel.textContent = student.name;

    input.value = override.memo || "";
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    input.focus();
};

window.closeMatrixMemo = () => {
    const modal = document.getElementById("matrix-memo-modal");
    if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
    currentMemoRef = null;
};

window.saveMatrixMemo = () => {
    if (!currentMemoRef) return;
    const { sIdx, dateStr } = currentMemoRef;
    const input = document.getElementById("matrix-memo-input");
    const val = input ? input.value.trim() : "";

    if (!matrixState.students[sIdx].overrides[dateStr]) matrixState.students[sIdx].overrides[dateStr] = {};
    matrixState.students[sIdx].overrides[dateStr].memo = val;

    saveMatrixData();
    closeMatrixMemo();
    renderAll();
};

function getPastelColor(name) {
    if (!name) return "transparent";
    // Gentle pastel palette
    const colors = [
        "rgba(255, 230, 230, 0.4)", // Soft Red
        "rgba(230, 242, 255, 0.4)", // Soft Blue
        "rgba(235, 255, 235, 0.4)", // Soft Green
        "rgba(255, 250, 220, 0.4)", // Soft Yellow
        "rgba(242, 230, 255, 0.4)", // Soft Purple
        "rgba(255, 240, 230, 0.4)", // Soft Orange
        "rgba(230, 255, 250, 0.4)", // Soft Teal
        "rgba(255, 235, 245, 0.4)"  // Soft Pink
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
}

// --- Click-to-Open Cell Actions ---
let activeCellPanel = null;
let activeCellBackdrop = null;

window.openCellActions = (sIdx, dateStr, event) => {
    event.stopPropagation();
    closeCellActions();

    const student = matrixState.students[sIdx];
    const override = student.overrides[dateStr] || {};
    const dateObj = new Date(dateStr);
    const dayIdx = dateObj.getDay();
    const isWeeklyActive = student.weekly[dayIdx];

    // Create backdrop
    activeCellBackdrop = document.createElement('div');
    activeCellBackdrop.className = 'cell-actions-backdrop';
    activeCellBackdrop.onclick = () => closeCellActions();
    document.body.appendChild(activeCellBackdrop);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'cell-actions active';
    panel.innerHTML = `
        <button onclick="event.stopPropagation(); closeCellActions(); toggleWeeklyActivation(${sIdx}, ${dayIdx})" title="주간 활성" class="action-btn ${isWeeklyActive ? 'text-primary' : 'text-slate-400'}">
            <span class="material-symbols-outlined">event_repeat</span>
        </button>
        <button onclick="event.stopPropagation(); closeCellActions(); decrementMatrixCounter(${sIdx}, '${dateStr}')" title="-1" class="action-btn text-slate-400">
            <span class="material-symbols-outlined">exposure_neg_1</span>
        </button>
        <button onclick="event.stopPropagation(); closeCellActions(); incrementMatrixCounter(${sIdx}, '${dateStr}')" title="+1" class="action-btn text-slate-400">
            <span class="material-symbols-outlined">exposure_plus_1</span>
        </button>
        <button onclick="event.stopPropagation(); closeCellActions(); showMatrixMemo(${sIdx}, '${dateStr}')" title="메모" class="action-btn ${override.memo ? 'text-amber-500' : 'text-slate-400'}">
            <span class="material-symbols-outlined">${override.memo ? 'sticky_note_2' : 'edit_note'}</span>
        </button>
        <button onclick="event.stopPropagation(); closeCellActions(); toggleDayState(${sIdx}, '${dateStr}')" title="출결" class="action-btn ${override.skip || override.forceActive ? 'text-red-500' : 'text-slate-400'}">
            <span class="material-symbols-outlined">${override.skip ? 'check_circle' : 'block'}</span>
        </button>
        <div class="color-row">
            <div onclick="event.stopPropagation(); setMatrixColor(${sIdx}, '${dateStr}', 'red')" class="color-dot bg-red-500"></div>
            <div onclick="event.stopPropagation(); setMatrixColor(${sIdx}, '${dateStr}', 'blue')" class="color-dot bg-blue-500"></div>
            <div onclick="event.stopPropagation(); setMatrixColor(${sIdx}, '${dateStr}', 'green')" class="color-dot bg-green-500"></div>
            <div onclick="event.stopPropagation(); setMatrixColor(${sIdx}, '${dateStr}', 'yellow')" class="color-dot bg-yellow-500"></div>
            <div onclick="event.stopPropagation(); setMatrixColor(${sIdx}, '${dateStr}', '')" class="color-dot" style="background:#e2e8f0; border-color:#cbd5e1;">
            </div>
        </div>
    `;

    document.body.appendChild(panel);
    activeCellPanel = panel;

    // Position near click
    const rect = event.currentTarget.getBoundingClientRect();
    let x = rect.left + rect.width / 2 - 90; // center the 180px panel
    let y = rect.top - panel.offsetHeight - 8; // above the cell

    // Fallback if above goes offscreen
    if (y < 10) y = rect.bottom + 8;
    // Keep within viewport horizontally
    if (x < 10) x = 10;
    if (x + 180 > window.innerWidth) x = window.innerWidth - 190;

    panel.style.left = x + 'px';
    panel.style.top = y + 'px';
};

window.closeCellActions = () => {
    if (activeCellPanel) {
        activeCellPanel.remove();
        activeCellPanel = null;
    }
    if (activeCellBackdrop) {
        activeCellBackdrop.remove();
        activeCellBackdrop = null;
    }
};

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCellActions();
});

function htmlEscape(str) {
    return str;
}
