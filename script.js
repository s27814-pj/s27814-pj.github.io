window.onload = function() {
    const track = document.getElementById("image-track");

    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }

    window.onmouseup = () =>{
        track.dataset.mouseDownAt ="0";
        track.dataset.prevPercentage = track.dataset.percentage;
    }

    window.onmousemove = e => {
        if(track.dataset.mouseDownAt ==="0") return;
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
            maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageVal = parseFloat(track.dataset.prevPercentage) + percentage;
            nextPercentage=Math.max(Math.min(nextPercentageVal,0),-100);

        track.dataset.percentage=nextPercentage;

        //track.style.transform = `translate(${nextPercentage}%, -50%)`;

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, {duration :1200, fill: "forwards"});

        for(const image of track.getElementsByClassName("image")){
           // image.style.objectPosition=`${nextPercentage+100}% 50%`;
            image.animate({
                objectPosition: `${nextPercentage+100}% 50%`
            },{duration:1200, fill:"forwards"});
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

            hideTrack.style.display ='none';

            galleryContainer.style.display = "flex";
            printButton.style.display = "flex";

            galleryImages.innerHTML = "TO PRINT";

            var imagePath = imageStorage[0].attributes.src.nodeValue;
            console.log(imagePath);
            //galleryImages.innerHTML += `<img src="${imagePath}" alt="Gallery Image" width="50vw" height="auto">`;



            imageStorage.forEach(function (elem){
                galleryImages.innerHTML += `<img src="${elem.attributes.src.nodeValue}" width="auto" height="120vw">`;
            });

        });

        closeButton.addEventListener("click", function () {
            hideTrack.style.display =trackValue;
            galleryContainer.style.display = "none";
        });






    let imageStorage =[];

    var a=document.getElementById("image-track").ondblclick = function(){
        //console.log("1");
    }
    var b=document.getElementById("image-track");
    b.addEventListener('dblclick', function (event){
        if (event.target.tagName.toLowerCase() === 'img') {
            //console.log(event.target);
            imageStorage.push(event.target);
            //console.log(imageStorage[0]);
            //var imagePath = event.target.attributes.src;
            //console.log(imagePath);
           // var galleryImages = document.getElementById("gallery-images");
           // console.log(galleryImages);
            //galleryImages.innerHTML +=`<img ${imagePath}`;
        }
    });

    
    //dodaj nowe

    const showForm = document.getElementById("fields");
    
    var buttonAdd = document.getElementById("add-new").onclick = function (){
        //const childOne = document.getElementById("image-track").firstElementChild;
        // const lastChild = document.getElementById("image-track").lastElementChild;
        // const prevLastChild = lastChild.previousElementSibling;
        // const clone = prevLastChild.cloneNode(true);
        // //console.log(clone);
        // //document.getElementById("image-track").appendChild(clone);
        // //console.log(1);
        // clone.attributes.src.nodeValue="https://images.pexels.com/photos/16673059/pexels-photo-16673059/free-photo-of-pylon-and-high-voltage-cables-against-the-cloudy-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        // document.getElementById("image-track").insertBefore(clone, lastChild);
        //lastChild.firstChild.style.display="flex";
        //console.log(lastChild);
        //console.log(lastChild.firstChild.style.display);
        hideTrack.style.display ='none';
        showForm.style.display="flex";
    }


    var buttonKindaSend = document.getElementById("send").onclick = function (){
        var link = document.getElementById("link").value;
        var desc = document.getElementById("desc").value;
        console.log(desc);

        const lastChild = document.getElementById("image-track").lastElementChild;
        const prevLastChild = lastChild.previousElementSibling;
        const clone = prevLastChild.cloneNode(true);
        //console.log(clone);
        //document.getElementById("image-track").appendChild(clone);
        //console.log(1);
        clone.attributes.src.nodeValue=link;
        document.getElementById("image-track").insertBefore(clone, lastChild);



        showForm.style.display="none";
        document.getElementById("link").value="";
        document.getElementById("desc").value="";
        hideTrack.style.display ='flex';
    }
    
}
