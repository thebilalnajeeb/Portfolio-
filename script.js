// 1. Scroll Reveal Animation Logic
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Only animate once
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
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            };
            setTimeout(typingEffect, 500);
            return false;
        };
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
};
// Start typing effect on load
typingEffect();

// 3. Tab Switching Logic for Skills Section
function openTab(evt, tabName) {
    var i, grid, tablinks;
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
    
    // Re-trigger animations for the new tab
    let hiddenElements = document.getElementById(tabName).querySelectorAll('.hidden');
    hiddenElements.forEach(el => {
        el.classList.remove('show');
        // Small timeout to allow the browser to register the removal before adding it back
        setTimeout(() => {
            el.classList.add('show');
        }, 50);
    });

    evt.currentTarget.className += " active";
}

// 4. Dark/Light Mode Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    const icon = themeBtn.querySelector('i');
    themeBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            icon.className = 'fa-solid fa-sun';
        } else {
            document.body.setAttribute('data-theme', 'light');
            icon.className = 'fa-solid fa-moon';
        }
    });
}

// 5. Back to Top Button Logic
let mybutton = document.getElementById("scrollTopBtn");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

// 6. Click Ripple Effect
document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});
