const cityBtn = document.querySelector(".header__city-btn");
const headerModal = document.querySelector(".header__modal");
const search = document.querySelector(".header__search");
const searchField = document.querySelector(".header__search-field");
const headerSearchClear = document.querySelector(".header__search-clear");
const headerModalContent = document.querySelector(".header__modal-content");
const headerModalWay = document.querySelector(".header__modal-way");
const headerModalBtn = document.querySelector(".header__modal-btn");

document.addEventListener("click", (e) => {
  if(cityBtn.contains(e.target)) {
    headerModal.classList.toggle("show");
  } else if (!headerModal.contains(e.target)) {
    headerModal.classList.remove("show");
  }
})

searchField.addEventListener("focus", (e) => {
  search.style.backgroundColor = "#fff";
  search.style.border = "2px solid #abc8ea";
});

searchField.addEventListener("focusout", (e) => {
  search.style.backgroundColor = "#F1F1F1";
  search.style.border = "2px solid transparent";
});

searchField.addEventListener("input", (e) => {
  if (e.target.value.length > 1) {
    headerSearchClear.style.display = "block";
  } else {
    headerSearchClear.style.display = "none";
  }
});

headerSearchClear.addEventListener("click", () => {
  searchField.value = "";
  searchField.focus();
  headerSearchClear.style.display = "none";
});

const getCities = async () => {
  const res = await fetch("https://studika.ru/api/areas", {
    method: "POST",
  });

  const cities = await res.json();

  console.log(cities);

  cities.map((city) => {
    headerModalContent.insertAdjacentHTML(
      "beforeend",
      `
      <div class="header__modal-item" data-id=${city.id}>
        ${city.name}
      </div>
    `
    );
  });

  document.querySelectorAll(".header__modal-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const currentCity = cities.filter((item) => {
        return item.id.toString() === e.target.dataset.id;
      });

      headerModalWay.insertAdjacentHTML(
        "beforeend",
        `
        <div class="header__way-item">
          ${currentCity[0].name}
          <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path fill="#fff" d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
        </div>
       `
      );

      if (headerModalWay.hasChildNodes()) {
        headerModalWay.classList.add("length");
      }
    });
  });
};

headerModalBtn.addEventListener("click", (e) => {
  e.preventDefault();

  alert("Успешно!");
  headerModal.classList.remove("show");
});

getCities();

