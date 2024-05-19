
const title=document.getElementById('title')
const des=document.getElementById('des')
const add=document.querySelector('.add')
const latest=document.querySelector('.latest')
const close=document.querySelector('.box')
const edit=document.querySelector('.model')
const title2=document.getElementById('title1')
const des1=document.getElementById('des1')
const edit1=document.querySelector('.edit')
let reset=document.querySelector('.reset')
let num=document.querySelector('#num')
let num1=document.querySelector('#num1')
let editor=document.querySelector('#editor1')
let nav1=document.querySelector('#cool-nav')
let nav1_a=document.querySelector('#cool-nav a')
console.log(editor);
reset.addEventListener('click',()=>{
    editor.value="";
    title.value=''
})

function id(){
    const url = new URL(window.location.href);

// Step 2: Use URLSearchParams to extract the 'id' parameter
const params = new URLSearchParams(url.search);
const idValue = params.get('id');
return idValue
}

let title1=''
let obj={
    title:title1,
    description:''
}

async function postFetch(url = "", data = {}) {
    try {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
      return "get a error! 👎";
    }
  };
 // Function to retrieve a cookie by name
function getCookie(cookieName) {
    // Split all cookies into an array
    const cookies = document.cookie.split(';');

    // Loop through each cookie
    for (let i = 0; i < cookies.length; i++) {
        // Split the cookie into name and value pairs
        const cookie = cookies[i].trim().split('=');

        // Check if the cookie name matches the provided name
        if (cookie[0] === cookieName) {
            // Return the cookie value
            return decodeURIComponent(cookie[1]);
        }
    }

    // Return null if cookie with provided name is not found
    return null;
}

  let payload={
    token:getCookie('token'),
  }
let fgdat2=postFetch("http://localhost:8000/limit",payload)

fgdat2.then((data)=>{
    console.log(data.length);
if(data.length!=0){
    data.map((ele)=>{
        elem(ele.title,ele.description,ele.id,ele.createdate)
    })
}
else{
// console.log(num);
latest.innerHTML="No Notes appears here"
num.innerHTML='➕ Add a New Note'
num1.href="./dashboard.html#"
}
    
})
// console.log(fgdat2);
title.addEventListener('keyup',(e)=>{
    e.preventDefault()
   title1=e.target.value
})
add.addEventListener('click',(e)=>{
    e.preventDefault()
    if(title1.length==0)
    {
        title1='Untitled'
    }
    obj={
        token:getCookie('token'),
        title:title1,
        description:(editor.value).trim(),
        createdate:Date.now()
    }
    console.log(obj);
    if(obj.title.length>0 &&obj.description.length>0)
    {
        let dat=postFetch('http://localhost:8000/post-a-note',obj)
        console.log(dat);
        setTimeout(()=>{
          location.reload();
        },2000)
        
    }
    

})
close.addEventListener('click',()=>{
    edit.style.display='none'
})
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    let mode='';
    if(hour>12)
    {
hour=hour-12;
mode='pm'
    }
    else
    {
        mode='am'
    }
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + '|   ' + hour + ':' + min +' '+ mode  ;
    return time;
  }
function elem(title,description,id,date){
    let elem1=document.createElement('div')
    elem1.className='note'
    elem1.id=id
    // console.log(elem1);
    let elem2=document.createElement('div')
    elem2.className='note-title'
    elem2.innerHTML='<a href="./id.html?id='+id+'"target="_blank"><h1>'+title+'</h1></a>'
    // console.log(elem2);
    let elem3=document.createElement('div')
    elem3.className='date'
    elem3.innerHTML='<p>'+timeConverter(date)+'</p>'
    elem1.append(elem2)
    elem1.append(elem3)
    latest.append(elem1)
}

function handle(e){
    // socket.emit("del",e.className);
    location.reload();
}
function edithandle(e){
    edit.style.display='block'
}
function openhandle(e){

}
edit1.addEventListener('click',()=>{
    let title=title2.value
    let description=des1.value
    let result={title,description}
    location.reload();
})
function delete_cookie(name) {
  document.cookie = name +'='+"/";
}
let check_user=async (token)=>{
    try {
    // Default options are marked with *
    const response = await fetch('http://localhost:8000/token-verfiy', {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({token}), // body data type must match "Content-Type" header
    });
  let data= response.json(); // parses JSON response into native JavaScript objects
    data.then(dat=>{
      if(!dat){
window.location.href='./login.html'
      }
    else{
nav1_a.innerHTML="Log Out"
    }
    })

  } catch (error) {
    return "get a error! 👎";
  }
  }
  check_user(getCookie('token'))

nav1_a.addEventListener("click",()=>{
  delete_cookie('token')
})