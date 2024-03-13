let notes = [
    {
        text: "NOTE #1",
        id: 1,
        isCompleyted: false
    },
    {
        text: "NOTE #2",
        id: 2,
        isCompleyted: true
    },
    {
        text: "NOTE #3",
        id: 3,
        isCompleyted: false
    },
]
//dom
const select = document.getElementById("todo-status")
const listDiv = document.querySelector(".todo-list")
const inputSearch = document.getElementById("search")
const theme = document.querySelector(".todo-theme");
const moon = document.querySelector(".bi-moon");
const sun = document.querySelector(".img1");
const over = document.querySelector(".overlay")
const plus = document.querySelector(".float-btn")
const cnBtn = document.querySelector(".btn.cancel")
const apBtn = document.querySelector("#apply")
const noteInput = document.querySelector("#note")


let selectedNoteId;


function pen(id) {
    selectedNoteId = id
    over.style.display = "block";
    const note = notes.find(el => el.id === id)
    noteInput.value = note.text
    apBtn.textContent = "Save"
}
renderNotes()

inputSearch.oninput = () => {
    const copyNotes = [].concat(notes)
    const not = copyNotes.filter(el => el.text.toLowerCase().includes(inputSearch.value))
    renderNotes(not)
    if (not.length === 0) {
        listDiv.innerHTML = `
 <img src= "./img/Detective-check-footprint 1.png" alt="" >
`
    }
}

select.onchange = () => {
    const copyNotes = [].concat(notes)

    if (select.value === 'complete') {
        const notes = copyNotes.filter(n => n.isCompleyted === true)
        renderNotes(notes)
    }
    else if (select.value === 'incomplete') {
        const notes = copyNotes.filter(n => n.isCompleyted === false)
        renderNotes(notes)
    } else if (select.value === 'all') {
        renderNotes(notes)
    }
}

function renderNotes(notesL = notes) {
    listDiv.innerHTML = ""
    notesL.forEach((el) => {
        listDiv.innerHTML += `
        <div class="list-item">
        <div class="text">
            <input type="checkbox" data-id="${el.id}"
             onchange ="change(event)" ${setChecked(el.isCompleyted)} />
            <span class="${setChecked(el.isCompleyted)}"> ${el.text}</span>
        </div>
        <div class = "item-btns">
            <button onclick = pen(${el.id})><i class="bi bi-pen"></i></button>
            <button onclick = "delNote(${el.id})"><i class="bi bi-trash3"></i></button>
        </div>
    </div>
        `})
}
renderNotes()

function setChecked(isTrue) {
    return isTrue ? "checked" : ""
}

function change(e) {
    const notId = e.target.getAttribute("data-id")
    notes = notes.map((el) => {
        if (el.id == notId) {
            return {
                ...el,
                isCompleyted: !el.isCompleyted
            }
        } else {
            return el
        }
    })
    renderNotes()
}
// parseInt()
let isOpenOver = false
let isOpenPlus = false

plus.onclick = () => {
    over.style.display = "block"
    apBtn.textContent = "Apply"
    noteInput.value = ""
}

cnBtn.onclick = () => over.style.display = "none"

apBtn.onclick = () => {
    if (apBtn.textContent === "Save") {
        notes = notes.map((n) => {
            if (n.id === selectedNoteId) {
                return { ...n, text: noteInput.value }
            } else {
                return n;
            }
        })
        renderNotes()
        over.style.display = "none"
        return
    }
    if (!noteInput.value.trim()) return
    over.style.display = "none"
    const newNote = {
        id: Math.random(),
        text: noteInput.value,
        isCompleyted: false
    }
    notes.push(newNote)
    renderNotes()
    noteInput.value = ""
}

isOpenflex = false
isOpenTheme = false
isOpenMoon = false
isOpenSun = false

theme.onclick = () => {
    isOpenTheme = !isOpenTheme
    let href = document.querySelector("#theme")
    if (isOpenTheme === true) {
        href.href = './dark.css'
        sun.style.display = ("block")
        moon.style.display = ("none")
    } else {
        href.href = './style.css'
        sun.style.display = ("none")
        moon.style.display = ("block")
    }
    console.log(href);
}

function delNote(id) {
    //filter
    notes = notes.filter((elem) => {
        return elem.id !== id
    })
    renderNotes()
}