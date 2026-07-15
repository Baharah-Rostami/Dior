const cards=document.querySelectorAll(".collection-card");

const next=document.querySelector(".next");

const prev=document.querySelector(".prev");


let index=1;


function updateSlider(){

cards.forEach((card,i)=>{

card.classList.remove(
"active",
"side"
);


if(i===index){

card.classList.add("active");

}

else{

card.classList.add("side");

}

});

}



next.addEventListener("click",()=>{

index++;

if(index>=cards.length){
index=0;
}

updateSlider();

});


prev.addEventListener("click",()=>{

index--;

if(index<0){
index=cards.length-1;
}

updateSlider();

});