// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('.nav-links a, .btn[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('show');
      }
    });
  });
}

// ============================================
// CASE STUDY MODAL SYSTEM
// ============================================

const caseStudies = {
  swapit: {
    title: "Junior Project Coordinator · Swapit Exchange",
    subtitle: "Building operational clarity in a fast-paced exchange environment",
    problem: "The team at Swapit Exchange was experiencing scattered communication, missed deadlines, and inconsistent project tracking. Multiple tools were being used without a clear system, leading to confusion and delayed deliverables.",
    process: "I implemented a structured project tracking system using Jira and Notion, created clear communication protocols, and established regular check-in rhythms. I also introduced AI-assisted task prioritization to help the team focus on high-impact work.",
    result: "✅ Project cycle time reduced by 20%\n✅ 100% on-time delivery for 3 consecutive sprints\n✅ Team reported 40% less time spent on status updates",
    tools: ["Jira", "Notion", "ChatGPT", "Google Workspace"]
  },
  cephatop: {
    title: "Growth & Revenue Manager · Cephatop Integrated Global",
    subtitle: "Structuring sales operations for sustainable growth",
    problem: "Cephatop had strong sales potential but lacked structured processes for tracking leads, managing customer relationships, and reporting revenue metrics. This created inefficiencies and missed opportunities.",
    process: "I designed and implemented a sales pipeline framework, set up CRM tracking, and created automated reporting dashboards. I also trained the team on new processes and established weekly review rhythms.",
    result: "✅ Revenue tracking accuracy improved by 95%\n✅ Sales pipeline visibility increased 3x\n✅ Team adoption of new CRM system reached 100% within 30 days",
    tools: ["HubSpot", "Airtable", "Zapier", "Google Sheets"]
  }
};

// Get modal elements
const modalOverlay = document.getElementById('caseModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

// Open modal on experience item click
document.querySelectorAll('.exp-item').forEach(item => {
  item.addEventListener('click', function() {
    const caseKey = this.dataset.case;
    const study = caseStudies[caseKey];
    if (!study) return;

    // Build modal content
    modalContent.innerHTML = `
      <h2>${study.title}</h2>
      <p class="modal-subtitle">${study.subtitle}</p>

      <div class="modal-section">
        <h3><i class="fas fa-exclamation-triangle" style="color:var(--terracotta);"></i> The Problem</h3>
        <p>${study.problem}</p>
      </div>

      <div class="modal-section">
        <h3><i class="fas fa-cogs" style="color:var(--terracotta);"></i> The Process</h3>
        <p>${study.process}</p>
      </div>

      <div class="modal-section">
        <h3><i class="fas fa-chart-line" style="color:var(--terracotta);"></i> The Result</h3>
        <div class="modal-result">
          <p>${study.result.replace(/\n/g, '<br>')}</p>
        </div>
      </div>

      <div class="modal-section" style="margin-bottom:0;">
        <h3><i class="fas fa-tools" style="color:var(--terracotta);"></i> Tools Used</h3>
        <div class="exp-skills" style="margin-top:6px;">
          ${study.tools.map(tool => `<span>${tool}</span>`).join('')}
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function(e) {
  if (e.target === this) {
    closeModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ============================================
// CONTACT FORM HANDLER
// ============================================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    if (this.action.includes('YOUR_FORMSPREE_ID')) {
      e.preventDefault();
      const btn = this.querySelector('.btn-submit');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = '#D4785C';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '#D4785C';
        this.reset();
      }, 2200);
    }
  });
}

// ============================================
// CONTINUOUS IMPROVEMENT: Check for broken links
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Check all anchor tags for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId !== '#') {
      const target = document.querySelector(targetId);
      if (!target) {
        console.warn(`⚠️ Broken internal link: ${targetId} (found on ${link.textContent || link})`);
      }
    }
  });

  // Check social links for placeholders
  document.querySelectorAll('.social-links a, .booking-actions a, .hero-buttons a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href.includes('XXXXXXXXXX') || href.includes('yourprofile') || href.includes('YOUR_FORMSPREE_ID'))) {
      console.warn(`⚠️ Placeholder link detected: ${href} (update this before going live)`);
    }
  });

  console.log('✨ Portfolio ready! Building in public with style. 🚀');
});