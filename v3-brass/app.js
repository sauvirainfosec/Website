'use strict';
// Set verified contact addresses before launch. Empty values deliberately prevent misdirected inquiries.
const CONTACT = { generalEmail: '', incidentEmail: '' };
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const dialog = document.querySelector('#content-dialog');
const dialogContent = document.querySelector('#dialog-content');
function showDialog(content) { dialogContent.innerHTML = content; dialog.showModal(); }
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  const incident = button.dataset.contact === 'incident';
  const email = incident ? CONTACT.incidentEmail : CONTACT.generalEmail;
  const title = incident ? 'Incident response support' : 'Let’s start a conversation.';
  showDialog(`<div class="dialog-body"><span class="eyebrow">${incident ? 'RESPOND WITH CLARITY' : 'TALK TO SAUVIRA'}</span><h2 class="dialog-title" id="dialog-title">${title}</h2>${email ? '<p>Open your email app to share a brief overview of your needs. Please do not include passwords or sensitive evidence.</p><a class="button" id="email-link">Open email</a>' : '<span class="placeholder">CONTACT DETAILS PENDING VERIFICATION</span><p>This local preview is not connected to an inquiry service. A verified Sauvira contact address must be added before launch.</p><p>No inquiry has been sent. Please use your existing verified Sauvira contact if you already have one.</p>'}</div>`);
  if (email) { const link = document.querySelector('#email-link'); link.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(incident ? 'Incident response inquiry' : 'Sauvira consultation inquiry')}`; }
}));
const articles = [
  { tag: 'INCIDENT RESPONSE', title: 'Before an incident: the questions worth asking.', content: '<p>Preparation begins with a shared understanding of who will make decisions and how teams will work together.</p><h3>Make responsibility explicit</h3><p>Identify the people who can approve response actions and the contacts needed across technology, operations, communications and legal teams.</p><h3>Know your critical dependencies</h3><p>Discuss which services matter most, what they depend on and how the organisation would operate if they became unavailable.</p><h3>Practise the conversation</h3><p>A tabletop exercise can reveal gaps in escalation paths and decision-making before a real incident puts them under pressure.</p>' },
  { tag: 'DIGITAL FORENSICS', title: 'Why evidence belongs in your response plan.', content: '<p>Restoring service and understanding an incident are connected objectives. Planning for both helps teams make deliberate choices under pressure.</p><h3>Plan for specialist support</h3><p>Identify who will advise on investigation and evidence handling, and how they will coordinate with the response team.</p><h3>Keep a clear record</h3><p>Discuss how the team will document decisions, observations and actions during an incident. Agree on responsibilities before they are needed.</p><h3>Coordinate early</h3><p>Evidence requirements depend on the situation. Involve appropriate technical and legal advisers when establishing a response plan.</p>' },
  { tag: 'CYBER CAPABILITY', title: 'From classroom knowledge to practical capability.', content: '<p>A useful cyber lab connects theory to realistic tasks in a controlled learning environment.</p><h3>Start with learning outcomes</h3><p>Define what learners should be able to explain, investigate or demonstrate by the end of an exercise.</p><h3>Build in reflection</h3><p>Allow time to review decisions, compare approaches and explain the reasoning behind results.</p><h3>Support the educators</h3><p>Lab infrastructure is only part of the investment. Faculty preparation, well-scoped exercises and ongoing maintenance help sustain learning.</p>' }
];
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => { const article = articles[Number(button.dataset.article)]; showDialog(`<div class="dialog-body"><span class="eyebrow">${article.tag}</span><h2 class="dialog-title" id="dialog-title">${article.title}</h2><span class="placeholder">DRAFT EDITORIAL — REVIEW BEFORE PUBLICATION</span>${article.content}</div>`); }));
document.querySelector('[data-privacy]').addEventListener('click', () => showDialog('<div class="dialog-body"><span class="eyebrow">LOCAL PREVIEW</span><h2 class="dialog-title" id="dialog-title">Privacy information</h2><p>This preview does not include analytics, tracking cookies or a contact form. It does not store inquiry data.</p><p>A company-approved privacy notice must be added before launch, reflecting the final hosting, analytics and inquiry services. A hosting provider may process standard access logs.</p></div>'));
