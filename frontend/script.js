const progress=document.getElementById("progressForm")

progress.addEventListener('submit',async(e)=>{
    e.preventDefault()

    const name=document.getElementById("name").value
    const course=document.getElementById("courseName").value
    const completionPercentage=document.getElementById("completionPercentage").value;

    try{
    const response=await fetch("/student-progress",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            course:course,
            completionPercentage:completionPercentage
        })
    })
    const data=await response.json()
    console.log(data);

    if(response.ok){
        alert("Student progress added successfully!");
        progress.reset()
    }else {
        alert("Failed to add progress")
    }
    }catch(error){
        console.log("Error:",error);
        
        
    }
    

})

async function loadProgress() {
    const response=await fetch("/student-progress")
    const data =await response.json()

    data.forEach((student)=>{
        const div=document.createElement("div");

        div.innerHTML=`
        <h3>${student.name}</h3>
        <p>Course:${student.course}</p>
        <p>Completion:${student.completionPercentage}%</p>`;

        result.appendChild(div)
    })
}
loadProgress()