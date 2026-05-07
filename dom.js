// dom.js - reusable DOM helper functions.
// This file keeps common query and UI manipulation utilities in one place.
export const $ = selector => document.querySelector(selector);
export const $$ = selector => Array.from(document.querySelectorAll(selector));

export function showPage(pageId) {
  $$('.page').forEach(page => page.classList.remove('active'));
  $(`#${pageId}`)?.classList.add('active');
}

export function showToast(msg) {
  const toastEl = $('#toast');
  toastEl.textContent = msg;
  toastEl.classList.remove('hidden');
  setTimeout(() => toastEl.classList.add('hidden'), 3000);
}

export function closeModal(id) {
  if (!id) return;
  const modal = document.getElementById(id);
  modal?.classList.add('hidden');
}

export function setNavUsernames(username) {
  $$('.nav-username').forEach(el => {
    el.textContent = username;
  });
}
