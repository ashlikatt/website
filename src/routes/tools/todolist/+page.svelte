<!-- This is so different from the rest of my site, so it's directly copy-pasted from legacy. -->

<script lang="ts">
import { onMount } from "svelte";

function onContextMenu(e:any) {
    e.preventDefault();
    e.stopPropagation();
    return false;
};

const FADE_OUT = [
    {
        opacity: '100%',
        transform: 'translateY(0px)',
    },
    {
        opacity: '0%',
        transform: 'translateY(50px)',
        display: 'none',
    }
];

const COLOR_GROUPS = ["white_task", "blue_task", "green_task", "pink_task", "purple_task"];

class UserTask {
    title:any;
    description:any;
    daily:any;
    complete:any;
    colorGroup:any;
    element:any;

    constructor(title:any, description:any, daily:any, complete:any, colorGroup:any = 0) {
        this.element = undefined;
        this.title = title; // String
        this.description = description; // String or Null
        this.daily = daily; // True or False
        this.complete = complete; // False or timestamp completed
        this.colorGroup = colorGroup;

        this.createElement();
    }

    createElement() {
        const container = document.createElement("div");
        this.element = container;
        container.classList.add("task", COLOR_GROUPS[this.colorGroup]);
        const titleElem = document.createElement("h2");
        titleElem.classList.add("noselect");
        if (this.daily) titleElem.classList.add("daily");
        titleElem.textContent = this.title;
        container.appendChild(titleElem);
        if (this.description) {
            const desc = document.createElement('p');
            desc.classList.add("noselect");
            desc.textContent = this.description;
            container.appendChild(desc);
        }

        container.onmousedown = e => {
            e.preventDefault();
            e.stopPropagation();
            if (e.button === 0) { // LC
                if (!this.complete) {
                    this.disable();
                } else {
                    this.enable();
                }
                updateDisplay();
                saveData();
            } else if (e.button === 2) { // RC
                beginEditTask(this);
            }

            return false;
        }

        container.oncontextmenu = e => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        document.getElementById('tasklist')!.appendChild(container);
        if (this.complete) this.disable();
    }

    disable() {
        this.complete = Date.now();
        this.element.classList.add("complete");
    }

    enable() {
        this.complete = false;
        this.element.classList.remove("complete");
    }

    get sortScore() {
        return this.colorGroup + (this.complete === false ? 50 : 0);
    }
}








//////////////////// MAIN ////////////////////

var isFading:any = false;
var taskList:any[] = [];
var lastUpdateTimestamp:any = 0;
var resetUTCTime:any = 0;

onMount(() => {
    loadData();
    document.getElementById('body')!.style.display = 'block';
    updateDailyTasks();
    updateDisplay();
    setInterval(updateDailyTasks, 1000);

    document.getElementById('settingUTCOffset')!.oninput = updateSettingDisplay;
});






//////////////////// TASK CREATION ////////////////////

function createNewTask() {
    document.getElementById('newtaskpopup')!.style.display = 'block';
}

function stopCreateNewTask() {
    if (isFading) return;
    isFading = true;
    const elem:any = document.getElementById('newtaskpopup');
    const anim:any = elem.animate(FADE_OUT, 300);
    anim.onfinish = () => {
        elem.style.display = 'none';
        isFading = false;

        // Clear text
        for (let e of document.getElementsByClassName('clearOnClose') as any) {
            e.value = "";
        }

        // Reset radio
        for (let e of document.getElementsByClassName('radio') as any) {
            e.checked = false;
        }
        for (let e of document.getElementsByClassName('defaultRadio') as any) {
            e.checked = true;
        }
    }
}

function attemptFinalizeTask() {
    if (isFading) return;

    const inputOnce:any = (document.getElementById('inputOnce') as any).checked;
    const inputDaily:any = (document.getElementById('inputDaily') as any).checked;
    const inputTitle:any = (document.getElementById('inputTitle') as any).value;
    const inputDescription:any = (document.getElementById('inputDescription') as any).value;
    const colorID:any = parseInt((document.querySelector('input[name="color"]:checked') as any).value);

    if (!inputTitle) {
        warning(document.getElementById('createTaskButton'));
        warning(document.getElementById('inputTitle'));
        return;
    }

    const task = new UserTask(inputTitle, inputDescription, inputOnce === false, false, colorID);
    taskList.push(task);
    updateDisplay();
    saveData();

    isFading = false;
    stopCreateNewTask();
}

function warning(elem:any) {
    elem.animate([
        {backgroundColor: '#F00'},
        {}
    ], 400);
}









//////////////////// DATA & DISPLAY ////////////////////
function loadData() {
    const savedVersion = localStorage.getItem("version");
    lastUpdateTimestamp = localStorage.getItem("lasttimestampcheck") ?? 0;
    resetUTCTime = localStorage.getItem("utcOffset");
    if (resetUTCTime == null) {
        resetUTCTime = new Date().getTimezoneOffset();
    }

    if (savedVersion != null) {
        // Not new
        let list = JSON.parse(localStorage.getItem("data")!);
        taskList = list.map((x:any) => new UserTask(x.title, x.description, x.daily, x.complete, x.colorGroup ?? 0));
    }
}

function saveData() {
    localStorage.setItem("data", JSON.stringify(taskList, function(key, value) {
        if (key !== 'element') return value;
    }))
    localStorage.setItem("version", "1");
    localStorage.setItem("lasttimestampcheck", lastUpdateTimestamp);
    localStorage.setItem("utcOffset", resetUTCTime);
}

function updateDisplay() {
    const taskListDiv = document.getElementById('tasklist');
    const emptyTaskListDiv = document.getElementById('emptytasklist');

    if (taskList.length === 0) {
        // Empty
        taskListDiv!.style.display = 'none';
        emptyTaskListDiv!.style.display = 'block';

    } else {
        // Not empty
        taskListDiv!.style.display = 'block';
        emptyTaskListDiv!.style.display = 'none';


        let currentY = document.getElementsByTagName('html')[0].getBoundingClientRect().top + document.documentElement.scrollTop;

        for (let task of taskList.sort((a, b) => b.sortScore - a.sortScore)) {
            const elem = task.element;
            elem.style.top = currentY + "px";
            const height = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
            currentY += height + 10;
        }

        document.getElementById('tasklist')!.style.height = currentY + "px";
    }
}








//////////////////// EDITING TASKS ////////////////////

var editingTask:any = undefined;

function beginEditTask(task:any) {
    editingTask = task;
    (document.getElementById('editOnce') as any).checked = !task.daily;
    (document.getElementById('editDaily') as any).checked = task.daily;
    (document.getElementById('editTitle') as any).value = task.title;
    (document.getElementById('editDescription') as any).value = task.description ?? "";
    for (let elem of document.getElementsByClassName('editcolor') as any) {
        elem.checked = parseInt(elem.value) === task.colorGroup;
    }
    document.getElementById('edittaskpopup')!.style.display = 'block';
}

function stopEditTask() {
    if (isFading) return;
    isFading = true;
    const elem:any = document.getElementById('edittaskpopup');
    const anim:any = elem.animate(FADE_OUT, 300);
    anim.onfinish = (_:any) => {
        elem.style.display = 'none';
        isFading = false;
    }
}

function attemptEditTask() {
    if (isFading) return;

    const inputOnce = (document.getElementById('editOnce') as any).checked;
    const inputDaily = (document.getElementById('editDaily') as any).checked;
    const inputTitle = (document.getElementById('editTitle') as any).value;
    const inputDescription = (document.getElementById('editDescription') as any).value;
    const colorID = parseInt((document.querySelector('input[name="editcolor"]:checked') as any).value);

    if (!inputTitle) {
        warning(document.getElementById('createTaskButton'));
        warning(document.getElementById('editTitle'));
        return;
    }

    editingTask.title = inputTitle;
    editingTask.description = inputDescription;
    editingTask.daily = inputOnce === false;
    editingTask.colorGroup = colorID;

    editingTask.element.remove();
    editingTask.createElement();
    updateDisplay();
    saveData();


    isFading = false;
    stopEditTask();
}

function deleteTask() {
    if (isFading) return;

    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].element === editingTask.element) {
            taskList.splice(i, 1);
            break;
        }
    }
    editingTask.element.remove();
    updateDisplay();
    saveData();

    editingTask = undefined;
    isFading = false;
    stopEditTask();
}






//////////////////// DAILY RESET ////////////////////

function updateDailyTasks() {
    const offset = resetUTCTime*1000*60*60;
    if (timestampToDay(lastUpdateTimestamp + offset) !== timestampToDay(Date.now() + offset)) {
        for (let t of taskList) {
            if (t.complete && t.daily) {
                t.enable();
            }
        }
        lastUpdateTimestamp = Date.now();
        updateDisplay();
        saveData();
    }
}

function timestampToDay(x:any) {
    return Math.floor(x/1000/60/60/24);
}








//////////////////// SETTINGS ////////////////////

function settingsMenu() {
    (document.getElementById('settingUTCOffset') as any).value = resetUTCTime;

    updateSettingDisplay();

    document.getElementById('settingsbox')!.style.display='block';
}

function closeSettings() {
    if (isFading) return;
    isFading = true;

    const elem:any = document.getElementById('settingsbox');
    const anim:any = elem.animate(FADE_OUT, 300);
    anim.onfinish = (_:any) => {
        elem.style.display = 'none';
        isFading = false;
    }
}

function updateSettings() {
    if (isFading) return;
    resetUTCTime = (document.getElementById('settingUTCOffset') as any).value;

    saveData();

    isFading = false;
    closeSettings();
}

function updateSettingDisplay() {
    const val = (document.getElementById('settingUTCOffset') as any).value;
    if (val == 0) {
        document.getElementById('timezonedisplay')!.textContent = "Time Zone (UTC)";
    } else if (val > 0 && val <= 12) {
        document.getElementById('timezonedisplay')!.textContent = "Time Zone (UTC+" + val + ")";
    } else if (val < 0 && val >= -12) {
        document.getElementById('timezonedisplay')!.textContent = "Time Zone (UTC" + val + ")";
    } else {
        document.getElementById('timezonedisplay')!.textContent = "Time Zone (err)";
    }
}








//////////////////// FILE ////////////////////

function downloadData() {
    let data:any = {};

    data.data = taskList
    data.version = 1;
    data.lasttimestampcheck = lastUpdateTimestamp;
    data.utcOffset = resetUTCTime;

    download("data.todolist", JSON.stringify(data, function(key, value) {
        if (key !== 'element') return value;
    }));
}

function uploadData() {
    request((data:any) => {
        let json = JSON.parse(data);
        
        lastUpdateTimestamp = json.lasttimestampcheck;
        resetUTCTime = json.utcOffset;

        let list = json.data;
        taskList = list.map((x:any) => new UserTask(x.title, x.description, x.daily, x.complete, x.colorGroup ?? 0));

        document.getElementById('tasklist')!.innerHTML = '';
        saveData();
        loadData();
        closeSettings();
    })
}

function download(filename:any, text:any) {
	let e = document.createElement('a');
	e.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	e.setAttribute('download', filename);
	e.style.display = 'none';
	document.body.appendChild(e);
	e.click();
	document.body.removeChild(e);
}

function request(onload:any) {
    let input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = (e:any) => { 
       let file = e.target.files[0]; 
       let reader = new FileReader();
       reader.readAsText(file,'UTF-8');
       reader.onload = readerEvent => {
          onload(readerEvent.target!.result)
          input.remove();
       }
    }
    
    input.click();
}
</script>

<svelte:document on:contextmenu={onContextMenu} />
<svelte:window on:beforeunload={saveData} />


<noscript>
    <h1 class="fadein">JavaScript is disabled. This page requires JavaScript to run.</h1>
</noscript>

<div class="wrapper">


    <div id="body" class="hidden">
        <p id="warning">
            Note: This page uses localStorage to remember your to-do information when you exit.<br>
            This data is only stored locally on your computer, and will be lost if you clear browsing data!<br><br>
            Left Click to mark tasks as complete.<br>
            Right Click to edit existing tasks.</p>

        <h1 class="fadein" id="title">Your To-Do List:</h1>

        <div id="tasklist">

        </div>

        <h1 id="emptytasklist">(No tasks to display)</h1>

        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h1 id="newtask" on:click={createNewTask}>Create New Task</h1>

        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <h1 id="settings" on:click={settingsMenu}>Settings</h1>
    </div>

    <div id="newtaskpopup" class="hidden modal">
        <div class="popup">
            <h1 class="title">Create New Task:</h1>

            <button class="leftbutton" on:click={stopCreateNewTask}>Cancel</button>
            <button class="rightbutton" id="createTaskButton" on:click={attemptFinalizeTask}>Create</button>

            <div class="section">
                <h2>Task Information</h2>
                <input id="inputTitle" class="clearOnClose" type="text" placeholder="Task title" autocomplete="off">
                <input id="inputDescription" class="clearOnClose" type="text" placeholder="Task description (Optional)" autocomplete="off">
            </div>

            <div class="section">
                <h2>Task Schedule</h2>

                <label class="container">
                    <input id="inputDaily" class="defaultRadio" type="radio" checked name="schedule">
                    <span class="radio_background">Daily</span>
                </label>

                <label class="container">
                    <input id="inputOnce" class="radio" type="radio" name="schedule">
                    <span class="radio_background">Once</span>
                </label>
            </div>

            <div class="section">
                <h2 >Color Group</h2>

                <label class="color-container">
                    <input id="inputColorPurple" class="radio" type="radio" name="color" value="4">
                    <div class="color_background purple_button"></div>
                </label>

                <label class="color-container">
                    <input id="inputColorPink" class="radio" type="radio" name="color" value="3">
                    <div class="color_background pink_button"></div>
                </label>

                <label class="color-container">
                    <input id="inputColorGreen" class="radio" type="radio" name="color" value="2">
                    <div class="color_background green_button"></div>
                </label>

                <label class="color-container">
                    <input id="inputColorBlue" class="radio" type="radio" name="color" value="1">
                    <div class="color_background blue_button"></div>
                </label>


                <label class="color-container">
                    <input id="inputColorWhite" class="defaultRadio" type="radio" checked name="color" value="0">
                    <div class="color_background white_button"></div>
                </label>
            </div>
            

        </div>
    </div>

    <div id="edittaskpopup" class="hidden modal">
        <div class="popup">
            <h1 class="title">Edit Task:</h1>

            <button class="leftbutton" on:click={stopEditTask}>Cancel</button>
            <button class="rightbutton" on:click={attemptEditTask}>Update</button>

            <div class="section">
                <h2>Task Information</h2>
                <input id="editTitle" class="clearOnClose" type="text" placeholder="Task title" autocomplete="off">
                <input id="editDescription" class="clearOnClose" type="text" placeholder="Task description (Optional)" autocomplete="off">
            </div>

            <div class="section">
                <h2>Task Schedule</h2>

                <label class="container">
                    <input id="editDaily" class="defaultRadio" type="radio" checked name="editschedule">
                    <span class="radio_background">Daily</span>
                </label>

                <label class="container">
                    <input id="editOnce" class="radio" type="radio" name="editschedule">
                    <span class="radio_background">Once</span>
                </label>
            </div>

            <div class="section">
                <h2>Color Group</h2>

                <label class="color-container">
                    <input id="editColorPurple" class="radio editcolor" type="radio" name="editcolor" value="4">
                    <div class="color_background purple_button"></div>
                </label>

                <label class="color-container">
                    <input id="editColorPink" class="radio editcolor" type="radio" name="editcolor" value="3">
                    <div class="color_background pink_button"></div>
                </label>
                
                <label class="color-container">
                    <input id="editColorGreen" class="radio editcolor" type="radio" name="editcolor" value="2">
                    <div class="color_background green_button"></div>
                </label>

                <label class="color-container">
                    <input id="editColorBlue" class="radio editcolor" type="radio" name="editcolor" value="1">
                    <div class="color_background blue_button"></div>
                </label>

                <label class="color-container">
                    <input id="editColorWhite" class="defaultRadio editcolor" type="radio" checked name="editcolor" value="0">
                    <div class="color_background white_button"></div>
                </label>
            </div>

            <button class="bottombutton" on:click={deleteTask}>Delete</button>
        </div>
    </div>

    <div id="settingsbox" class="hidden modal">
        <div class="popup">
            <h1 class="title">Settings and Preferences:</h1>

            <button class="leftbutton" on:click={closeSettings}>Cancel</button>
            <button class="rightbutton" on:click={updateSettings}>Update</button>

            <div class="section">
                <h2 id="timezonedisplay">Time Zone (UTC)</h2>
                <p>Daily tasks will automatically un-check themselves at 00:00 daily</p>
                <input id="settingUTCOffset" class="clearOnClose" type="range" min="-12" max="12" value="0" autocomplete="off">
            </div>

            <div class="section">
                <button on:click={downloadData}>Download Save Data</button>
                <button on:click={uploadData}>Upload Save Data</button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../../../lib/palette.scss";

    #newtask, #settings {
        position:fixed;
        right:20px;
        top:20px;
        padding: 20px;
        font-size: 15px;

        animation: fadein;
        animation-duration: 1s;
        animation-delay: 1s;
        opacity: 0%;
        animation-fill-mode: both;

        width: fit-content;
        height:fit-content;

        background-color: #555;
        color: #AAA;
        border-radius: 10px;
        transition:0.1s;
    }

    #newtask:hover, #settings:hover {
        cursor:pointer;
        background-color: #777;
        color: #CCC;
        transition:0.1s;
    }


    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */

        background-color: #00000099;
        border-color: #00000099;
        border-width: 50px;
        animation-fill-mode: both;
    }

    .popup {
        display:block;
        position: absolute;
        left:10%;
        top:10%;
        width:80%;
        height:80%;
        
        background-color: #777;
        border-radius: 10px;
        color: #FFF;

        animation: fadein;
        animation-duration: 0.5s;

        overflow-y: auto;
    }

    .popup button {
        display:block;
        border:none;
        width: 25%;
        background-color: #AAA;
        border-radius: 10px;
        margin: 10px;
        padding: 15px;
        text-align:center;
        font-family: 'Verdana', Verdana, sans-serif;
        font-size: 20px;

        cursor:pointer;
        transition: 0.1s;
    }

    .popup button:hover {
        background-color: #CCC;
    }

    .popup .bottombutton {
        display:block;
        padding:10px;
        margin:30px auto;
    }

    .title {
        max-width: 50%;
        text-wrap:wrap;
        word-break:break-all;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }

    .rightbutton {
        position:absolute;
        right: 20px;
        top: 20px;
        max-width: 25%;
    }

    .leftbutton {
        position:absolute;
        left: 20px;
        top: 20px;
        max-width: 25%;
    }


    .popup input[type="range"] {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 50%; /* Full-width */
    height: 5px; /* Specified height */
    background: #AAA; /* Grey background */
    outline: none; /* Remove outline */
    }

    .popup input[type="range"]::-webkit-range-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 20px; /* Set a specific slider handle width */
        height: 20px; /* Slider handle height */
        background: #FFF; /* Green background */
        cursor: pointer; /* Cursor on hover */
        outline:none;
        border:none;
        border-radius: 50%;
    }

    .popup input[type="range"]::-moz-range-thumb {
        width: 20px; /* Set a specific slider handle width */
        height: 20px; /* Slider handle height */
        background: #FFF; /* Green background */
        outline:none;
        border:none;
        cursor: pointer; /* Cursor on hover */
        border-radius: 50%;
    }
    


    .popup .section {
        display:block;
        padding:10px;
        margin:30px;
        background-color: #444;
        border-radius: 10px;
        color: #FFF;
    }

    input[type="text"] {
        border:none;
        background-color: #CCC;
        border-radius: 10px;
        margin: 10px;
        padding: 10px;
        width: 50%;
        text-align:center;
        font-family: 'Verdana', Verdana, sans-serif;
        font-size: 20px;
        outline:none;
        transition: 0.1s;
    } 
    input[type="text"]:focus {
        background-color: #FFF;
        transition: 0.1s;
    }

    /* The container */
    .container {
        margin: 10px auto;
        display: inline-block;
        position: relative;
        cursor: pointer;
        width: max-content;
        text-align:center;
        color: #000;
        padding:10px;
    }

    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .radio_background {
        background-color:#AAA;
        border-radius: 10px;
        width: max-content;
        padding:10px;
        transition: 0.1s;
    }

    .container:hover input ~ .radio_background {
        background-color:#CCC;
        transition: 0.1s;
    }

    .container input:checked ~ .radio_background {
        background-color:#FFF;
        transition: 0.1s;
    }



    .color-container {
        margin: 10px auto;
        display: inline-block;
        position: relative;
        cursor: pointer;
        width: auto;
        text-align:center;
        color: #000;
        padding:5px;
    }

    .color-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    .color_background {
        border-style: solid;
        border-width: 5px;
        border-radius: 10px;
        width: max-content;
        padding: 20px;
        transition: 0.1s;
    }


    .color-container input:checked ~ .color_background {
        border-color: #FFF;
        transition: 0.1s;
    }

    .purple_button { background-color: hsl(260 50% 80%); border-color:hsl(260 50% 80%) }
    .green_button { background-color:hsl(120 50% 80%); border-color:hsl(120 50% 80%) } 
    .pink_button { background-color:hsl(0 50% 80%); border-color:hsl(0 50% 80%) }
    .blue_button { background-color:hsl(190 50% 80%); border-color:hsl(190 50% 80%) }
    .white_button { background-color:hsl(0 0% 80%); border-color:hsl(0 0% 80%) }

    .section button {
        display:inline-block;
        position:relative;
        margin: 30px auto;
        width: 30%;
    }

    .wrapper {
        background-color: #000;
        color: #FFF;
        text-align: center;
        font-family: 'Verdana', Verdana, sans-serif;
        font-weight:bold;
        font-size: 20px;
        height: 100vh;
        margin: 0px;
        padding: 0px;
        display:flex;
        flex-direction: column;
    }

    :global(html) {
        scrollbar-color: $SCROLLBAR_THUMB_COLOR $SCROLLBAR_TRACK_COLOR;
        scrollbar-width: 12px;
        background-color: $PAGE_BACKGROUND_FALLBACK_COLOR;
        margin: 0px;
        padding: 0px;

        background-image: $PAGE_BACKGROUND_URL;
    }

    :global(body) {
        margin: 0px;
        padding: 0px;
    }

    .wrapper, #body {
        margin: 0px;
        padding: 0px;
    }

    h2 {
        font-size: 25px;
        margin: 20px;
        padding: 0px;
    }

    p {
        font-size: 15px;
        margin: 10px;
        padding: 0px;
        color: #BBB;
    }

    .hidden {
        display: none;
    }

    @keyframes fadein {
        from {
            opacity: 0%;
            transform: translateY(50px);
        }
        to {
            opacity: 100%;
            transform: translateY(0px);
        }
    }

    .fadein {
        margin: 30px;

        animation: fadein;
        animation-duration: 1s;
        opacity: 0%;
        animation-fill-mode: both;
    }

    #settings {
        left: 20px;
    }

    * {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                        supported by Chrome, Edge, Opera and Firefox */
    }

    .wrapper :global(.vertcenter) {
        margin:auto;
        padding: 25%;
    }

    #warning {
        position:fixed;
        left:10px;
        bottom:10px;
        text-align: left;
        color:#444;
        font-size: 10px;
    }

    #emptytasklist {
        display:none;
        margin: 30px auto;
        padding: 20px;
        font-size: 20px;

        animation: fadein;
        animation-duration: 1s;
        animation-delay: 0.5s;
        opacity: 0%;
        animation-fill-mode: both;

        width: max-content;

        color: #333;
        border-radius: 10px;
    }

    #tasklist {
        display:block;
        position:relative;
        animation: fadein;
        animation-duration: 1s;
        animation-delay: 0.5s;
        opacity: 0%;
        animation-fill-mode: both;
    }

    .wrapper :global(.task) {
        display:block;
        position:absolute;
        padding:10px;
        margin: 10px auto;
        width: max-content;
        max-width: 60ch;
        min-width: 10ch;
        text-wrap:wrap;
        word-break:break-all;
        border-left: 8px solid hsl(0 0% 60%);
        background-color: #444;
        border-radius: 10px;
        color: #FFF;
        transition: 0.5s;
        left: 50%;
        transform: translateX(-50%);
    }
    .wrapper :global(.task:hover) {
        background-color: #666;
        cursor:pointer;
    }



    .wrapper :global(.blue_task) {
        border-left: 8px solid hsl(190 30% 60%);
        background-color:hsl(190 25% 40%);
    }
    .wrapper :global(.green_task) {
        border-left: 8px solid hsl(120 30% 60%);
        background-color:hsl(120 25% 40%);
    }
    .wrapper :global(.pink_task) {
        border-left: 8px solid hsl(0 30% 60%);
        background-color:hsl(0 25% 40%);
    }
    .wrapper :global(.purple_task) {
        border-left: 8px solid hsl(260 30% 60%);
        background-color: hsl(260 25% 40%);
    }

    .wrapper :global(.blue_task:hover) {
        background-color:hsl(190 25% 50%);
    }
    .wrapper :global(.green_task:hover) {
        background-color:hsl(120 25% 50%);
    }
    .wrapper :global(.pink_task:hover) {
        background-color:hsl(0 25% 50%);
    }
    .wrapper :global(.purple_task:hover) {
        background-color: hsl(260 25% 50%);
    }



    .wrapper :global(.complete) {
        background-color: #111;
        color: #44444499;
        border-left: 8px solid hsl(0 0% 10%);
    }

    .wrapper :global(.complete:hover) {
        background-color: #141414;
        color: #44444499;
        cursor:default;
        z-index: 2;
    }


    .wrapper :global(.blue_task.complete) {
        border-left: 8px solid hsl(190 30% 10%);
        background-color:hsl(190 25% 5%);
    }
    .wrapper :global(.green_task.complete) {
        border-left: 8px solid hsl(120 30% 10%);
        background-color:hsl(120 25% 5%);
    }
    .wrapper :global(.pink_task.complete) {
        border-left: 8px solid hsl(0 30% 10%);
        background-color:hsl(0 25% 5%);
    }
    .wrapper :global(.purple_task.complete) {
        border-left: 8px solid hsl(260 30% 10%);
        background-color: hsl(260 25% 5%);
    }


    .wrapper :global(.complete h2) {
        color: #44444499;
        /* text-decoration: line-through #555 solid 2px; */
    }

    .wrapper :global(.complete p) {
        color: #44444499;
        /* text-decoration: line-through #555 solid 2px; */
    }

    .wrapper :global(.daily::after) {
        content: " ⭮";
        color: #FFFFFF22;
    }
</style>