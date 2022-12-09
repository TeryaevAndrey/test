const cityBtn = document.querySelector(".header__city-btn");
const headerModal = document.querySelector(".header__modal");
const search = document.querySelector(".header__search");
const searchField = document.querySelector(".header__search-field");
const headerSearchClear = document.querySelector(".header__search-clear");
const headerModalContent = document.querySelector(".header__modal-content");
const headerModalWay = document.querySelector(".header__modal-way");
const headerModalBtn = document.querySelector(".header__modal-btn");
const headerModalSearch = document.querySelector(".header__modal-search");

document.addEventListener("click", (e) => {
  if (cityBtn.contains(e.target)) {
    headerModal.classList.toggle("show");
  } else if (!headerModal.contains(e.target)) {
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

const citiesWay = [];

const getCities = async () => {
  const res = await fetch("https://studika.ru/api/areas", {
    method: "POST",
  });

  const cities = await res.json();

  cities.map(city => {
    return renderCities(city);
  })

  headerModalSearch.addEventListener("input", (e) => {
    headerModalContent.innerHTML = "";

    if(e.target.value.length > 0) {
      const filterCities = cities.filter(city => {
        return city.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      filterCities.map(city => {
        return renderCities(city);
      })
    } else {
      cities.map(city => {
        return renderCities(city);
      })
    }
  });
};

const renderCities = (city) => {
    let html = `
      <div class="header__modal-item" data-id=${city.id} onclick="addCityToWay('${city.id}')">
        ${city.name}
      </div>
  `;

  return headerModalContent.insertAdjacentHTML("beforeend", html);
};

const renderWay = (city) => {
  let html = `
    <div class="header__way-item" data-id=${city.id}>
      <span>${city.name}</span>
      <img class="header__way-delete" src="./images/close-white.svg" alt="delete" />
    </div>
  `;

  return headerModalWay.insertAdjacentHTML("beforeend", html);
}

const addCityToWay = async (id) => {
  const res = await fetch("https://studika.ru/api/areas", {
    method: "POST",
  });

  const cities = await res.json();

  const currentEl = await cities.find(city => {
    return city.id.toString() === id.toString();
  });

  citiesWay.push(currentEl);

  headerModalWay.innerHTML = "";

  citiesWay.map(city => {
    return renderWay(city);
  });

  if(citiesWay.length > 0) {
    headerModalWay.classList.add("length");
  }

};

getCities();

