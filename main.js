const cityBtn = document.querySelector(".header__city-btn");
const headerModal = document.querySelector(".header__modal");
const search = document.querySelector(".header__search");
const searchField = document.querySelector(".header__search-field");
const headerSearchContent = document.querySelector(".header__search-content");
const headerSearchClear = document.querySelector(".header__search-clear");
const headerModalContent = document.querySelector(".header__modal-content");
const headerModalWay = document.querySelector(".header__modal-way");
const headerModalBtn = document.querySelector(".header__modal-btn");
const headerModalSearch = document.querySelector(".header__modal-search");

document.addEventListener("click", (e) => {
  if (cityBtn.contains(e.target)) {
    headerModal.classList.toggle("show");
  } else if (
    !headerModal.contains(e.target) &&
    !e.target.classList.contains("header__way-delete")
  ) {
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

  cities.map((city) => {
    return renderCities(city);
  });

  headerModalSearch.addEventListener("input", (e) => {
    headerModalContent.innerHTML = "";

    if (e.target.value.length > 0) {
      const filterCities = cities.filter((city) => {
        return city.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      filterCities.map((city) => {
        return renderCities(city);
      });
    } else {
      cities.map((city) => {
        return renderCities(city);
      });
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
      <img class="header__way-delete" src="./images/close-white.svg" alt="delete" onClick={deleteCityFromWay(${city.id})} />
    </div>
  `;

  return headerModalWay.insertAdjacentHTML("beforeend", html);
};

const addCityToWay = async (id) => {
  const res = await fetch("https://studika.ru/api/areas", {
    method: "POST",
  });

  const cities = await res.json();

  const currentEl = await cities.find((city) => {
    return city.id.toString() === id.toString();
  });

  citiesWay.push(currentEl);

  headerModalWay.innerHTML = "";

  citiesWay.map((city) => {
    return renderWay(city);
  });

  if (citiesWay.length > 0) {
    headerModalWay.classList.add("length");
  }
};

const deleteCityFromWay = async (id) => {
  const deleteEl = citiesWay.find((city) => {
    return id.toString() === city.id.toString();
  });

  headerModalWay.innerHTML = "";

  const index = citiesWay.indexOf(deleteEl);

  citiesWay.splice(index, 1);

  citiesWay.map((city) => {
    return renderWay(city);
  });

  if (citiesWay.length < 1) {
    headerModalWay.classList.remove("length");
  }
};

headerModalBtn.addEventListener("click", () => {
  alert("Успешно!");
  headerModal.classList.remove("show");
});

getCities();

const renderSearchItem = (city) => {
  let html = `
    <div class="header__search-item" data-id=${city.id}>
      ${city.name}
    </div>
  `;

  return headerSearchContent.insertAdjacentHTML("beforeend", html);
};

const showSearchItems = async () => {
  const res = await fetch("https://studika.ru/api/areas", {
    method: "POST",
  });

  const cities = await res.json();

  cities.map((city) => {
    return renderSearchItem(city);
  });

  // cities.forEach(city => {
  //   searchField.addEventListener("input", (e) => {

  //     headerSearchContent.innerHTML = "";

  //     if (city.name.toLowerCase().includes(e.target.value.toLowerCase())) {
  //       let index = city.name.trim().toLowerCase().indexOf(e.target.value.trim().toLowerCase());
  //       let beforeLetters = city.name.slice(0, index);
  //       let coincidence = city.name.slice(index, e.target.value.length);
  //       let remains = city.name.slice(e.target.value.length, city.name.length);

  //       headerSearchContent.classList.add("active");

  //       renderSearchItem(beforeLetters, coincidence, remains);
  //     }

  //     if(e.target.value.length < 1) {
  //       headerSearchContent.classList.remove("active");
  //     }
  //   });
  // })
};

showSearchItems();

searchField.addEventListener("input", (e) => {
  const val = e.target.value.trim();
  const items = document.querySelectorAll(".header__search-item");

  if (val !== "") {
    headerSearchContent.classList.add("active");

    items.forEach((item) => {
      if (item.innerText.search(val) === -1) {
        item.style.display = "none";
        item.innerHTML = item.innerText;
      } else {
        item.style.display = "block";

        let str = item.innerText;

        item.innerHTML = insertMark(str, item.innerText.search(val), val.length);
      }
    });
  } else {
    headerSearchContent.classList.remove("active");

    items.forEach((item) => {
      item.style.display = "block";
      item.innerHTML = item.innerText;
    });
  }
});

const insertMark = (str, pos, len) => {
  return str.slice(0, pos) + "<strong>" + str.slice(pos, pos + len) + "</strong>" + str.slice(pos + len);
}