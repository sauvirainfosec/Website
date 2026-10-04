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
function openContact(type) {
  const incident = type === 'incident';
  const S = 'width:100%;padding:10px;background:var(--surface,#1C2433);border:1px solid var(--line);color:var(--text);border-radius:4px;font:inherit';
  const R = '<span style="color:#e05c5c"> *</span>';

  const incidentForm = `
    <form class="contact-form" onsubmit="event.preventDefault();alert('Your incident report has been received. Our team will contact you immediately.');document.querySelector('#content-dialog').close();">
      <p style="color:var(--muted);font-size:.875rem;margin:0 0 20px">Complete this form for rapid triage. All fields are required.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px">
        <div>
          <label style="display:block;margin-bottom:5px;font-size:.875rem" for="ir-email">Work Email${R}</label>
          <input type="email" id="ir-email" name="email" required placeholder="you@company.com" style="${S}">
        </div>
        <div>
          <label style="display:block;margin-bottom:5px;font-size:.875rem" for="ir-phone">Phone Number${R}</label>
          <input type="tel" id="ir-phone" name="phone" required placeholder="+91 XXXXX XXXXX" style="${S}">
        </div>
      </div>
      <div style="margin-bottom:15px">
        <label style="display:block;margin-bottom:8px;font-size:.875rem">Severity Level${R}</label>
        <div style="display:flex;flex-direction:column;gap:8px">
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.875rem;color:var(--muted)">
            <input type="radio" name="severity" value="critical" required style="accent-color:#e05c5c;width:16px;height:16px">
            <span><strong style="color:#e05c5c">Critical</strong> — Active breach / Systems down</span>
          </label>
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.875rem;color:var(--muted)">
            <input type="radio" name="severity" value="high" style="accent-color:#e8a33d;width:16px;height:16px">
            <span><strong style="color:#e8a33d">High</strong> — Suspected compromise</span>
          </label>
          <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.875rem;color:var(--muted)">
            <input type="radio" name="severity" value="low" style="accent-color:var(--accent);width:16px;height:16px">
            <span><strong style="color:var(--accent)">Low / General</strong> — Advisory / Non-urgent</span>
          </label>
        </div>
      </div>
      <div style="margin-bottom:15px">
        <label style="display:block;margin-bottom:5px;font-size:.875rem" for="ir-type">Incident Type${R}</label>
        <select id="ir-type" name="incident_type" required style="${S};appearance:auto">
          <option value="" disabled selected>Select incident type…</option>
          <option value="ransomware">Ransomware</option>
          <option value="account_takeover">Account Takeover</option>
          <option value="data_leak">Data Leak</option>
          <option value="malware">Malware</option>
          <option value="other">Unsure / Other</option>
        </select>
      </div>
      <div style="margin-bottom:20px">
        <label style="display:block;margin-bottom:5px;font-size:.875rem" for="ir-desc">Brief Description${R}</label>
        <textarea id="ir-desc" name="description" rows="4" required placeholder="What happened, when was it noticed, and what systems are affected?" style="${S};resize:vertical"></textarea>
      </div>
      <button type="submit" class="button red" style="width:100%">Submit Incident Report</button>
    </form>`;

  const generalForm = `
    <form class="contact-form" onsubmit="event.preventDefault();alert('Inquiry sent successfully!');document.querySelector('#content-dialog').close();">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px">
        <div>
          <label style="display:block;margin-bottom:5px;font-size:.875rem" for="g-name">Name${R}</label>
          <input type="text" id="g-name" name="name" required style="${S}">
        </div>
        <div>
          <label style="display:block;margin-bottom:5px;font-size:.875rem" for="g-company">Company Name${R}</label>
          <input type="text" id="g-company" name="company" required style="${S}">
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:15px">
        <div>
          <label style="display:block;margin-bottom:5px;font-size:.875rem" for="g-email">Work Email${R}</label>
          <input type="email" id="g-email" name="email" required style="${S}">
        </div>
        <div>
          <label style="display:block;margin-bottom:5px;font-size:.875rem" for="g-phone">Phone Number${R}</label>
          <input type="tel" id="g-phone" name="phone" required style="${S}">
        </div>
      </div>
      <div style="margin-bottom:20px">
        <label style="display:block;margin-bottom:5px;font-size:.875rem" for="g-req">Share your Requirements${R}</label>
        <textarea id="g-req" name="requirement" rows="4" required style="${S};resize:vertical"></textarea>
      </div>
      <button type="submit" class="button" style="width:100%">Submit</button>
    </form>`;

  const title = incident ? 'Incident response support' : 'Let\u2019s start a conversation.';
  showDialog(`<div class="dialog-body"><span class="eyebrow">${incident ? 'RESPOND WITH CLARITY' : 'TALK TO SAUVIRA'}</span><h2 class="dialog-title" id="dialog-title">${title}</h2>${incident ? incidentForm : generalForm}</div>`);
}
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => openContact(button.dataset.contact)));
document.querySelectorAll('.header-emergency').forEach(link => link.addEventListener('click', event => { event.preventDefault(); closeMenu(); openContact('incident'); }));
document.querySelectorAll('.header .button.small').forEach(link => link.addEventListener('click', event => { event.preventDefault(); closeMenu(); openContact('general'); }));
const articles = [
  { tag: 'INCIDENT RESPONSE', title: 'Before an incident: the questions worth asking.', content: '<p>Preparation begins with a shared understanding of who will make decisions and how teams will work together.</p><h3>Make responsibility explicit</h3><p>Identify the people who can approve response actions and the contacts needed across technology, operations, communications and legal teams.</p><h3>Know your critical dependencies</h3><p>Discuss which services matter most, what they depend on and how the organisation would operate if they became unavailable.</p><h3>Practise the conversation</h3><p>A tabletop exercise can reveal gaps in escalation paths and decision-making before a real incident puts them under pressure.</p>' },
  { tag: 'DIGITAL FORENSICS', title: 'Why evidence belongs in your response plan.', content: '<p>Restoring service and understanding an incident are connected objectives. Planning for both helps teams make deliberate choices under pressure.</p><h3>Plan for specialist support</h3><p>Identify who will advise on investigation and evidence handling, and how they will coordinate with the response team.</p><h3>Keep a clear record</h3><p>Discuss how the team will document decisions, observations and actions during an incident. Agree on responsibilities before they are needed.</p><h3>Coordinate early</h3><p>Evidence requirements depend on the situation. Involve appropriate technical and legal advisers when establishing a response plan.</p>' },
  { tag: 'CYBER CAPABILITY', title: 'From classroom knowledge to practical capability.', content: '<p>A useful cyber lab connects theory to realistic tasks in a controlled learning environment.</p><h3>Start with learning outcomes</h3><p>Define what learners should be able to explain, investigate or demonstrate by the end of an exercise.</p><h3>Build in reflection</h3><p>Allow time to review decisions, compare approaches and explain the reasoning behind results.</p><h3>Support the educators</h3><p>Lab infrastructure is only part of the investment. Faculty preparation, well-scoped exercises and ongoing maintenance help sustain learning.</p>' }
];
document.querySelectorAll('[data-article]').forEach(button => button.addEventListener('click', () => { const article = articles[Number(button.dataset.article)]; showDialog(`<div class="dialog-body"><span class="eyebrow">${article.tag}</span><h2 class="dialog-title" id="dialog-title">${article.title}</h2><span class="placeholder">DRAFT EDITORIAL — REVIEW BEFORE PUBLICATION</span>${article.content}</div>`); }));
document.querySelector('[data-privacy]').addEventListener('click', () => showDialog('<div class="dialog-body"><span class="eyebrow">LOCAL PREVIEW</span><h2 class="dialog-title" id="dialog-title">Privacy information</h2><p>This preview does not include analytics, tracking cookies or a contact form. It does not store inquiry data.</p><p>A company-approved privacy notice must be added before launch, reflecting the final hosting, analytics and inquiry services. A hosting provider may process standard access logs.</p></div>'));
