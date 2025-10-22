// dior.js - Complete and Fixed Version
(function(){
  const path = window.location.pathname.split('/').pop();

  // helper functions
  function $(s){ return document.querySelector(s); }
  function $all(s){ return Array.from(document.querySelectorAll(s)); }
  function toast(msg, time = 2200){
    const t = $('#toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(()=> t.classList.remove('show'), time);
  }
  function setTheme(theme){
    if(theme==='dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', theme);
    const btn = $('#themeToggle');
    if(btn) btn.setAttribute('aria-pressed', theme==='dark');
  }

  /* ---------- LOGIN PAGE ---------- */
  if(path==='login.html' && $('#loginForm')){
    const form = $('#loginForm');
    const user = $('#username');
    const email = $('#useremail');
    const pass = $('#password');
    const userError = $('#userError');
    const emailError = $('#emailError');
    const passError = $('#passError');
    const formMessage = $('#formMessage');

    // real-time validation
    user.addEventListener('input', ()=>{ userError.textContent = user.value.trim().length<3?'Your name must be at least 3 characters long':''; });
    email.addEventListener('input', ()=>{ emailError.textContent = /\S+@\S+\.\S+/.test(email.value)?'':'Please enter a valid email'; });
    pass.addEventListener('input', ()=>{ passError.textContent = pass.value.length<4?'Your password must be at least 4 characters long':''; });

    form.addEventListener('submit', e=>{
      e.preventDefault();
      const uErr = user.value.trim().length<3;
      const eErr = !(/\S+@\S+\.\S+/.test(email.value));
      const pErr = pass.value.length<4;
      userError.textContent = uErr?'Your name must be at least 3 characters long':'';
      emailError.textContent = eErr?'Please enter a valid email':'';
      passError.textContent = pErr?'Your password must be at least 4 characters long':'';
      if(uErr||eErr||pErr){ formMessage.textContent='Please correct the errors.'; return; }

      // simulate login
      formMessage.textContent='Lodding ....';
      $('#submitBtn').disabled = true;
      setTimeout(()=>{
        const username = user.value.trim();
        sessionStorage.setItem('sessionUser', username);
        localStorage.setItem('lastUser', username);
        formMessage.textContent='';
        window.location.href='main.html';
      },800);
    });

    // prefill last user
    const last = localStorage.getItem('lastUser');
    if(last) user.value=last;
  }

  /* ---------- MAIN PAGE ---------- */
  if(path==='main.html' && $('#slidesWrapper')){
    const sessionUser = sessionStorage.getItem('sessionUser');
    if(!sessionUser){ window.location.href='login.html'; return; }

    // show welcome text
    const welcomeText = $('#welcomeText');
    const navbarUser = document.createElement('span');
    navbarUser.style.color='snow';
    navbarUser.style.fontWeight='bold';
    navbarUser.style.marginLeft='12px';
    navbarUser.textContent = `Wellcome  ${sessionUser}`;
    const logo = $('.logo');
    if(logo) logo.appendChild(navbarUser);

    if(welcomeText) welcomeText.textContent = `Wellcome  ${sessionUser}`;
    const sessionMeta = $('#sessionMeta');
    if(sessionMeta) sessionMeta.textContent = `Logged in as ${sessionUser} — ${new Date().toLocaleString()}`;

    // logout
    const logoutBtn = $('#logoutBtn');
    if(logoutBtn){
      logoutBtn.classList.remove('hidden');
      logoutBtn.addEventListener('click', ()=>{
        sessionStorage.removeItem('sessionUser');
        window.location.href='login.html';
      });
    }

    // theme init
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    const themeBtn = $('#themeToggle');
    if(themeBtn){
      themeBtn.addEventListener('click', ()=>{
        const cur = document.documentElement.getAttribute('data-theme')==='dark'?'dark':'light';
        setTheme(cur==='dark'?'light':'dark');
        toast('Theme changed');
      });
    }

    // nav toggle
    const menuBtn = $('#menu-btn');
    const closeBtn = $('#close-btn');
    const navLinks = $('.links');
    if(menuBtn) menuBtn.addEventListener('click', ()=>{ navLinks && navLinks.classList.toggle('active'); });
    if(closeBtn) closeBtn.addEventListener('click', ()=>{ navLinks && navLinks.classList.remove('active'); });

    // slider
    const slidesWrapper = $('#slidesWrapper');
    const prev = $('#prev');
    const next = $('#next');
    const addSlideBtn = $('#addSlideBtn');
    const toggleExtra = $('#toggleExtraBtn');
    const extra = $('#extraInfo');
    let currentIndex = 0;

    function updateSlider(){
      const slides = slidesWrapper.children.length;
      if(slides===0) return;
      if(currentIndex<0) currentIndex=slides-1;
      if(currentIndex>=slides) currentIndex=0;
      slidesWrapper.style.transform = `translateX(-${currentIndex*100}%)`;
    }
    if(next) next.addEventListener('click', ()=>{ currentIndex++; updateSlider(); });
    if(prev) prev.addEventListener('click', ()=>{ currentIndex--; updateSlider(); });

    // autoplay
    let autoplay = setInterval(()=>{ currentIndex++; updateSlider(); },3500);
    slidesWrapper.addEventListener('mouseenter', ()=> clearInterval(autoplay));
    slidesWrapper.addEventListener('mouseleave', ()=> autoplay = setInterval(()=>{ currentIndex++; updateSlider(); },3500));

    if(addSlideBtn){
      addSlideBtn.addEventListener('click', ()=>{
        const seed = Math.floor(Math.random()*10000);
        const div = document.createElement('div');
        div.className='slide';
        const img = document.createElement('img');
        img.src=`https://picsum.photos/seed/${seed}/1200/420`;
        img.alt=`Dynamic ${seed}`;
        div.appendChild(img);
        slidesWrapper.appendChild(div);
        currentIndex = slidesWrapper.children.length-1;
        updateSlider();
        toast('Slide added');
      });
    }

    if(toggleExtra && extra){
      toggleExtra.addEventListener('click', ()=>{
        const hidden = extra.classList.toggle('hidden');
        extra.setAttribute('aria-hidden', String(hidden));
      });
      toggleExtra.addEventListener('keyup', e=>{
        if(e.key==='Enter'||e.key===' ') toggleExtra.click();
      });
    }

    const exploreBtn = $('#exploreBtn');
    if(exploreBtn){
      exploreBtn.addEventListener('click', ()=>{
        const note = document.createElement('div');
        note.className='card p-2 mt-3';
        note.textContent='Thanks for exploring — dynamic item added.';
        document.querySelector('.dior-main .container').appendChild(note);
        toast('Added a note dynamically');
      });
    }
  }
})();
