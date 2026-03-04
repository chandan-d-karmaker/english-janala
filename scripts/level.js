const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(lesson => displayLesson(lesson.data))
}

const loadWords = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayWords(data.data));
}

const displayWords = (words)=>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML= "";
    wordContainer.classList.add('grid', 'grid-cols-1');
    wordContainer.classList.remove('py-16');

    for(const word of words){
        const wordCard = document.createElement("div");
        wordCard.innerHTML = 
        `
            <div class="text-center bg-base-100 rounded-xl p-10">
            <h2 class="text-3xl font-bold text-black mb-6">${word.word}</h2>
            <p class="text-xl font-medium text-black mb-6">Meaning/Pronunciation</p>
            <h1 class="text-3xl font-bold text-black bangla-font">${word.meaning} / ${word.pronunciation} </h1>

            <div class="flex justify-between mt-14">
                <div class="btn bg-[#1A91FF1A] hover:bg-[#1a90ff85]">
                    <i class="fa-solid fa-circle-info"></i>
                </div>
                <div class="btn bg-[#1A91FF1A] hover:bg-[#1a90ff85]">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
            </div>

        </div>
        
        `
        wordContainer.appendChild(wordCard);
    }
}

const displayLesson = (lessons) => {
    // get parent container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // loop through every level
    for (const lesson of lessons) {

        // create element
        const lessonBtn = document.createElement("div");
        lessonBtn.innerHTML =
            `
            <button onclick= "loadWords(${lesson.level_no})" class="btn btn-outline btn-primary"><i class=" fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `

        // append child
        levelContainer.appendChild(lessonBtn);
    }

}

loadLesson();