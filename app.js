'use strict';

const zones = {
  farm: {
    number: '01', label: '01 / THE FARMING ZONE', kicker: 'GROW WITH THE LAND',
    title: 'Where it all begins.', image: './assets/farm.webp',
    alt: 'Concept image of Arabica coffee cherries growing on a highland farm',
    description: 'Explore 4.4 acres with approximately 3,000 Arabica trees, intercropped with tea, macadamia, papaya, dragon fruit and passion fruit.',
    highlights: ['4.4 ACRES OF COFFEE', '3,000 ARABICA TREES'],
    activities: ['Walk among the coffee trees', 'Discover companion crops', 'See the harvest up close']
  },
  factory: {
    number: '02', label: '02 / THE FACTORY ZONE', kicker: 'THE CRAFT BEHIND THE CUP',
    title: 'A thoughtful transformation.', image: './assets/factory.webp',
    alt: 'Concept image of raised drying beds in a boutique coffee facility',
    description: 'Discover the proposed boutique washed-process facility, from flotation sorting and fermentation tanks to raised solar drying beds.',
    highlights: ['WASHED-PROCESS COFFEE', 'RAISED DRYING BEDS'],
    activities: ['Follow the washed process', 'Explore the drying beds', 'Discover coffee craftsmanship']
  },
  relax: {
    number: '03', label: '03 / THE RELAX ZONE', kicker: 'FIND YOUR QUIET PLACE',
    title: 'A little room to breathe.', image: './assets/retreat.webp',
    alt: 'Concept image of a timber veranda overlooking misty highland hills',
    description: 'Imagine mountain views, fresh brews and unhurried moments around a solar-powered pond setting in the highland air.',
    highlights: ['MOUNTAIN VERANDA', 'PANORAMIC VIEWPOINTS'],
    activities: ['Pause with a fresh brew', 'Take in the mountain views', 'Unwind by the ponds']
  }
};

const stages = [
  { label: 'STAGE ONE · THE BEGINNING', title: 'Flotation Tank<br>& Sizing', description: 'Freshly harvested cherries are introduced to water, where flotation helps separate them before sorting and sizing.', fact: 'A careful first selection' },
  { label: 'STAGE TWO · REVEAL THE BEAN', title: 'Mechanical<br>Depulping', description: 'A depulper removes the outer fruit from each coffee cherry, revealing the precious beans within.', fact: 'From ripe cherry to coffee seed' },
  { label: 'STAGE THREE · PATIENCE', title: 'Tank<br>Fermentation', description: 'The beans rest in fermentation tanks for approximately 12–36 hours, helping loosen the remaining fruit layer before washing.', fact: '12–36 hours of careful fermentation' },
  { label: 'STAGE FOUR · SUN & AIR', title: 'Raised<br>Sun-Drying', description: 'After washing, the beans dry on raised beds in the sun until they reach approximately 11–12% moisture.', fact: 'Target moisture: 11–12%' },
  { label: 'STAGE FIVE · REFINEMENT', title: 'Hulling &<br>Density Grading', description: 'The dried parchment layer is removed, then green beans are graded by characteristics including size and density.', fact: 'A considered selection of green coffee' },
  { label: 'STAGE SIX · THE FINISH', title: 'Artisan Roasting<br>& Nitrogen Sealing', description: 'Coffee is roasted to bring out its character and sealed with nitrogen to help protect its freshness.', fact: 'Ready to become your next favourite cup' }
];

const trips = {
  harvest: {
    name: 'Day Harvest Tour', tag: 'DAY EXPERIENCE', title: 'A day in the<br><em>growing fields.</em>',
    itinerary: ['Welcome & estate introduction', 'Guided coffee and orchard walk', 'Fresh brew and time to unwind'],
    total: guests => 45000 * guests,
    rate: guests => '45,000 MMK × ' + guests + ' ' + t(guests === 1 ? 'guest' : 'guests')
  },
  villa: {
    name: 'Weekend Villa Stay', tag: 'TWO-NIGHT EXPERIENCE', title: 'A little longer<br><em>in the highlands.</em>',
    itinerary: ['Arrive and settle into your villa', 'Explore the estate and enjoy a fresh brew', 'Two unhurried nights in the highlands'],
    total: guests => 380000 + Math.max(0, guests - 2) * 95000,
    rate: guests => guests <= 2 ? '380,000 MMK ' + t('base · up to 2 guests') : '380,000 MMK ' + t('base') + ' + 95,000 × ' + (guests - 2) + ' ' + t('extra'),
  },
  cupping: {
    name: 'Specialty Cupping Workshop', tag: 'COFFEE EXPERIENCE', title: 'Discover a more<br><em>thoughtful cup.</em>',
    itinerary: ['Meet the coffee and its origin', 'Explore aroma and tasting techniques', 'Compare flavours in a guided cupping'],
    total: guests => 65000 * guests,
    rate: guests => '65,000 MMK × ' + guests + ' ' + t(guests === 1 ? 'guest' : 'guests')
  }
};

const byId = id => document.getElementById(id);
const addTextItems = (container, items, tag, builder) => {
  container.replaceChildren(...items.map((item, index) => {
    const element = document.createElement(tag);
    builder(element, item, index);
    return element;
  }));
};

let selectedZone = 'farm';
function setZone(name) {
  const zone = zones[name];
  if (!zone) return;
  selectedZone = name;
  document.querySelectorAll('[data-zone]').forEach(button => {
    const selected = button.dataset.zone === name;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  const image = byId('zone-image');
  image.src = zone.image;
  image.alt = t(zone.alt);
  byId('zone-photo-label').textContent = zone.label;
  byId('zone-kicker').textContent = zone.kicker;
  byId('zone-title').textContent = zone.title;
  byId('zone-number').textContent = zone.number;
  byId('zone-description').textContent = zone.description;
  addTextItems(byId('zone-highlights'), zone.highlights, 'span', (element, text) => { element.textContent = text; });
  addTextItems(byId('zone-activities'), zone.activities, 'div', (element, text, index) => {
    const number = document.createElement('b');
    const label = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    label.textContent = text;
    element.append(number, label);
  });
  localizePage();
}
document.querySelectorAll('[data-zone]').forEach(button => button.addEventListener('click', () => setZone(button.dataset.zone)));

let currentStage = 0;
function setStage(index) {
  currentStage = (index + stages.length) % stages.length;
  const stage = stages[currentStage];
  document.querySelectorAll('[data-step]').forEach(button => {
    const selected = Number(button.dataset.step) === currentStage;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  byId('process-counter').textContent = String(currentStage + 1).padStart(2, '0') + ' / 06';
  byId('step-progress').style.width = ((currentStage + 1) / stages.length * 100) + '%';
  byId('stage-label').textContent = stage.label;
  byId('stage-title').innerHTML = stage.title;
  byId('stage-description').textContent = stage.description;
  byId('stage-fact').querySelector('span').textContent = stage.fact;
  const card = byId('process-stage');
  card.classList.remove('animate');
  void card.offsetWidth;
  card.classList.add('animate');
  localizePage();
}
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => setStage(Number(button.dataset.step))));
byId('prev-step').addEventListener('click', () => setStage(currentStage - 1));
byId('next-step').addEventListener('click', () => setStage(currentStage + 1));

document.querySelectorAll('.crop-card').forEach(card => {
  card.addEventListener('click', () => {
    const opening = card.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('.crop-card').forEach(other => {
      other.classList.remove('is-open');
      other.setAttribute('aria-expanded', 'false');
    });
    card.classList.toggle('is-open', opening);
    card.setAttribute('aria-expanded', String(opening));
  });
});

let selectedTrip = 'harvest';
let guests = 2;
const money = value => new Intl.NumberFormat('en-US').format(value);
function updatePlanner() {
  const trip = trips[selectedTrip];
  document.querySelectorAll('[data-trip]').forEach(button => {
    const selected = button.dataset.trip === selectedTrip;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  byId('guest-count').textContent = guests;
  byId('guest-minus').disabled = guests <= 1;
  byId('guest-plus').disabled = guests >= 12;
  byId('quote-tag').textContent = t(trip.tag) + ' · ' + guests + ' ' + t(guests === 1 ? 'GUEST' : 'GUESTS');
  byId('quote-title').innerHTML = trip.title;
  addTextItems(byId('itinerary'), trip.itinerary, 'li', (element, text, index) => {
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    element.append(number, document.createTextNode(text));
  });
  byId('quote-total').replaceChildren(document.createTextNode(money(trip.total(guests)) + ' '), Object.assign(document.createElement('small'), { textContent: 'MMK' }));
  byId('quote-rate').textContent = trip.rate(guests);
  localizePage();
}
document.querySelectorAll('[data-trip]').forEach(button => button.addEventListener('click', () => { selectedTrip = button.dataset.trip; updatePlanner(); }));
byId('guest-minus').addEventListener('click', () => { guests = Math.max(1, guests - 1); updatePlanner(); });
byId('guest-plus').addEventListener('click', () => { guests = Math.min(12, guests + 1); updatePlanner(); });

let contactMode = 'visit';
function setContactMode(mode) {
  contactMode = mode;
  document.querySelectorAll('[data-contact]').forEach(button => {
    const selected = button.dataset.contact === mode;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (mode === 'wholesale') {
    byId('detail-label').innerHTML = 'Company / organisation <input name="company" autocomplete="organization" placeholder="Optional">';
    byId('company-label').innerHTML = 'Volume required (kg) <input name="volume" type="number" min="1" placeholder="Optional">';
    byId('contact-message').placeholder = t('Tell us about the green coffee or wholesale supply you need...');
  } else {
    byId('detail-label').innerHTML = 'Preferred date <input name="date" type="date">';
    byId('company-label').innerHTML = 'Phone <input name="phone" type="tel" autocomplete="tel" placeholder="Optional">';
    byId('contact-message').placeholder = t('Tell us a little about your plans...');
  }
  byId('form-status').hidden = true;
  localizePage();
}
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => setContactMode(button.dataset.contact)));
byId('send-plan').addEventListener('click', () => {
  const trip = trips[selectedTrip];
  setContactMode('visit');
  const greeting = t('Hello, I would like to enquire about the {trip} for {count} {guests}.').replace('{trip}', t(trip.name)).replace('{count}', guests).replace('{guests}', t(guests === 1 ? 'guest' : 'guests'));
  const estimate = t('The planner showed an illustrative estimate of {amount} MMK. Please let me know the actual availability, itinerary and price.').replace('{amount}', money(trip.total(guests)));
  byId('contact-message').value = [greeting, estimate, t('Thank you.')].join('\n\n');
  byId('contact').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  window.setTimeout(() => byId('contact-form').querySelector('[name="name"]').focus({ preventScroll: true }), 450);
});

byId('contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const title = t(contactMode === 'wholesale' ? 'B2B Green Coffee & Wholesale Supply' : 'Vacation & Day Trip Booking');
  const details = contactMode === 'wholesale'
    ? [t('Company:') + ' ' + (data.get('company') || t('Not provided')), t('Requested volume (kg):') + ' ' + (data.get('volume') || t('Not provided'))]
    : [t('Preferred date:') + ' ' + (data.get('date') || t('Not provided')), t('Phone:') + ' ' + (data.get('phone') || t('Not provided'))];
  const body = [t('Enquiry type:') + ' ' + title, t('Name:') + ' ' + data.get('name'), t('Email:') + ' ' + data.get('email'), ...details, '', t('Message:'), data.get('message')].join('\n');
  const mailto = 'mailto:umyohtut1971@gmail.com?subject=' + encodeURIComponent(t('Anisakan enquiry:') + ' ' + title) + '&body=' + encodeURIComponent(body);
  const status = byId('form-status');
  const link = document.createElement('a');
  link.href = mailto;
  link.textContent = t('open the draft again');
  status.replaceChildren(document.createTextNode(t('Your email draft is ready. If it did not open, ')), link, document.createTextNode(t('. Please send it from your email app.')));
  status.hidden = false;
  window.location.href = mailto;
});

const menu = byId('mobile-nav');
const menuToggle = byId('menu-toggle');
function closeMenu() {
  menu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', t('Open navigation'));
}
menuToggle.addEventListener('click', () => {
  const opening = menu.hidden;
  menu.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', t(opening ? 'Close navigation' : 'Open navigation'));
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuToggle.focus(); } });
byId('year').textContent = new Date().getFullYear();
updatePlanner();

function refreshLocalizedInteractiveContent() {
  setZone(selectedZone);
  setStage(currentStage);
  updatePlanner();
  byId('contact-message').placeholder = t(contactMode === 'wholesale' ? 'Tell us about the green coffee or wholesale supply you need...' : 'Tell us a little about your plans...');
  menuToggle.setAttribute('aria-label', t(menu.hidden ? 'Open navigation' : 'Close navigation'));
  byId('form-status').hidden = true;
  byId('presentation-toggle').textContent = t(document.fullscreenElement ? 'Exit full screen' : 'Present full screen');
}

byId('presentation-toggle').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
    byId('presentation-status').textContent = '';
  } catch (_) {
    byId('presentation-status').textContent = t('Use your browser’s full-screen control to present.');
  }
});
document.addEventListener('fullscreenchange', () => {
  byId('presentation-toggle').textContent = t(document.fullscreenElement ? 'Exit full screen' : 'Present full screen');
});
