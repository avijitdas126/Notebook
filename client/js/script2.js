const latest1=document.querySelector('.latest')
function elem(title,description,id,date){
    let elem1=document.createElement('div')
    elem1.className='note'
    elem1.id=id
    elem1.classList.add('container-flex')//container
    elem1.classList.add('flex-warp')
    let elem5=document.createElement('div')//row
    elem5.className='row'
    let elem65=document.createElement('div')//.col-md-6
    elem65.className='col-md-6'
    let elem652=document.createElement('div')//.col-md-6
    elem652.className='col-md-6'
    let elem6=document.createElement('div')
elem652.innerHTML='<button type="button" class="btn btn-success">Success</button>'
    // 
    // console.log(elem1);

    let elem2=document.createElement('div')
    elem2.className='note-title'
    elem2.innerHTML='<a href="./id.html?id='+id+'"target="_blank"><h1>'+title+'</h1></a>'
    // console.log(elem2);

    let elem3=document.createElement('div')
    elem3.className='date'
    elem3.innerHTML='<p>'+date+'</p>'
    // elem3.innerHTML='<p>'+description+'</p>'+'<input type="button" value="Open" id="Open" onClick=openhandle(this) class='+ id +' /><input type="button" value="Edit" id="Edit" onClick=edithandle(this) class='+id+' /><input type="button" value="Delete" id="Delete" onClick=handle(this) class='+ id +' /><div class="fg">'+date+'</div>'
    // console.log(elem3);
    // elem3.innerHTML=''
    elem1.append(elem5)
    elem1.append(elem6)
    elem5.append(elem2)
    elem5.append(elem3)
    latest1.append(elem1)
}
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