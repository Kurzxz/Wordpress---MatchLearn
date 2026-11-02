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
  const dialog = document.querySelector('#booking-dialog');
  if (!dialog) return;
  const panels = ['booking-selection', 'booking-payment', 'booking-success', 'booking-classroom', 'booking-feedback', 'tutor-demo'];
  const title = document.querySelector('#booking-title');
  const form = document.querySelector('#booking-form');
  const money = value => new Intl.NumberFormat('ca-ES', { style: 'currency', currency: 'EUR' }).format(value);
  function showPanel(id) {
    panels.forEach(panel => { document.getElementById(panel).hidden = panel !== id; });
    dialog.scrollTop = 0;
    title.tabIndex = -1;
    title.focus();
  }
  document.querySelectorAll('[data-demo]').forEach(trigger => trigger.addEventListener('click', event => {
    event.preventDefault();
    const tutor = trigger.dataset.demo === 'tutor';
    title.textContent = tutor ? 'Comparteix el que saps.' : 'El teu següent pas.';
    document.querySelector('#tutor-form').hidden = false;
    document.querySelector('#tutor-success').hidden = true;
    document.querySelector('#feedback-form').hidden = false;
    document.querySelector('#feedback-message').hidden = true;
    document.querySelector('#feedback-form').reset();
    document.querySelector('#tutor-form').reset();
    const subject = trigger.querySelector('h3')?.textContent;
    if (subject) document.querySelector('#booking-subject').value = subject;
    dialog.showModal();
    showPanel(tutor ? 'tutor-demo' : 'booking-selection');
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  document.querySelector('#booking-duration').addEventListener('change', event => {
    document.querySelector('#booking-total').textContent = money(Number(event.target.value) * 12);
  });
  let summary = '';
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    summary = `${data.get('subject')}\n${data.get('tutor')}\n${data.get('slot')} · Hora de Catalunya\n${data.get('duration')} h · ${money(Number(data.get('duration')) * 12)} (simulats)`;
    document.querySelector('#payment-summary').textContent = summary;
    showPanel('booking-payment');
  });
  document.querySelector('#back-booking').addEventListener('click', () => showPanel('booking-selection'));
  document.querySelector('#confirm-payment').addEventListener('click', () => {
    document.querySelector('#success-summary').textContent = summary;
    showPanel('booking-success');
  });
  document.querySelector('#enter-classroom').addEventListener('click', () => showPanel('booking-classroom'));
  document.querySelector('#finish-classroom').addEventListener('click', () => showPanel('booking-feedback'));
  document.querySelector('#feedback-form').addEventListener('submit', event => {
    event.preventDefault();
    event.currentTarget.hidden = true;
    document.querySelector('#feedback-message').hidden = false;
  });
  document.querySelector('#tutor-form').addEventListener('submit', event => {
    event.preventDefault();
    event.currentTarget.hidden = true;
    document.querySelector('#tutor-success').hidden = false;
  });
})();
