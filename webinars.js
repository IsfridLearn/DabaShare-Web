// webinars.js - webinar and study session tab logic.
// Renders webinar cards for each selected tab and handles join actions.
import { $, $$, showToast } from './dom.js';
import { webinarsByTab } from './data.js';

export function getWebinarBadgeClass(type) {
  if (type === 'Live') return 'type-live';
  if (type === 'Webinar') return 'type-webinar';
  return 'type-study';
}

export function buildWebinarCard(webinar) {
  const isLive = webinar.type === 'Live';
  const badgeClass = getWebinarBadgeClass(webinar.type);
  const badgeLabel = isLive ? '🔴 LIVE' : webinar.type;
  const btnClass = isLive ? 'join-btn live' : 'join-btn';
  const btnLabel = isLive ? '🔴 Join Live Now' : 'Join Session';

  return `
    <div class="webinar-card">
      <div class="webinar-card-top">
        <span class="webinar-type-badge ${badgeClass}">${badgeLabel}</span>
      </div>
      <div class="webinar-title">${webinar.title}</div>
      <div class="webinar-meta">
        <span>👤 Hosted by ${webinar.host}</span>
        <span>🗓 ${webinar.date}</span>
        <span>👥 ${webinar.participants} participants</span>
      </div>
      <div class="webinar-desc">${webinar.desc}</div>
      <button type="button" class="${btnClass}" data-webinar-title="${webinar.title}">${btnLabel}</button>
    </div>
  `;
}

export function renderWebinarTab(tab) {
  const listEl = $('#webinar-list');
  const webinars = webinarsByTab[tab] || [];

  if (!webinars.length) {
    listEl.innerHTML = '<p style="color:var(--gray-400);padding:20px">No sessions found.</p>';
    return;
  }

  listEl.innerHTML = webinars.map(buildWebinarCard).join('');
}

export function setWebinarTab(tab, btn) {
  $$('.wtab').forEach(t => t.classList.remove('active'));
  btn?.classList.add('active');
  renderWebinarTab(tab);
}

export function joinWebinar(title) {
  showToast(`Joining "${title}" — opening video call... 📹`);
}
