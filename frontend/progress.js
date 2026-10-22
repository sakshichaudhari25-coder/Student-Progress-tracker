const progressList=document.getElementById("progressList")

async function getProgress() {
    try{
        const response=await fetch("/student-progress");

        if(!response.ok){
            throw new Error("Failed to fetch progress")
        }

        const data=await response.json()
        progressList.innerHTML="";

        data.forEach(progress=>{
            const card=document.createElement("div");
            card.className="progress-card";

            const name=document.createElement("h3")
            name.textContent=progress.name

            const course =document.createElement("h4")
            course.textContent=progress.course

            const percentege=document.createElement("p")
            percentege.textContent=`Completion:${progress.completionPercentage}%`;

            const progressContainer =document.createElement("div")
            progressContainer.className="progress-container";

            const progressBar=document.createElement("div")
            progressBar.className="progress-bar";
            progressBar.style.width=`${progress.completionPercentage}%`;

            progressContainer.appendChild(progressBar)

            const deleteBtn=document.createElement("button")
            deleteBtn.textContent="delete"
            deleteBtn.className="delete-btn"

            deleteBtn.addEventListener("click",async()=>{
                if(!confirm("Are you sure you want to delete this progress")){
                    return
                } 
                try{
                    const deleteResponse=await fetch(`/student-progress/${progress._id}`,
                        {method:"DELETE"}
                    )

                    const result = await deleteResponse.json()

                    if(!deleteResponse.ok){
                        throw new Error(
                            result.message||"Failed to detele progress"
                        )
                    }

                    await getProgress()
                }catch (error){
                    console.error("Delete Error:", error)
                }
            })

            card.appendChild(name)
            card.appendChild(course)
            card.appendChild(percentege)
            card.appendChild(progressContainer)
            card.appendChild(deleteBtn)

            progressList.appendChild(card)

        })
    }catch(error){
        console.log("Error loading Progress:",error);
        progressList.innerHTML="<p>Failed to load progress.</p>"
        
    }
    
}

getProgress()