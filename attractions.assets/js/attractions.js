let attractionsData = []
const cardsPerPage = 3;
//   {
//     image: './attractions.assets/img/card_1.png',
//     text: 'Монумент дружбы народов',
//     info: 'Монумент дружбы Навеки с Россией в честь 400-летия добровольного присоединения Удмуртии к России.С лицевой стороны, обращённой к пруду, между пилонами размещены скульптурные композиции «Мир», «Труд» и «Равенство»'
//   },
//   {
//     image: './attractions.assets/img/card_2.png',
//     text: 'Национальный музей',
//     info: 'Национальный музейм Удмуртской Республикив в честь именим Кузебая Герда. Выставки музея знакомят посетителей с историей нашей страны и природой Удмуртии и с историей проживающих здесь народов.'
//   },
//   {
//     image: './attractions.assets/img/card_3.png',
//     text: 'Собор Святого Архистратига Михаила',
//     info: 'собор является центром религиозного просвещения, благотворительности и работы с общественностью. При храме функционирует учебно-методический центр, открыты иконописная и хоровая школы, проводятся экскурсии.'
//   },
//   {
//     image: './attractions.assets/img/card_4.png',
//     text: 'Карлутская площадь',
//       info: 'В течение первого столетия существования площадь была пустырём. В советские годы подверглась активной застройке, озеленению и сооружению памятников.'
//   },
//   {
//     image: './attractions.assets/img/card_5.png',
//     text: 'Успенская церковь',
//     info: 'храм, расположенный в заречной части города (Ленинский район). Здание храма деревянное. Единственный храм в Ижевске, который не был закрыт при советской власти.'
//   },
//   {
//     image: './attractions.assets/img/card_6.png',
//     text: 'Музей иисторических событий',
//     info: 'Музей насчитывает до 200 тысяч экспонатов в различных коллекциях: оружие (холодное и огнестрельное), письменные источники и фотографии, памятники истории, археологии и этнографии — национальные костюмы, крестьянская утварь.'
//   },
//   {
//     image: './attractions.assets/img/card_7.png',
//     text: 'Михайловская колонна',
//     info: 'Михайловская колонна была установлена в Ижевске на Базарной площади (позднее стала называться Соборной) и открыта 8 ноября в 1852 г.[2] по повелению императора Николая I.'
//   },
//   {
//     image: './attractions.assets/img/card_8.png',
//     text: 'Памятник Ижевским оружейникам',
//     info: 'Бронзовые фигуры оружейников были установлены на гранитном постаменте. У подножия скульптур находятся плиты, на которые поместили имена людей, которые внесли значительный вклад в оружейное дело в Ижевске '
//   },
//   {
//     image: './attractions.assets/img/card_9.png',
//     text: 'А.Ф. Дерябин',
//     info: 'Автор памятника Иван Никанорович Ситников, театральный художник-самоучка, изготавливал бюст по старинной гравюре А. Ф. Дерябина. Памятник представляет собой бюст' 
//   }
// ];


async function getcards() {
  try {
    const response = await fetch("https://6744e2d0b4e2e04abea3f6ce.mockapi.io/cardsList", {
      method: "GET",
    });
    const data = await response.json();
    attractionsData = data;
    console.log(attractionsData);
    
    const savedSortType = getSortTypeFromLocalStorage();
    sortData(savedSortType);
    createAttractionCards(filteredData, 1);
    setupPagination();
    setupSortOptions();
  } catch (error) {
    console.log(error);
  }
}

function createAttractionCards(data, page) {
  const wrapper = document.querySelector('.attractions__box-wrapper');
  wrapper.innerHTML = '';

  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const pageData = data.slice(startIndex, endIndex);

  pageData.forEach(attraction => {
    const card = document.createElement('div');
    card.className = 'attractions__box-card';
    card.style.backgroundImage = `url(${attraction.image})`;
    card.style.backgroundPosition = 'center';
    card.style.backgroundSize = 'cover';
    card.style.backgroundRepeat = 'no-repeat';

    const text = document.createElement('p');
    text.className = 'attractions__box-card-text';
    text.textContent = attraction.text;

    const btn = document.createElement('p');
    btn.className = 'attractions__box-card-info';
    btn.textContent = attraction.info; 

    card.appendChild(text);
    card.appendChild(btn);
    wrapper.appendChild(card);
  });
}

function setupPagination() {
  const paginationContainer = document.querySelector('.attractions__pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.className = 'attractions__pagination-btn';
    button.setAttribute('data-page', i);
    button.textContent = i;
    paginationContainer.appendChild(button);
  }

  const paginationButtons = document.querySelectorAll('.attractions__pagination-btn');
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.getAttribute('data-page');
      createAttractionCards(filteredData, parseInt(page));
    });
  });
}

function setupSortOptions() {
  const defaultButton = document.querySelector('.attractions__tittle-btn');
  const sortOptions = document.querySelector('.attractions__sort-options');
  const sortButtons = document.querySelectorAll('.attractions__sort-btn');

  defaultButton.addEventListener('click', () => {
    sortOptions.style.display = sortOptions.style.display === 'none' ? 'flex' : 'none';
  });

  sortButtons.forEach(button => {
    button.addEventListener('click', () => {
      const sortType = button.getAttribute('data-sort');
      sortData(sortType);
      createAttractionCards(filteredData, 1);
      sortOptions.style.display = 'none';
      saveSortTypeToLocalStorage(sortType);
      setupPagination(); // Обновляем пагинацию после сортировки
    });
  });
}

function sortData(sortType) {
  if (sortType === 'default') {
    filteredData = attractionsData;
  } else if (sortType === 'popular') {
    // Здесь можно добавить логику сортировки по популярности
  } else if (sortType === 'az') {
    filteredData.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortType === 'za') {
    filteredData.sort((a, b) => b.text.localeCompare(a.text));
  }
}

function saveSortTypeToLocalStorage(sortType) {
  localStorage.setItem('sortType', sortType);
}

function getSortTypeFromLocalStorage() {
  return localStorage.getItem('sortType') || 'default';
}

let filteredData = attractionsData;

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.attractions__tittle-search');
  const cardsContainer = document.querySelector('.attractions__box-wrapper');

  if (!searchInput || !cardsContainer) {
    console.error('Не найдены необходимые элементы для поиска.');
    return;
  }

  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filteredData = attractionsData.filter(attraction => attraction.text.toLowerCase().includes(searchTerm));
    createAttractionCards(filteredData, 1);
    setupPagination(); // Обновляем пагинацию после поиска
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a');
  const loadingOverlay = document.getElementById('loading-overlay');

  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      loadingOverlay.style.display = 'flex';

      setTimeout(() => {
        window.location.href = link.href;
      }, 1750); 
    });
  });
});

async function main() {
  await getcards();
}

main();