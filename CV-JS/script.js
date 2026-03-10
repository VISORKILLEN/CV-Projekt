document.addEventListener("DOMContentLoaded", () => {
  // --- CV Data Fetching ---
  fetch("../Multipage/CV.data.json")
    .then((response) => response.json())
    .then((data) => {
      const educationContainer = document.getElementById("education");
      const workContainer = document.getElementById("work");
      const certificateContainer = document.getElementById("certificates");
      const languageContainer = document.getElementById("languages");

      // Render Education items
      if (educationContainer) {
        data.education.forEach((item) => {
          educationContainer.innerHTML += `
            <div class="cv-item">
              <h3>${item.title}</h3>
              <p><strong>${item.period}</strong></p>
              <ul>
                ${item.description.map((desc) => `<li>${desc}</li>`).join("")}
              </ul>
            </div>`;
        });
      }

      // Render Work items
      if (workContainer) {
        data.work.forEach((item) => {
          workContainer.innerHTML += `
            <div class="cv-item">
              <h3>${item.title}</h3>
              <p><strong>${item.period}</strong></p>
              <ul>
                ${item.description.map((desc) => `<li>${desc}</li>`).join("")}
              </ul>
            </div>`;
        });
      }

      // Render Certificates
      if (certificateContainer) {
        certificateContainer.innerHTML += `
          <div class="cv-item">
            <h3>Certifikat</h3>
            <ul>
              ${data.certificates.map((cert) => `<li>${cert}</li>`).join("")}
            </ul>
          </div>`;
      }

      // Render Languages
      if (languageContainer) {
        languageContainer.innerHTML += `
          <div class="cv-item">
            <h3>Språk</h3>
            <ul>
              ${data.languages.map((lang) => `<li>${lang.language} - ${lang.level}</li>`).join("")}
            </ul>
          </div>`;
      }
    })
    .catch((error) => console.error("Error loading CV data:", error));

  // GitHub Projects Gallery with Delay
  const container = document.getElementById("githubProjects");
  const loading = document.getElementById("loading");

  // Simulate a 2-second network delay for the user experience
  setTimeout(() => {
    fetch(`https://api.github.com/users/VISORKILLEN/starred`)
      .then((response) => {
        if (!response.ok) throw new Error("Kunde inte hämta data");
        return response.json();
      })
      .then((repos) => {
        // Remove the loading text once data is ready
        if (loading) loading.remove();

        // Sort repositories by latest update
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        repos.forEach((repo) => {
          // Skip forked projects
          if (repo.fork) return;

          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
            <h2>${repo.name}</h2>
            <p>${repo.description ? repo.description : "Ingen beskrivning tillagd"}</p>
            <a href="${repo.html_url}" target="_blank" class="button">Visa på GitHub</a>
          `;

          container.appendChild(card);
        });
      })
      .catch((error) => {
        // Update text if fetch fails
        if (loading) {
          loading.textContent = "Kunde inte ladda GitHub-projekt!";
        }
        console.error("GitHub Fetch Error:", error);
      });
    // 2000ms delay
  }, 2000);
});

// Easter Egg: Key Sequence "789"
let secretCode = "";
const correctCode = "789";
const eggModal = document.getElementById("eggModal");
const closeBtn = document.getElementById("closeModal");

document.addEventListener("keydown", (event) => {
  secretCode += event.key;
  // save only last 3 keys
  secretCode = secretCode.slice(-3);

  if (secretCode === correctCode && eggModal) {
    eggModal.classList.add("show");
  }
});

// Close modal logic
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    eggModal.classList.remove("show");
  });
}

// -Easter Egg: Shift + Bottom Right Click
document.addEventListener("click", (event) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Checks if click is within 40px of the bottom-right corner
  if (
    event.shiftKey &&
    event.clientX > windowWidth - 40 &&
    event.clientY > windowHeight - 40
  ) {
    document.body.style.background = "yellow";
    document.body.style.color = "blue";
  }
});
