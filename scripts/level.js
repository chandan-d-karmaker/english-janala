const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(lesson => displayLesson(lesson.data))
}

const displayLesson= (lessons)=>{
    // get parent container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML="";

    // loop through every level
    for(const lesson of lessons){

        // create element
        const lessonBtn = document.createElement("div");
        lessonBtn.innerHTML= 
        `
            <button class="btn btn-outline btn-primary"><i class=" fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `

        // append child
        levelContainer.appendChild(lessonBtn);
    }

}

loadLesson();