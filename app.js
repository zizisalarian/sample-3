let btn = document.getElementById("btn");
let nav = document.getElementById("offcanvas");
let main = document.querySelector("main");

// btn.addEventListener("click" , openMenu);

function openMenu() {
  nav.classList.toggle("navIsOpen");
  main.classList.toggle("navIsOpen");
}



$(window).on("scroll", function () {
  if ($(window).scrollTop() > 0) {
    $("header").addClass("active");
  } else {
    //remove the background property so it comes transparent again (defined in your css)
    $("header").removeClass("active");
  }
});

// -----------search button in header-----------
let srchbtn = document.getElementById("srchbtn");
let srchform = document.getElementById("srchform");

// srchbtn.addEventListener("click", showSearchInput);

function showSearchInput() {
  srchform.classList.toggle("isOpen");
}

// ---------------news switching tabs-------------
let tabbtns = document.querySelectorAll("#news .container .tabbtns .tabbtn");
let tabcontent = document.querySelectorAll("#news .container .tabcontent");

for (let i = 0; i < tabbtns.length; i++) {
  tabbtns[i].addEventListener("mouseover", function () {
    for (let x = 0; x < tabbtns.length; x++) {
      tabbtns[x].classList.remove("isactive");
      tabcontent[x].classList.remove("isactive");
    }
    tabbtns[i].classList.add("isactive");
    tabcontent[i].classList.add("isactive");
  });
}

// -------------scroll trigered--------------
function scrollTrigger(selector) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach((el) => {
    addObserver(el);
  });
}

function addObserver(el) {
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(startCounting, 150)

        observer.unobserve(entry.target);
      }
    });
  });

  observer.observe(el);
}

scrollTrigger("#awards .award");

// ------------counter--------------------
function startCounting() {
  let counters = document.querySelectorAll("div.award span");
  let speed = 36;

  counters.forEach((counter) => {
    let updateCounter = () => {
      let target = +counter.getAttribute("data-target");
      let count = +counter.innerText;

      let increment = target / speed;
      if (count < target) {
        counter.innerText = Math.floor(count + increment);
        setTimeout(updateCounter, 110);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}

// --------------nashr tab news----------
let tabbtnsnews = document.querySelectorAll(".tabnews .tabheading button");
let tabcontentnews = document.querySelectorAll(".tabnews .tabcontent");

// for (let i = 0; i < tabbtns.length; i++) {
//   tabbtnsnews[i].addEventListener("click", function () {
//     for (let x = 0; x < tabbtns.length; x++) {
//       tabbtnsnews[x].classList.remove("isactive");
//       tabcontentnews[x].classList.remove("isactive");
//     }
//     tabbtnsnews[i].classList.add("isactive");
//     tabcontentnews[i].classList.add("isactive");
//   });
// }


// window.onscroll = function() {
//   myfunction();
// }

// function myfunction(){
//   let logo= document.getElementById("logo-header");
//   let scrollMenu = document.getElementById("container_header");
//   if (document.documentElement.scrollTop > 50 || document.body.scrollTop >50) {
//      logo.style.display="none";
//      scrollMenu.style.transition = "0.5s";
//   } else {
//     logo.style.display="inline";
//   }
// }
// alert("hello");



window.onscroll = function () { scrollWindow() }

function scrollWindow() {
  if (document.documentElement.scrollTop > 50) {
    document.getElementById("left").className = "left-scroll-s";
  } else {
    document.getElementById("left").className = "left";
  }

}


let playVideoFlag = false

function playvideo(){
  playVideoFlag = !playVideoFlag

  if(playVideoFlag){
    document.getElementById("video-play").play();
  }

}