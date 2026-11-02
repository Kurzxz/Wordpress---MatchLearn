(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const closeMenu = () => { nav?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav?.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.subject-card')];
  const search = document.querySelector('#subject-search');
  let category = 'all';
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('ca');
  function filter() {
    const query = normalize(search?.value.trim() || '');
    let count = 0;
    cards.forEach(card => { const show = (category === 'all' || card.dataset.category === category) && normalize(card.textContent).includes(query); card.hidden = !show; if (show) count++; });
    const result = document.querySelector('#subject-result');
    if (result) result.textContent = count ? `${count} ${count === 1 ? 'àmbit de reforç proposat' : 'àmbits de reforç proposats'}` : 'No hem trobat cap matèria. Prova un altre terme o selecciona totes les matèries.';
  }
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; buttons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); }); filter(); }));
  search?.addEventListener('input', filter);
  // One shared timetable drives the profile calendar and reservation form.
  const dateKey = d => new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Madrid', year:'numeric',month:'2-digit',day:'2-digit'}).format(d);
  const today = dateKey(new Date());
  const cursor = new Date(`${today}T12:00:00Z`);
  const days = [];
  while (days.length < 5) { cursor.setUTCDate(cursor.getUTCDate() + 1); if (![0,6].includes(cursor.getUTCDay())) days.push(dateKey(cursor)); }
  const hours = [[17,19],[16,18],[17,18],[16,19],[17,19]];
  const labelDate = key => new Intl.DateTimeFormat('ca-ES', {timeZone:'Europe/Madrid',weekday:'short',day:'2-digit',month:'2-digit'}).format(new Date(`${key}T12:00:00Z`));
  const available = (day, duration = 1) => { const list = hours[days.indexOf(day)] || []; return list.filter(h => duration === 1 || list.includes(h + 1)); };
  const query = new URLSearchParams(location.search);
  const calendar = document.querySelector('#tutor-calendar');
  if (calendar) {
    calendar.append(document.createElement('span'));
    days.forEach(day => { const el=document.createElement('strong'); el.textContent=labelDate(day); calendar.append(el); });
    [16,17,18,19].forEach(hour => {
      const label=document.createElement('span'); label.textContent=`${hour}:00`; calendar.append(label);
      days.forEach(day => {
        const button=document.createElement('button'); button.type='button'; button.disabled=!available(day).includes(hour);
        button.setAttribute('aria-label', `${labelDate(day)}, ${hour}:00. ${button.disabled ? 'No disponible' : 'Disponible'}`);
        button.setAttribute('aria-pressed','false'); button.className='calendar-slot';
        button.addEventListener('click',()=>{
          calendar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
          document.querySelector('#calendar-selection').textContent=`${labelDate(day)} · ${hour}:00 h · 1 hora`;
          const link=document.querySelector('#calendar-book');const url=new URL(link.href);url.searchParams.set('dia',day);url.searchParams.set('hora',String(hour));url.searchParams.set('materia','Programació');link.href=url.href;
        }); calendar.append(button);
      });
    });
  }
  const dialog = document.querySelector('#booking-dialog');
  if (!dialog) return;
  const inline = dialog.dataset.inline === 'true';
  const tutorPage = dialog.dataset.tutor === 'true';
  const panels = ['booking-selection','booking-payment','booking-success','booking-classroom','booking-feedback','tutor-demo'];
  const title = document.querySelector('#booking-title');
  const form = document.querySelector('#booking-form');
  const dateSelect=document.querySelector('#booking-date');
  const slotSelect=document.querySelector('#booking-slot');
  const durationSelect=document.querySelector('#booking-duration');
  const subjectSelect=document.querySelector('#booking-subject');
  const money = value => new Intl.NumberFormat('ca-ES',{style:'currency',currency:'EUR'}).format(value);
  const storageKey='matchlearn-session-v1';
  let summary='';
  function updateSaved(){
    const target=document.querySelector('#saved-session'); if(!target) return;
    let saved=null;
    try { saved=JSON.parse(sessionStorage.getItem(storageKey)); } catch { document.querySelector('#session-storage-note').textContent='El navegador no permet desar la sessió en aquesta pestanya. Pots continuar amb el recorregut.'; }
    const valid=typeof saved?.summary==='string' && saved.summary.length<1500;
    target.hidden=!valid;document.querySelector('#saved-session-empty').hidden=valid;
    if(valid)document.querySelector('#saved-session-summary').textContent=saved.summary;
  }
  function showPanel(id, focus=true){
    panels.forEach(panel=>{document.getElementById(panel).hidden=panel!==id;});
    const progress=document.querySelector('#booking-progress');progress.hidden=id==='tutor-demo';
    const index=id==='booking-selection'?0:id==='booking-payment'?1:2;
    progress.querySelectorAll('li').forEach((li,i)=>{if(i===index)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current');});
    if(focus){title.tabIndex=-1;title.focus({preventScroll:true});if(inline)dialog.scrollIntoView({behavior:'auto',block:'start'});else dialog.scrollTop=0;}
  }
  function refreshSlots(){
    const previous=slotSelect.value;const duration=Number(durationSelect.value);
    slotSelect.replaceChildren(new Option('Selecciona una hora',''));
    available(dateSelect.value,duration).forEach(h=>slotSelect.add(new Option(`${h}:00 h`,String(h))));
    if([...slotSelect.options].some(o=>o.value===previous))slotSelect.value=previous;
    document.querySelector('#booking-total').textContent=money(duration*12);
    document.querySelector('#booking-validation').textContent=dateSelect.value && slotSelect.options.length===1?'Aquest dia no té dues hores consecutives disponibles. Tria un altre dia o una sessió d’una hora.':'';
  }
  function refreshTutor(){
    const tutor=document.querySelector('#booking-tutor');
    const named=['Matemàtiques','Programació','Bases de dades'].includes(subjectSelect.value);
    tutor.replaceChildren(new Option(named?'Aleix García':'Tutor pendent d’assignació',named?'Aleix García':'Tutor pendent d’assignació'));
  }
  days.forEach(day=>dateSelect.add(new Option(labelDate(day),day)));
  const setValid=(select,value)=>{if([...select.options].some(o=>o.value===value))select.value=value;};
  setValid(subjectSelect,query.get('materia'));refreshTutor();
  setValid(document.querySelector('#booking-support'),query.get('suport'));
  setValid(dateSelect,query.get('dia'));refreshSlots();setValid(slotSelect,query.get('hora'));
  dateSelect.addEventListener('change',refreshSlots);durationSelect.addEventListener('change',refreshSlots);subjectSelect.addEventListener('change',refreshTutor);
  document.querySelectorAll('[data-demo]').forEach(trigger=>trigger.addEventListener('click',event=>{
    event.preventDefault();const tutor=trigger.dataset.demo==='tutor';
    title.textContent=tutor?'Prepara el teu perfil.':'Preparem la teva classe.';
    if(!inline)dialog.showModal();showPanel(tutor?'tutor-demo':'booking-selection');
  }));
  dialog.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());
  if(!inline)dialog.addEventListener('click',event=>{const b=dialog.getBoundingClientRect();if(event.target===dialog&&(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom))dialog.close();});
  form.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(form);const duration=Number(data.get('duration'));const day=data.get('date');const hour=Number(data.get('slot'));
    if(day<=dateKey(new Date()) || !available(day,duration).includes(hour)) {document.querySelector('#booking-validation').textContent='Selecciona un horari disponible en una data futura.';showPanel('booking-selection');return;}
    summary=`${data.get('subject')} · ${data.get('support')}\n${data.get('tutor')}\n${labelDate(day)} · ${hour}:00 h · Hora de Catalunya\n${duration} h · ${money(duration*12)}`;
    document.querySelector('#payment-summary').textContent=summary;showPanel('booking-payment');
  });
  document.querySelector('#back-booking').addEventListener('click',()=>showPanel('booking-selection'));
  document.querySelector('#confirm-payment').addEventListener('click',()=>{
    try{sessionStorage.setItem(storageKey,JSON.stringify({summary}));}catch{document.querySelector('#booking-success > p').textContent='La sessió està preparada. Aquest navegador no permet desar-la: conserva el resum abans de sortir.';}
    document.querySelector('#success-summary').textContent=summary;updateSaved();showPanel('booking-success');
  });
  document.querySelector('#enter-classroom').addEventListener('click',()=>showPanel('booking-classroom'));
  document.querySelector('#finish-classroom').addEventListener('click',()=>showPanel('booking-feedback'));
  function resetBooking(){document.querySelector('#feedback-form').reset();document.querySelector('#feedback-form').hidden=false;document.querySelector('#feedback-message').hidden=true;showPanel('booking-selection');}
  document.querySelector('#new-booking').addEventListener('click',resetBooking);document.querySelector('#feedback-restart').addEventListener('click',resetBooking);
  document.querySelector('#resume-session')?.addEventListener('click',()=>showPanel('booking-classroom'));
  document.querySelector('#cancel-session')?.addEventListener('click',()=>{try{sessionStorage.removeItem(storageKey);}catch{}updateSaved();document.querySelector('#saved-session-empty').textContent='Sessió eliminada. Pots preparar-ne una altra quan vulguis.';});
  document.querySelector('#feedback-form').addEventListener('submit',event=>{event.preventDefault();event.currentTarget.hidden=true;document.querySelector('#feedback-message').hidden=false;});
  document.querySelector('#tutor-form').addEventListener('submit',event=>{
    event.preventDefault();const selections=[...event.currentTarget.querySelectorAll('select')].map(e=>e.value);event.currentTarget.hidden=true;
    document.querySelector('#tutor-profile-summary').textContent=selections.join(' · ');document.querySelector('#tutor-success').hidden=false;
  });
  updateSaved();showPanel(tutorPage?'tutor-demo':'booking-selection',false);
})();
