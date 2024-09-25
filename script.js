const baseURL = "https://blockdictionary.onrender.com/"; 
        const result = document.getElementById("result");
        const sound = document.getElementById("sound");
        const btn = document.getElementById("search-btn");

        btn.addEventListener("click", () => {
            let inpWord = document.getElementById("inp-word").value.trim().toLowerCase(); 

            if (!inpWord) {
                alert("Please enter a word to search");
                return;
            }

            fetch(baseURL)  
                .then((response) => response.json())
                .then((data) => {
                    console.log("API Response:", data);

                    
                    let wordData = data.find(item => item.word.toLowerCase() === inpWord);

                    
                    if (wordData) {
                        result.innerHTML = `
                        <div class="word">
                            <h3>${wordData.word}</h3>
                            <button onclick="playSound()">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                        <div class="details">
                            <p><strong>Definition:</strong> ${wordData.definition || "No definition available"}</p>
                            <p><strong>Example:</strong> ${wordData.example || "No example available"}</p>
                        </div>`;

                        
                        sound.setAttribute("src", `https://example.com/audio/${wordData.word}.mp3`);
                    } else {
                        
                        result.innerHTML = `<h3 class="error">Word not found</h3>`;
                    }
                })
                .catch((error) => {
                    console.error("Error fetching word:", error);
                    result.innerHTML = `<p class="error">Couldn't Find The Word</p>`;
                });
        });

        function playSound() {
            if (sound.getAttribute("src")) {
                sound.play();
            } else {
                alert("No sound available for this word.");
            }
        }