// 1. Scroll Reveal Animation Logic
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// 2. Typewriter Effect Logic
const words = ["Data Science Student.", "Civil Engineer.", "Problem Solver."];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        };
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
};

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) { i++; } else { i = 0; };
            setTimeout(typingEffect, 500);
            return false;
        };
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
};
typingEffect(); // Start effect

// 3. Tab Switching Logic for Skills
function openTab(evt, tabName) {
    let i, grid, tablinks;
    grid = document.getElementsByClassName("skills-grid");
    for (i = 0; i < grid.length; i++) {
        grid[i].style.display = "none";
        grid[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "grid";
    
    // Re-trigger scroll animations for the new tab
    let hiddenElements = document.getElementById(tabName).querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        el.classList.remove('show');
        setTimeout(() => { el.classList.add('show'); }, 50);
    });

    evt.currentTarget.className += " active";
}

// 4. Back to Top Button
let mybutton = document.getElementById("scrollTopBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};
function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

// 5. MODAL SYSTEM LOGIC (Enlarging the Cards)
const modal = document.getElementById('dataModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

document.querySelectorAll('.expandable-card').forEach(card => {
    card.addEventListener('click', function() {
        // 1. Clone the clicked card's HTML so we don't remove it from the main page
        let clonedContent = this.cloneNode(true);
        
        // 2. Remove the extra padding/animations from the clone
        clonedContent.classList.remove('delay-100', 'delay-200', 'delay-300');
        
        // 3. Get the extra details stored in the HTML data attribute
        let extraDetails = this.getAttribute('data-details');
        
        // 4. Clear old modal content and add the new stuff
        modalBody.innerHTML = '';
        modalBody.appendChild(clonedContent);
        
        // 5. If there are extra details, create a new paragraph for them inside the modal
        if (extraDetails) {
            let detailDiv = document.createElement('div');
            detailDiv.className = 'modal-details-text';
            detailDiv.innerHTML = `<strong>>_ Extended Details:</strong><br><br>${extraDetails}`;
            modalBody.appendChild(detailDiv);
        }

        // 6. Show the modal!
        modal.classList.add('show');
    });
});

// Close modal when X is clicked
closeBtn.onclick = function() { 
    modal.classList.remove('show'); 
}

// Close modal when clicking outside the box
window.onclick = function(event) { 
    if (event.target == modal) { 
        modal.classList.remove('show'); 
    } 
}
