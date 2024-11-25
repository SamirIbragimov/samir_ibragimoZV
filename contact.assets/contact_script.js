document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('myModal');
    const btn = document.getElementById('myBtn');
    const span = document.querySelector('.contact__connect__modal-close');


    btn.onclick = function() {
        modal.classList.add('active');
    }


    span.onclick = function() {
        modal.classList.remove('active');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('active');
        }
    }
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