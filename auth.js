// auth.js - login, signup, and logout flow.
// Updates app state and refreshes page content after authentication actions.
import { appState } from './state.js';
import { setNavUsernames, showPage, showToast } from './dom.js';
import { renderCourses } from './courses.js';
import { renderMatches } from './profile.js';
import { renderConversations } from './messages.js';
import { renderWebinarTab } from './webinars.js';

export function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value.trim();
  const errEl = document.getElementById('login-error');

  if (!email || !pass) {
    errEl.classList.remove('hidden');
    return;
  }

  errEl.classList.add('hidden');
  const username = email.split('@')[0];
  appState.activeUser = { email, username };

  setNavUsernames(username);
  renderCourses();
  renderMatches();
  renderConversations();
  renderWebinarTab('upcoming');
  showPage('page-dashboard');
}

export function handleSignup() {
  showToast('Account created! Welcome to DabaShare 🎉');
  showPage('page-login');
}

export function logout() {
  appState.activeUser = null;
  showPage('page-login');
}
