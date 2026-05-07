// courses.js - course browsing, filtering, and course-related UI actions.
// It renders the course cards and handles enroll/post behavior for the courses page.
import { appState } from './state.js';
import { $, $$, showToast, closeModal } from './dom.js';
import { courseList } from './data.js';

export function getFilteredCourses() {
  const query = ($('#course-search')?.value || '').toLowerCase();
  const uniVal = $('#uni-filter')?.value || 'all';

  return courseList.filter(course => {
    const matchesQuery = !query
      || course.title.toLowerCase().includes(query)
      || course.level.toLowerCase().includes(query);

    const matchesPrice = appState.priceFilter === 'all'
      || (appState.priceFilter === 'free' && course.price === 0)
      || (appState.priceFilter === 'paid' && course.price > 0);

    const matchesUni = uniVal === 'all' || course.uni === uniVal;

    return matchesQuery && matchesPrice && matchesUni;
  });
}

export function buildCourseCard(course) {
  const priceBadge = course.price === 0
    ? '<span class="badge free">FREE</span>'
    : `<span class="badge paid">$ ₱${course.price}</span>`;

  const enrollLabel = course.price === 0
    ? 'Enroll Free'
    : `Enroll · ₱${course.price}`;

  return `
    <div class="course-card">
      <div class="course-card-top">
        <div class="course-title">${course.title}</div>
        ${priceBadge}
      </div>
      <div class="course-level">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        ${course.level} Level
      </div>
      <div class="course-desc">${course.desc}</div>
      <div class="course-footer">
        <span class="stars"><span class="star-icon">★</span> ${course.rating} (${course.reviews} reviews)</span>
        <span class="course-uni">${course.uni}</span>
      </div>
      <button type="button" class="enroll-btn" data-course-title="${course.title}">${enrollLabel}</button>
    </div>
  `;
}

export function renderCourses() {
  const filtered = getFilteredCourses();
  const suffix = filtered.length !== 1 ? 's' : '';

  $('#showing-count').textContent = `Showing ${filtered.length} course${suffix}`;
  $('#course-grid').innerHTML = filtered.map(buildCourseCard).join('');
}

export function filterCourses() {
  renderCourses();
}

export function setPriceFilter(val, btn) {
  appState.priceFilter = val;
  $$('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderCourses();
}

export function enrollCourse(title) {
  showToast(`Enrolled in "${title}" ✓`);
}

export function openPostModal() {
  $('#modal-post').classList.remove('hidden');
}

export function togglePrice() {
  const isPaid = $('#price-type').value === 'paid';
  $('#price-amount-group').classList.toggle('hidden', !isPaid);
}

export function submitCourse() {
  const title = $('#new-course-title')?.value.trim();
  const level = $('#new-course-level')?.value || 'Beginner';
  const desc = $('#new-course-desc')?.value.trim();
  const uni = $('#new-course-uni')?.value || 'UM';
  const isPaid = $('#price-type')?.value === 'paid';
  const price = isPaid ? Number($('#price-amount')?.value || 0) : 0;

  if (!title || !desc) {
    showToast('Please fill in both the course title and description.');
    return;
  }

  const nextId = courseList.length ? Math.max(...courseList.map(course => course.id)) + 1 : 1;
  courseList.push({
    id: nextId,
    title,
    level,
    price,
    uni,
    rating: 4.5,
    reviews: 0,
    desc,
  });

  closeModal('modal-post');
  showToast(`Course "${title}" posted successfully! 🎉`);
  renderCourses();
}

export function openWebinarModal() {
  $('#modal-webinar').classList.remove('hidden');
}

export function submitWebinar() {
  closeModal('modal-webinar');
  showToast('Webinar scheduled! Students can now join 🎥');
}

export function joinWebinar(title) {
  showToast(`Joining "${title}" — opening video call... 📹`);
}
