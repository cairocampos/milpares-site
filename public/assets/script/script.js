const sideNavBg = document.querySelector(".side-nav-bg");
const closebtn = document.querySelector(".closebtn");

function openFilterMenu() {
  document.getElementById("filterMenu").style.width = "250px";
  sideNavBg.style.display = "block";
  closebtn.style.display = "block";
}

function openHeaderMenu() {
  document.getElementById("headerSidenav").style.width = "250px";
  sideNavBg.style.display = "block";
  closebtn.style.display = "block";
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  sideNavBg.style.display = "block";
  closebtn.style.display = "block";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("headerSidenav").style.width = "0";
  document.getElementById("filterMenu").style.width = "0";
  sideNavBg.style.display = "none";
  closebtn.style.display = "none";
}

function incrementValue() {
  var value = parseInt(document.getElementById("number").value, 10);
  value = isNaN(value) ? 0 : value;
  if (value < 10) {
    value++;
    document.getElementById("number").value = value;
  }
}


