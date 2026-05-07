// App.js - main application entry point.
// It wires together the shared state, page navigation, and global event bindings
// for the dashboard, profile, webinars, messages, and auth UI.
import { appState, ui } from './state.js';
import { $, $$, showPage, closeModal } from './dom.js';
import { handleLogin, handleSignup, logout } from './auth.js';
import { filterCourses, setPriceFilter, openPostModal, openWebinarModal, submitCourse, submitWebinar, togglePrice, enrollCourse } from './courses.js';
import { saveProfile, addTagFromInput, handleTagRemove } from './profile.js';
import { renderWebinarTab, setWebinarTab, joinWebinar } from './webinars.js';
import { renderConversations, selectConversation, sendMessageBtn, openChat as messagesOpenChat } from './messages.js';

const pageMap = {
  Courses: 'page-dashboard',
  'Profile & Match': 'page-profile',
  Webinars: 'page-webinar',
  Messages: 'page-messages',
};

// Switches the active page and highlights the selected nav link.
// This keeps the SPA navigation logic centralized in one place.
function setActiveNav(clickedLink, pageId) {
  if (typeof clickedLink === 'string') {
    pageId = clickedLink;
    clickedLink = null;
  } else if (clickedLink && !pageId) {
    pageId = pageMap[clickedLink.textContent.trim()] || 'page-dashboard';
  }

  $$('.nav-link').forEach(link => {
    const linkPage = pageMap[link.textContent.trim()];
    link.classList.toggle('active', linkPage === pageId);
  });

  if (pageId) {
    showPage(pageId);
  }
}

// Attaches click handlers to all navigation links in the header/sidebar.
// When a link is clicked, it activates the corresponding page section.
function bindNavLinks() {
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      setActiveNav(link);
    });
  });
}

// Attaches all other global event listeners for buttons, inputs, modals, and tabs.
// This is the single place where the app wires UI controls to the feature modules.
function bindGlobalActions() {
  $('#btn-login')?.addEventListener('click', handleLogin);
  $('#btn-signup')?.addEventListener('click', handleSignup);
  $('#link-show-signup')?.addEventListener('click', event => {
    event.preventDefault();
    showPage('page-signup');
  });
  $('#link-show-login')?.addEventListener('click', event => {
    event.preventDefault();
    showPage('page-login');
  });
  $$('.btn-logout').forEach(button => button.addEventListener('click', logout));
  $('#btn-go-profile')?.addEventListener('click', () => setActiveNav('page-profile'));
  $('#btn-open-post')?.addEventListener('click', openPostModal);
  $('#btn-open-webinar')?.addEventListener('click', openWebinarModal);
  $('#btn-save-profile')?.addEventListener('click', saveProfile);
  $('#btn-send-message')?.addEventListener('click', sendMessageBtn);
  $('#btn-submit-course')?.addEventListener('click', submitCourse);
  $('#btn-submit-webinar')?.addEventListener('click', submitWebinar);

  ui.courseSearch?.addEventListener('input', filterCourses);
  ui.uniFilter?.addEventListener('change', filterCourses);
  $('#price-type')?.addEventListener('change', togglePrice);
  ui.chatInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessageBtn();
    }
  });

  $$('.pill').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.priceFilter;
      if (filter) {
        setPriceFilter(filter, button);
      }
    });
  });

  $('#course-grid')?.addEventListener('click', event => {
    const button = event.target.closest('.enroll-btn');
    if (button) {
      enrollCourse(button.dataset.courseTitle);
    }
  });

  $('#match-list')?.addEventListener('click', event => {
    const button = event.target.closest('[data-chat-name]');
    if (button) {
      messagesOpenChat(button.dataset.chatName);
      setActiveNav('page-messages');
    }
  });

  $('#conv-list')?.addEventListener('click', event => {
    const item = event.target.closest('.conv-item');
    if (item && item.dataset.convIndex) {
      selectConversation(Number(item.dataset.convIndex));
    }
  });

  $('#course-search')?.addEventListener('input', filterCourses);
  $('#uni-filter')?.addEventListener('change', filterCourses);

  $('#btn-add-teach')?.addEventListener('click', () => addTagFromInput('teach-tags', 'teach-input', 'green'));
  $('#btn-add-learn')?.addEventListener('click', () => addTagFromInput('learn-tags', 'learn-input', 'blue'));
  $('#teach-input')?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTagFromInput('teach-tags', 'teach-input', 'green');
    }
  });
  $('#learn-input')?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTagFromInput('learn-tags', 'learn-input', 'blue');
    }
  });

  $('#teach-tags')?.addEventListener('click', handleTagRemove);
  $('#learn-tags')?.addEventListener('click', handleTagRemove);

  $('#webinar-list')?.addEventListener('click', event => {
    const button = event.target.closest('[data-webinar-title]');
    if (button) {
      joinWebinar(button.dataset.webinarTitle);
    }
  });

  $$('.modal-overlay[data-modal-close]').forEach(overlay => {
    overlay.addEventListener('click', () => closeModal(overlay.dataset.modalClose));
  });
  $$('.modal-box').forEach(box => {
    box.addEventListener('click', event => event.stopPropagation());
  });

  $$('.wtab').forEach(tab => {
    tab.addEventListener('click', () => setWebinarTab(tab.dataset.tab, tab));
  });
}

// Initializes UI references, binds event handlers, and renders the initial page data.
// This runs when the DOM content is ready.
function initUI() {
  ui.courseSearch = $('#course-search');
  ui.uniFilter = $('#uni-filter');
  ui.chatInput = $('#chat-input');

  bindNavLinks();
  bindGlobalActions();

  renderConversations();
  renderWebinarTab('upcoming');
}

document.addEventListener('DOMContentLoaded', initUI);
