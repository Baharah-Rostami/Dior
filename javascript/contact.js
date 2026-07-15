const authCard=document.getElementById("authCard");

const showSignup=document.getElementById("showSignup");

const showSignin=document.getElementById("showSignin");


showSignup.addEventListener("click",(e)=>{

e.preventDefault();

authCard.classList.add("rotate");

});


showSignin.addEventListener("click",(e)=>{

e.preventDefault();

authCard.classList.remove("rotate");

});