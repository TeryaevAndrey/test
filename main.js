const cityBtn = document.querySelector(".header__city");
const headerModal = document.querySelector(".header__modal");
const search = document.querySelector(".header__search");
const searchField = document.querySelector(".header__search-field");
const headerSearchClear = document.querySelector(".header__search-clear");

document.addEventListener("click", (e) => {
  const click = e.composedPath().includes(cityBtn);

  if(click) {
    headerModal.classList.toggle("show");
  } else {
    headerModal.classList.remove("show");
  }
});

searchField.addEventListener("focus", (e) => {
  search.style.backgroundColor = "#fff";
  search.style.border = "2px solid #abc8ea";
});

searchField.addEventListener("focusout", (e) => {
  search.style.backgroundColor = "#F1F1F1";
  search.style.border = "2px solid transparent";
});

searchField.addEventListener("input", (e) => {
  if(e.target.value.length > 1) {
    headerSearchClear.style.display = "block";
  } else {
    headerSearchClear.style.display = "none";
  }
});

const getCities = async () => {
  const res = await fetch("https://studika.ru/api/areas", {
    method: "POST"
  });

  const cities = await res.json();

  console.log(cities);

  return cities;
}

getCities();