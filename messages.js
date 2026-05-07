// messages.js - chat and conversation behavior.
// Manages the conversation list, message rendering, chat selection, and simulated replies.
import { appState } from './state.js';
import { conversationList, autoReplies } from './data.js';
import { $ } from './dom.js';

export function buildConvItem(conv, index) {
  const isActive = index === appState.activeConvIndex;
  const unreadDot = conv.unread > 0
    ? `<div class="conv-unread">${conv.unread}</div>`
    : '';

  return `
    <div class="conv-item ${isActive ? 'active' : ''}" data-conv-index="${index}">
      <div class="conv-av" style="background:${conv.color}">${conv.name.charAt(0)}</div>
      <div class="conv-info">
        <strong>${conv.name}</strong>
        <span>${conv.last}</span>
      </div>
      <div class="conv-meta">
        <div>${conv.time}</div>
        ${unreadDot}
      </div>
    </div>
  `;
}

export function renderConversations() {
  $('#conv-list').innerHTML = conversationList.map(buildConvItem).join('');
}

export function renderMessages(idx) {
  const conv = conversationList[idx];
  const chatEl = $('#chat-messages');

  $('#chat-name').textContent = conv.name;

  chatEl.innerHTML = conv.messages.map(msg => `
    <div class="msg ${msg.from === 'me' ? 'me' : 'them'}">
      <div class="msg-bubble">${msg.text}</div>
      <div class="msg-time">${msg.time}</div>
    </div>
  `).join('');

  chatEl.scrollTop = chatEl.scrollHeight;
}

export function selectConversation(idx) {
  appState.activeConvIndex = idx;
  conversationList[idx].unread = 0;
  renderConversations();
  renderMessages(idx);
}

function getTimestamp() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scheduleAutoReply() {
  const delay = 1000 + Math.random() * 800;

  setTimeout(() => {
    const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    conversationList[appState.activeConvIndex].messages.push({ from:'them', text:reply, time:getTimestamp() });
    conversationList[appState.activeConvIndex].last = reply;
    renderMessages(appState.activeConvIndex);
    renderConversations();
  }, delay);
}

export function sendMessageBtn() {
  const input = $('#chat-input');
  const text = input.value.trim();
  if (!text) return;

  conversationList[appState.activeConvIndex].messages.push({ from:'me', text, time:getTimestamp() });
  conversationList[appState.activeConvIndex].last = text;
  input.value = '';

  renderMessages(appState.activeConvIndex);
  renderConversations();
  scheduleAutoReply();
}

export function openChat(personName) {
  const idx = conversationList.findIndex(c => c.name === personName);
  if (idx < 0) return;

  selectConversation(idx);
}
