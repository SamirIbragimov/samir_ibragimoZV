let ImagesList = []
let images = ''
function ImageLink() {
    const parentBlock = document.querySelector(".main__slider");
    ImagesList.forEach((link) => {
        const links = document.createElement("div")
        links.innerHTML = `<img class="main__slider-image" src="${link.Img_scr}" alt=""> `  
        parentBlock.appendChild(links);
    }
)}


async function createCards() {
    try {
        const response = await fetch('https://6744e2d0b4e2e04abea3f6ce.mockapi.io/ImagesList', {
            method: "GET",
        });
        const data = await response.json()
        ImagesList = data
        await ImageLink()
        images = document.querySelectorAll('.main__slider-image');
        await show(imageIndex);
        
    }
    catch (error) {
        console.log(error);
        
    }   
}

async function main() {
    await createCards();
}

main()


let imageIndex = 0;

function show(index) {
    images[imageIndex].classList.remove('active');
    images[index].classList.add('active');
    imageIndex = index;
}

document.querySelector(".controlls").addEventListener("click", function (event) {
    if (event.target.classList.contains('prev')) {
        let index = imageIndex - 1;

        if (index < 0) {
            index = images.length - 1;
        }
        show(index);
    } else if (event.target.classList.contains('next')) {
        let index = imageIndex + 1;
        if (index >= images.length) {
            index = 0
        }
        show(index);
    }
})


const cardList = [
    {
        Img_scr: "./assets/img/slider_1.jpg",
        
        indexObj: 0,
    },
    {
        Img_scr: "./assets/img/slider_2.png",
        indexObj: 1,
    },
    {
        Img_scr: "./assets/img/slider_3.png",
        indexObj: 2,
    },
    {
        Img_scr: "./assets/img/slider_4.png",
        indexObj: 3,
    },
    {
        Img_scr: "./assets/img/slider_5.png",
        indexObj: 4,
    },
]
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const closeModal = document.getElementById('close-modal');

    menuIcon.addEventListener('click', function() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
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
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a');
    const loadingOverlay = document.getElementById('loading-overlay');
    const menuIcon = document.getElementById('menu-icon');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const overlay = document.getElementById('overlay');

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