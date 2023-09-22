// Parallax 구현
(function () {
  "use strict";
  var pnls = document.querySelectorAll(".panel").length,
    scdir,
    hold = false;

  function scrollY(obj) {
    var slength,
      plength,
      pan,
      step = 100,
      vh = window.innerHeight / 100,
      vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    if (
      (this !== undefined && this.id === "wrap") ||
      (obj !== undefined && obj.id === "wrap")
    ) {
      pan = this || obj;
      plength = parseInt(pan.offsetHeight / vh);
    }
    if (pan === undefined) {
      return;
    }
    plength = plength || parseInt(pan.offsetHeight / vmin);
    slength = parseInt(pan.style.transform.replace("translateY(", ""));
    if (scdir === "up" && Math.abs(slength) < plength - plength / pnls) {
      slength = slength - step;
    } else if (scdir === "down" && slength < 0) {
      slength = slength + step;
    } else if (scdir === "top") {
      slength = 0;
    }
    if (hold === false) {
      hold = true;
      pan.style.transform = "translateY(" + slength + "vh)";
      setTimeout(function () {
        hold = false;
      }, 1000);
    }
    //console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / pnls));
  }

  function swipe(obj) {
    var swdir,
      sX,
      sY,
      dX,
      dY,
      threshold = 100,
      slack = 50,
      alT = 500,
      elT,
      stT;
    obj.addEventListener(
      "touchstart",
      function (e) {
        var tchs = e.changedTouches[0];
        swdir = "none";
        sX = tchs.pageX;
        sY = tchs.pageY;
        stT = new Date().getTime();
        //e.preventDefault();
      },
      false
    );

    obj.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      false
    );

    obj.addEventListener(
      "touchend",
      function (e) {
        var tchs = e.changedTouches[0];
        dX = tchs.pageX - sX;
        dY = tchs.pageY - sY;
        elT = new Date().getTime() - stT;
        if (elT <= alT) {
          if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
            swdir = dX < 0 ? "left" : "right";
          } else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
            swdir = dY < 0 ? "up" : "down";
          }
          if (obj.id === "wrap") {
            if (swdir === "up") {
              scdir = swdir;
              scrollY(obj);
            } else if (
              swdir === "down" &&
              obj.style.transform !== "translateY(0)"
            ) {
              scdir = swdir;
              scrollY(obj);
            }
            e.stopPropagation();
          }
        }
      },
      false
    );
  }

  var wrap = document.getElementById("wrap");
  wrap.style.transform = "translateY(0)";
  wrap.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
      scdir = "down";
    }
    if (e.deltaY > 0) {
      scdir = "up";
    }
    e.stopPropagation();
  });
  wrap.addEventListener("wheel", scrollY);
  swipe(wrap);

  //backTop 
  //var tops = document.querySelectorAll('.top');
  //for (var i = 0; i < tops.length; i++) {
  //	tops[i].addEventListener('click', function() {
  //		scdir = 'top';
  //		scrollY(wrap);
  //	});
  //}
})();

const options = { root: null, threshold: 0.1, rootMargin: "-0px" };

//2페이지 Interaction
const index = document.getElementsByClassName("title")[0];
const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("fade-in");
    } else {
      container.classList.remove("fade-in");
    }
  });
}, options);

observer.observe(index);

const targets = document.querySelectorAll(".chapter li");
const observer2 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("fade-up");
    } else {
      container.classList.remove("fade-up");
    }
  });
}, options);

targets.forEach((target) => {
  observer2.observe(target);
});

//3페이지 Interaction
const index2 = document.getElementsByClassName("title")[1];
const subText = document.getElementsByClassName("sub-text")[0];

const observer3 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("fade-up");
    } else {
      container.classList.remove("fade-up");
    }
  });
}, options);

observer3.observe(index2);
observer3.observe(subText);

const mainText = document.getElementsByClassName("main-text")[0];
const marker = document.getElementsByClassName("marker")[0];
const observer4 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("on");
    } else {
      container.classList.remove("on");
    }
  });
}, options);

observer4.observe(mainText);
observer4.observe(marker);

//4페이지 Interaction
const bold = document.getElementsByClassName("fine")[0];

const observer5 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("on");
    } else {
      container.classList.remove("on");
    }
  });
}, options);

observer4.observe(bold);

//5페이지 Interaction
const panel5 = document.getElementsByClassName("panel")[9];
const centerSub = document.getElementsByClassName("center-sub")[0];

const observer6 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("on");
    } else {
      container.classList.remove("on");
    }
  });
}, options);

observer6.observe(panel5);
observer6.observe(centerSub);


//6페이지 Interaction
const thanksList = document.querySelectorAll(".thanks-list li");

const observer7 = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    const container = entry.target;
    if (entry.isIntersecting) {
      container.classList.add("fade-left");
    } else {
      container.classList.remove("fade-left");
    }
  });
}, options);

thanksList.forEach((target) => {
  observer7.observe(target);
});
