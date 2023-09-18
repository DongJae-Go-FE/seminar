//full page.js
(function () {
  "use strict";
  var pnls = document.querySelectorAll(".panel").length,
    scdir,
    hold = false;

  function _scrollY(obj) {
    var slength,
      plength,
      pan,
      step = 100,
      vh = window.innerHeight / 100,
      vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
    if (
      (this !== undefined && this.id === "well") ||
      (obj !== undefined && obj.id === "well")
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

  function _swipe(obj) {
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
          if (obj.id === "well") {
            if (swdir === "up") {
              scdir = swdir;
              _scrollY(obj);
            } else if (
              swdir === "down" &&
              obj.style.transform !== "translateY(0)"
            ) {
              scdir = swdir;
              _scrollY(obj);
            }
            e.stopPropagation();
          }
        }
      },
      false
    );
  }

  var well = document.getElementById("well");
  well.style.transform = "translateY(0)";
  well.addEventListener("wheel", function (e) {
    if (e.deltaY < 0) {
      scdir = "down";
    }
    if (e.deltaY > 0) {
      scdir = "up";
    }
    e.stopPropagation();
  });
  well.addEventListener("wheel", _scrollY);
  _swipe(well);
  //var tops = document.querySelectorAll('.top');
  //for (var i = 0; i < tops.length; i++) {
  //	tops[i].addEventListener('click', function() {
  //		scdir = 'top';
  //		_scrollY(well);
  //	});
  //}
})();

const options = { root: null, threshold: 0.1, rootMargin: "-0px" };

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

let asd = `<span class="marker">
            굳이
           </span>`
let asd2 = `<span class="marker">
             굳이?!?
           </span>`

var contentText = `이걸 ${asd} 우리가 해야하나? ${asd2}`;
const text = document.querySelector(".main-text");
let i = 0;

function typing() {
  if (i < contentText.length) {
    let txt = contentText.charAt(i);
    text.innerHTML += txt;
    i++;
  }
}
setInterval(typing, 100);

const marker = document.querySelectorAll(".marker");
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

marker.forEach((target) => {
  observer4.observe(target);
});
