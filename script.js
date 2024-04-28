let currentpage=1;
let allpage=10;
let totalemployee=0;

async function fetchemployees(){
    let dept = document.getElementById('department');
    let gen= document.getElementById('gender');
    let sal = document.getElementById('sort');
    let department=dept;
    let gender=gen;
    let salary=sal;
    // console.log(department)
    let url='https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
    if(department) url +='&filterBy=department&filterValue=${department}';
    if(gender) url +='&filterBy=gender&filterValue=${gender}';
    if(salary) url +='&sort=salary&filterValue=$(salary)';

    // const response=await fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees');
    // const data = await response.json();
    let res=await Response.json();
    fetch("url").then((res)>res.json()).then((data)=>{console.log(data)})
    totalemployee=data.totalemployee;
    fillemployee(data.employee);
}
function fillemployee(employees){
    const tableBody = document.getElementById('employeedetails');
    tableBody.innerHTML='';

    for(i=0;i<totalemployee;i++){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${(currentpage -1) * allpage + index +1}</td>
        <td>${employee.name}</td>
        <td>${employee.gender}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>`;
        tableBody.appendChild(row);
    }
    updatepagination();
}
function updatepagination(){
    const prev=document.getElementById('prev');
    const next=document.getElementById('next');

    if(currentpage ===1){
        prev.classList.add('disabled');
    }
    else{
        prev.classList.remove('disabled');
    }
    if(currentpage * allpage >= totalemployee){
        next.classList.add('disabled');
    }
    else{
        next.classList.add('diabled');
    }
}
function prev(){
    if(currentpage > 1){
        currentpage--;
        fetchemployees();
    }
}
function next(){
    if(currentpage * allpage < totalemployee){
        currentpage++;
        fetchemployees();
    }
}
fetchemployees();
