document.addEventListener("DOMContentLoaded", () => {
  fetch("../Multipage/CV.data.json")
    .then((response) => response.json())
    .then((data) => {
      const educationContainer = document.getElementById("education");
      const workContainer = document.getElementById("work");
      const certificateContainer = document.getElementById("certificates");
      const languageContainer = document.getElementById("languages");

      // Education
      data.education.forEach((item) => {
        educationContainer.innerHTML += `
          <div class="cv-item">
            <h3>${item.title}</h3>
            <p><strong>${item.period}</strong></p>
            <ul>
              ${item.description.map((desc) => `<li>${desc}</li>`).join("")}
            </ul>
          </div>
        `;
      });

      // Work
      data.work.forEach((item) => {
        workContainer.innerHTML += `
          <div class="cv-item">
            <h3>${item.title}</h3>
            <p><strong>${item.period}</strong></p>
            <ul>
              ${item.description.map((desc) => `<li>${desc}</li>`).join("")}
            </ul>
          </div>
        `;
      });

      // Certificates
      certificateContainer.innerHTML += `
    <div class="cv-item">
        <h3>Certifikat</h3>
        <ul>
        ${data.certificates.map((cert) => `<li>${cert}</li>`).join("")}
        </ul>
    </div>
    `;

      // Languages
      languageContainer.innerHTML += `
    <div class="cv-item">
        <h3>Språk</h3>
        <ul>
        ${data.languages.map((lang) => `<li>${lang.language} - ${lang.level}</li>`).join("")}
        </ul>
    </div>
    `;
    })
    .catch((error) => {
      console.error("Något gick fel:", error);
    });
});

//Code to have a click easter egg in the right corner
document.addEventListener("click", (event) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (
    event.shiftKey &&
    event.clientX > windowWidth - 40 &&
    event.clientY > windowHeight - 40
  ) {
    document.body.style.background = "yellow";
    document.body.style.color = "blue";
  }
});

//easter egg 2 code för when pressing certain numbers.
let secretCode = "";
const correctCode = "789";

const eggModal = document.getElementById("eggModal");
const closeBtn = document.getElementById("closeModal");

document.addEventListener("keydown", (event) => {
  secretCode += event.key;

  secretCode = secretCode.slice(-3);

  if (secretCode === correctCode && eggModal) {
    eggModal.classList.add("show");
  }
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    eggModal.classList.remove("show");
  });
}

//Github repositories
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("githubProjects");
  const loading = document.getElementById("loading");

  fetch(`https://api.github.com/users/VISORKILLEN/starred`)
    .then((response) => response.json())
    .then((repos) => {
      //take away loading text
      if (loading) {
        loading.remove();
      }

      //Sort after latest uppdated
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

      repos.forEach((repo) => {
        //Skiping forks
        if (repo.fork) return;

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <h2>${repo.name}</h2>
        <p>${repo.description ? repo.description : "Ingen beskrivning tillagd"}</p>
        <a href = "${repo.html_url}" target = "_blank" class = "button"> Visa på GitHub</a>
        `;

        container.appendChild(card);
      });
    })

    .catch((error) => {
      if (loading) {
        loading.textContent = "Kunde inte ladda GitHub-projekt!";
      }
      console.error("Fel vid hämtning:", error);
    });
});
