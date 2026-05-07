// profile.js - profile and match page logic.
// Handles rendering match cards, adding/removing tags, and saving a profile.
import { matchList } from './data.js';
import { showToast, $ } from './dom.js';

export function buildMatchCard(match) {
  const teachTags = match.teaches.map(s => `<span class="match-tag">Teaches: ${s}</span>`).join('');
  const wantTags = match.wants.map(s => `<span class="match-tag" style="background:#EDE9FE;color:#5B21B6">Wants: ${s}</span>`).join('');

  return `
    <div class="match-card">
      <div class="match-avatar" style="background:${match.color}">${match.name.charAt(0)}</div>
      <div class="match-info">
        <strong>${match.name}</strong>
        <span>${match.uni}</span>
        <div class="match-tags">${teachTags}${wantTags}</div>
      </div>
      <button type="button" class="btn-chat" data-chat-name="${match.name}">Chat</button>
    </div>
  `;
}

export function renderMatches() {
  $('#match-list').innerHTML = matchList.map(buildMatchCard).join('');
}

export function addTagFromInput(containerId, inputId, colorClass) {
  const input = $(`#${inputId}`);
  const val = input.value.trim();
  if (!val) return;

  const tag = document.createElement('span');
  tag.className = `tag ${colorClass}`;
  tag.innerHTML = `${val} <button type="button" class="tag-remove" data-tag-container="${containerId}">×</button>`;

  $(`#${containerId}`)?.appendChild(tag);
  input.value = '';
}

export function handleTagRemove(event) {
  const button = event.target.closest('.tag-remove');
  if (!button) return;

  button.closest('.tag')?.remove();
}

export function saveProfile() {
  showToast('Profile saved! Finding your matches... 🔍');
  renderMatches();
}
