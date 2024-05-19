const socket = io();
console.log(socket);
const header = document.querySelector("header");
fetch("http://localhost:8000/all")
  .then((res) => res.json())
  .then((data) => {
    data.map((ele, ind) => {
      elem(ele.title, ele.description, ele.id, timeConverter(ele.date));
    });
  });
  const close=document.querySelector('.box')
const edit=document.querySelector('.model')
const title2=document.getElementById('title1')
const des1=document.getElementById('des1')
const edit1=document.querySelector('.edit')
function elem(title, description, id, date) {
  let elem1 = document.createElement("div");
  elem1.className = "note";
  elem1.id = id;
  // console.log(elem1);
  let elem2 = document.createElement("div");
  elem2.className = "note-title";
  elem2.innerHTML = "<h1>" + title + "</h1>";
  // console.log(elem2);
  let elem3 = document.createElement("div");
  elem3.className = "note-paragraph";
  elem3.innerHTML =
    "<p>" +
    description +
    "</p>" +
    '<input type="button" value="Open" onClick=openhandle(this) id="Open" class=' +
    id +
    ' /><input type="button" value="Edit" onClick=edithandle(this) id="Edit"class=' +
    id +
    ' /><input type="button" value="Delete" id="Delete" onClick=handle(this) class=' +
    id +
    ' /><div class="fg">' +
    date +
    "</div>";
  // console.log(elem3);
  // elem3.innerHTML=''
  elem1.append(elem2);
  elem1.append(elem3);
  header.append(elem1);
}
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  let mode = "";
  if (hour > 12) {
    hour = hour - 12;
    mode = "pm";
  } else {
    mode = "am";
  }
  var min = a.getMinutes();
  var time =
    date + " " + month + " " + year + "|   " + hour + ":" + min + " " + mode;
  return time;
}

function handle(e) {
  socket.emit("del", e.className);
  location.reload();
}
edit1.addEventListener('click',()=>{
    let title=title2.value
    let description=des1.value
    
    let result={title,description}
    socket.emit('editable',result)
    location.reload();
})
function edithandle(e){
    edit.style.display='block'
    socket.emit('edit',e.className);
    socket.on('title',(result)=>{
        let {title,description}=result[0]
        title2.value=title
        des1.value=description
    })
    // console.log(e.p);
}
function openhandle(e){
    socket.emit('open',e.className);
}
edit1.addEventListener('click',()=>{
    let title=title2.value
    let description=des1.value
    
    let result={title,description}
    socket.emit('editable',result)
    location.reload();
})