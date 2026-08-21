/* =========================================
   ELEMENTS
========================================= */

const gift = document.getElementById("gift");
const openingScreen = document.getElementById("openingScreen");
const mainContent = document.getElementById("mainContent");

let opened = false;


/* =========================================
   MUSIC
========================================= */

const birthdaySong = new Audio("audio/birthday.mp3");

birthdaySong.loop = true;
birthdaySong.volume = 0.65;


/* =========================================
   OPEN GIFT
========================================= */

gift.addEventListener("click", openGift);


function openGift() {

    if (opened) return;

    opened = true;


    /* Open gift */

    gift.classList.add("open");


    /* Play music */

    birthdaySong.play().catch(error => {

        console.log(
            "Audio could not start:",
            error
        );

    });


    /* Confetti */

    setTimeout(() => {

        fireConfetti();

    }, 700);


    /* Fade opening */

    setTimeout(() => {

        openingScreen.style.opacity = "0";

        openingScreen.style.transition =
            "opacity 1s ease";

    }, 1200);


    /* Show website */

    setTimeout(() => {

        openingScreen.classList.add("hidden");

        mainContent.classList.remove("hidden");

        window.scrollTo(0, 0);

    }, 2200);

}



/* =========================================
   CONFETTI
========================================= */

function fireConfetti() {

    const duration = 4500;

    const end = Date.now() + duration;


    const colors = [

        "#087443",
        "#d6ad55",
        "#f3d58a",
        "#ffffff"

    ];


    function frame() {

        confetti({

            particleCount: 5,

            angle: 60,

            spread: 65,

            origin: {
                x: 0
            },

            colors: colors

        });


        confetti({

            particleCount: 5,

            angle: 120,

            spread: 65,

            origin: {
                x: 1
            },

            colors: colors

        });


        if (Date.now() < end) {

            requestAnimationFrame(frame);

        }

    }


    frame();

}



/* =========================================
   MEMORY SLIDESHOW
========================================= */

const memories = [

    {
        image: "./images/dad1.jpg",

        caption:
            "The man behind so many beautiful memories."
    },


    {
        image: "./images/dad2.jpg",

        caption:
            "A father whose presence means everything."
    },


    {
        image: "./images/dad3.jpg",

        caption:
            "Celebrating the moments that matter."
    },


    {
        image: "./images/dad4.jpg",

        caption:
            "More memories. More reasons to be grateful."
    },


    {
        image: "./images/dad5.jpg",

        caption:
            "And many more beautiful memories to come."
    }

];


let currentMemory = 0;


const memoryImage =
    document.getElementById("memoryImage");


const photoNumber =
    document.getElementById("photoNumber");


const memoryCaption =
    document.getElementById("memoryCaption");



/* =========================================
   CHANGE MEMORY
========================================= */

function changeMemory() {

    memoryImage.classList.add("fade-image");


    setTimeout(() => {


        currentMemory++;


        if (
            currentMemory >= memories.length
        ) {

            currentMemory = 0;

        }


        memoryImage.src =
            memories[currentMemory].image;


        memoryImage.alt =
            "David Kunle Solesi";


        memoryCaption.textContent =
            memories[currentMemory].caption;


        photoNumber.textContent =
            String(
                currentMemory + 1
            ).padStart(2, "0");


        memoryImage.classList.remove(
            "fade-image"
        );


    }, 600);

}



/* Change photo every 4 seconds */

setInterval(
    changeMemory,
    4000
);



/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".message-section, .memories, .three-things, .celebration, .prayer, .final-section"
    );


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.1
        }

    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "opacity 1s ease, transform 1s ease";

    observer.observe(element);

});