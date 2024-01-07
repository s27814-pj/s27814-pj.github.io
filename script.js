window.onload = function () {
    const track = document.getElementById("image-track");

    window.onmousedown = e => {
        if (window.innerWidth > 768) track.dataset.mouseDownAt = e.clientX;
        else track.dataset.mouseDownAt = e.clientY;
        //console.log(track.dataset.mouseDownAt);
    }

    window.ontouchstart = e => {
        if (window.innerWidth > 768) track.dataset.mouseDownAt = e.touches[0].clientX;
        else track.dataset.mouseDownAt = e.touches[0].clientY;
        //console.log(track.dataset.mouseDownAt);
    }

    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0";
        if (track.dataset.percentage===undefined) track.dataset.percentage=0;
        track.dataset.prevPercentage = track.dataset.percentage;
    }

    window.ontouchend =() =>{
        track.dataset.mouseDownAt = "0";
        if (track.dataset.percentage===undefined) track.dataset.percentage=0;
        track.dataset.prevPercentage = track.dataset.percentage;
    }

    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        var mouseDelta = 0.1;
        var maxDelta = 0.1;

        if (window.innerWidth > 768) {
            mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;
        } else {
            mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientY,
                maxDelta = window.innerHeight / 2;
        }


        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageVal = parseFloat(track.dataset.prevPercentage) + percentage;
        nextPercentage = Math.max(Math.min(nextPercentageVal, 0), -100);

        track.dataset.percentage = nextPercentage;

        //track.style.transform = `translate(${nextPercentage}%, -50%)`;

        if (window.innerWidth > 768) {
            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, {duration: 1200, fill: "forwards"});
            for (const image of track.getElementsByClassName("image")) {
                // image.style.objectPosition=`${nextPercentage+100}% 50%`;
                image.animate({
                    objectPosition: `${nextPercentage + 100}% 50%`
                }, {duration: 1200, fill: "forwards"});
            }
        } else {
            track.animate({
                transform: `translate(-50%, ${nextPercentage}%)`
            }, {duration: 1200, fill: "forwards"});
            for (const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `50% ${nextPercentage + 100}%`
                }, {duration: 1200, fill: "forwards"});
            }
        }

    }


    window.ontouchmove = e => {
        if (track.dataset.mouseDownAt === "0") return;

        var mouseDelta = 0.1;
        var maxDelta = 0.1;

        if (window.innerWidth > 768) {
            mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientX,
                maxDelta = window.innerWidth / 2;
        } else {
            mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.touches[0].clientY,
                maxDelta = window.innerHeight / 2;
        }


        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageVal = parseFloat(track.dataset.prevPercentage) + percentage;
        nextPercentage = Math.max(Math.min(nextPercentageVal, 0), -100);

        track.dataset.percentage = nextPercentage;

        //track.style.transform = `translate(${nextPercentage}%, -50%)`;

        if (window.innerWidth > 768) {
            track.animate({
                transform: `translate(${nextPercentage}%, -50%)`
            }, {duration: 1200, fill: "forwards"});
            for (const image of track.getElementsByClassName("image")) {
                // image.style.objectPosition=`${nextPercentage+100}% 50%`;
                image.animate({
                    objectPosition: `${nextPercentage + 100}% 50%`
                }, {duration: 1200, fill: "forwards"});
            }
        } else {
            track.animate({
                transform: `translate(-50%, ${nextPercentage}%)`
            }, {duration: 1200, fill: "forwards"});
            for (const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `50% ${nextPercentage + 100}%`
                }, {duration: 1200, fill: "forwards"});
            }
        }

    }

    const galleryButton = document.getElementById("gallery-button");
    const galleryContainer = document.getElementById("gallery-container");
    const galleryImages = document.getElementById("gallery-images");
    const closeButton = document.getElementById("close-button");
    const printButton = document.getElementById("print-button");
    var hideTrack = document.getElementById('image-track');
    var trackValue = hideTrack.style.display;

    galleryButton.addEventListener("click", function () {
        hideTrack.style.display = 'none';

        galleryContainer.style.display = "flex";
        printButton.style.display = "flex";

        galleryImages.innerHTML = "Double click to add images here";

        imageStorage.forEach(function (elem, index) {
            if (index==0) galleryImages.innerHTML="";
            galleryImages.innerHTML += `<img src="${elem.attributes.src.nodeValue}" width="auto" height="120vw">`;
        });

    });

    closeButton.addEventListener("click", function () {
        hideTrack.style.display = trackValue;
        galleryContainer.style.display = "none";
    });


    let imageStorage = [];


    var imageListenerForClick = document.getElementById("image-track");
    imageListenerForClick.addEventListener('dblclick', function (event) {
        if (event.target.tagName.toLowerCase() === 'img') {
            imageStorage.push(event.target);

        }
    });

    const showForm = document.getElementById("newImage");

    var buttonAdd = document.getElementById("add-new").onclick = function () {

        hideTrack.style.display = 'none';
        document.getElementById("gallery-button").style.display = 'none';
        showForm.style.display = "flex";
    }


    var buttonKindaSend = document.getElementById("send").onclick = function () {
        var link = document.getElementById("link").value;
        var desc = document.getElementById("desc").value;

        const lastChild = document.getElementById("image-track").lastElementChild;
        const prevLastChild = lastChild.previousElementSibling;
        const clone = prevLastChild.cloneNode(true);

        clone.attributes.src.nodeValue = link;
        clone.attributes.class.nodeValue = "image new";
        clone.attributes.alt.nodeValue=desc;
        clone.dataset.size="NEW";
        clone.dataset.age="NEW";
        document.getElementById("image-track").insertBefore(clone, lastChild);
        showForm.style.display = "none";
        document.getElementById("link").value = "";
        document.getElementById("desc").value = "";
        hideTrack.style.display = trackValue;
        document.getElementById("gallery-button").style.display = 'flex';
    }
    const webPage="https://s27814-pj.github.io/";
    var generatePdf = document.getElementById("print-button").onclick = function () {
        window.jsPDF = window.jspdf.jsPDF;
        const pdf = new jsPDF();
        //const content = document.getElementById("gallery-container");


        imageStorage.forEach(function (elem, index) {
            if ((index > 2) && (index % 4 == 0)) pdf.addPage("a4", "1");

            var imagePath = webPage;
            if (elem.attributes.class.nodeValue == "image new") imagePath = "";
            imagePath += elem.attributes.src.nodeValue;
            var ratio = elem.width / elem.height;

            pdf.addImage(imagePath, 'JPEG', 10, ((index % 4) * 71) + 10, ratio * 60, 60);
            pdf.text("Name: " + elem.alt, 200, ((index % 4) * 71) + 20, null, null, "right");
            pdf.text("Size: " + elem.dataset.size, 200, ((index % 4) * 71) + 40, null, null, "right");
            pdf.text("Age: " + elem.dataset.age, 200, ((index % 4) * 71) + 60, null, null, "right");

            if (index % 4 != 0) pdf.line(0, ((index % 4) * 71) + 5, 250, ((index % 4) * 71) + 5);

        });

        pdf.save("out.pdf");

    }


}
