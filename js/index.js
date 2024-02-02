const form = document.querySelector("form");
const image = document.querySelector("#imageAccept");
const setBack = document.getElementById("setBack");
const refresh = document.getElementById("#refresh");

image.addEventListener("change", () => {
  if (image.files.length > 0) {
    let fileReader = new FileReader();

    fileReader.readAsDataURL(image.files[0]);

    fileReader.onloadend = function () {
      setBack.style.backgroundImage = `url('${fileReader.result}')`;
      setBack.width = "100%";
      setBack.height = "auto";
    };
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const latitude = document.querySelector("#latitude").value;
  const longitude = document.querySelector("#longitude").value;
  const elevation = document.querySelector("#Elevation").value;
  const accuracy = document.querySelector("#Accuracy").value;
  const school = document.querySelector("#School").value;

  if (
    latitude === "" ||
    longitude === "" ||
    elevation === "" ||
    accuracy === "" ||
    school === ""
  ) {
    alert("Please Enter The Full Detail");
  } else {   
    let lat=newLatLong(latitude);
     let long=newLatLong(longitude);
    paragraphAppend(`latitude:- ${lat}`);
    paragraphAppend(`longitude:- ${long}`);
    paragraphAppend(`Elevation:- ${elevation}`);
    paragraphAppend(`Accuracy:- ${accuracy}`);
    paragraphAppend(`School:- ${school}`);
  }
  
  refresh.addEventListener("click", settingToZero);
});
  const divAdd = document.querySelector(".content");

function paragraphAppend(value) {
  const p = document.createElement("p");
  const text = document.createTextNode(value);
  p.appendChild(text);
  divAdd.appendChild(p);
}

function settingToZero() {
  document.querySelector("#latitude").value = "";
  document.querySelector("#longitude").value = "";
  document.querySelector("#Elevation").value = "";
  document.querySelector("#Accuracy").value = "";
  document.querySelector("#School").value = "";
  setBack.style.backgroundImage = "";
}


function newLatLong(latLong) {
  let latLongStr = latLong.toString().trim();
  let newLat = "";
  let count = 0;

  for (let i of latLongStr) {
    if (count === 9) {
      break;
    } else {
      newLat += i;
      count++;
    }
  }

  return newLat;
}



function downloadJPG() {
  let element = document.getElementById("setBack");

  html2canvas(element).then(function (canvas) {
    let dataURL = canvas.toDataURL("image/jpeg");

    let link = document.createElement("a");
    link.href = dataURL;
    link.download = "Image.jpg";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  });
  // alert("Image Download Successfully");
}
