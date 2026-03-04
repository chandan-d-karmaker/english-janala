const createElements = (arr) =>{
    const htmlEle = arr.map(el => `<span class="btn">${el}</span>`);
    return htmlEle.join(" ");
}

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(lesson => displayLesson(lesson.data))
}

const removeActive = () => {
    const lessonActvBtn = document.querySelectorAll('.lesson-btn');
    for (const btn of lessonActvBtn) {
        btn.classList.remove('active');
    }
}

const loadWords = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const actvBtn = document.getElementById(`lesson-btn-${id}`);
            actvBtn.classList.add('active');
            displayWords(data.data)
        });
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML =
        `
                <div class="space-y-1">
                    <h2 class="text-3xl font-bold bangla-font">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                </div>
                <div class="space-y-1">
                    <h2 class="text-xl font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="space-y-1">
                    <h2 class="text-xl font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="space-y-1">
                    <h2 class="text-xl font-bold bangla-font">সমার্থক শব্দ গুলো</h2>
                    <div>${createElements(word.synonyms)}</div>
                </div>
    
    `
    document.getElementById('word_detail_modal').showModal();
}



const displayWords = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        
        <div class="col-span-full py-16">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="bangla-font mb-3  text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="text-3xl bangla-font font-medium text-[#292524]">নেক্সট Lesson এ যান</h3>
        </div>
        
        `;
        return;
    }
    wordContainer.classList.add('grid', 'grid-cols-1');
    wordContainer.classList.remove('py-16');

    for (const word of words) {
        const wordCard = document.createElement("div");
        wordCard.innerHTML =
            `
            <div class="text-center bg-base-100 rounded-xl p-10">
                <h2 class="text-2xl font-bold text-black mb-6">${word.word ? word.word : "Word not found"}</h2>
                <p class="font-medium text-black mb-6">Meaning/Pronunciation</p>
                <h1 class="text-2xl font-bold text-black bangla-font">${word.meaning ? word.meaning : "Meaning not found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not found"} </h1>

                <div class="flex justify-between mt-14">
                    <div onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF1A] hover:bg-[#1a90ff85]">
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
            <button id="lesson-btn-${lesson.level_no}" onclick= "loadWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class=" fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `

        // append child
        levelContainer.appendChild(lessonBtn);
    }

}

loadLesson();