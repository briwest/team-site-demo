// Team Members Data
const teamMembers = [
  {
    id: 1,
    name: "Elena Rostova",
    role: "VP of Product & Engineering",
    dept: "leadership",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Ex-Google tech lead driving AI product strategy and engineering scale. Passionate about empowering engineering teams.",
    skills: ["AI Architecture", "Strategy", "Team Growth", "Python"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    projects: 42,
    contributions: "1,420+",
    status: "online"
  },
  {
    id: 2,
    name: "Brian West",
    role: "Lead Systems Architect",
    dept: "engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Core contributor to open-source developer tooling, distributed systems, and real-time backend microservices.",
    skills: ["Go", "TypeScript", "Distributed Systems", "Docker"],
    github: "https://github.com/briwest",
    linkedin: "https://linkedin.com",
    projects: 29,
    contributions: "2,890+",
    status: "online"
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Principal UI/UX Designer",
    dept: "design",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Crafting glassmorphic design systems and micro-animations that deliver intuitive user experiences.",
    skills: ["Figma", "Design Systems", "CSS/Animation", "User Research"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    projects: 35,
    contributions: "980+",
    status: "online"
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    role: "Senior Full-Stack Engineer",
    dept: "engineering",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    bio: "Building resilient web applications with Next.js, GraphQL, and cloud-native serverless backends.",
    skills: ["React", "Next.js", "GraphQL", "Node.js"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    projects: 22,
    contributions: "1,850+",
    status: "offline"
  },
  {
    id: 5,
    name: "Aria Thorne",
    role: "Director of Product Design",
    dept: "product",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    bio: "Connecting user insight with product roadmap. Specializing in rapid prototyping and UX strategy.",
    skills: ["Product Strategy", "User Journey", "Wireframing", "Agile"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    projects: 18,
    contributions: "640+",
    status: "online"
  },
  {
    id: 6,
    name: "Devon Vance",
    role: "DevOps & Infrastructure Lead",
    dept: "engineering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Automating CI/CD pipelines, Kubernetes clusters, and cloud security compliance across multicloud regions.",
    skills: ["Kubernetes", "Terraform", "CI/CD", "AWS"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    projects: 31,
    contributions: "3,100+",
    status: "online"
  }
];

let activeFilter = "all";
let searchQuery = "";

// DOM Elements
const teamGrid = document.getElementById("teamGrid");
const searchInput = document.getElementById("searchInput");
const filterPills = document.querySelectorAll(".pill-btn");
const themeToggleBtn = document.getElementById("themeToggle");
const memberModal = document.getElementById("memberModal");
const nominateModal = document.getElementById("nominateModal");
const nominateForm = document.getElementById("nominateForm");
const nominateBtn = document.getElementById("nominateBtn");
const closeModalBtns = document.querySelectorAll(".close-modal");
const toastContainer = document.getElementById("toastContainer");

// Render Team Cards
function renderTeam() {
  teamGrid.innerHTML = "";
  
  const filtered = teamMembers.filter(member => {
    const matchesFilter = activeFilter === "all" || member.dept === activeFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    teamGrid.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 style="margin-top: 12px;">No team members found</h3>
        <p style="margin-top: 4px;">Try refining your search term or filter options.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(member => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.id = `member-${member.id}`;
    card.onclick = () => openMemberModal(member);

    card.innerHTML = `
      <div class="avatar-wrapper">
        <img src="${member.avatar}" alt="${member.name}" class="avatar" loading="lazy" />
        <span class="status-dot" style="background-color: ${member.status === 'online' ? 'var(--accent-emerald)' : 'var(--text-muted)'}"></span>
      </div>
      <h3 class="member-name">${member.name}</h3>
      <div class="member-role">${member.role}</div>
      <p class="member-bio">${member.bio}</p>
      <div class="skill-tags">
        ${member.skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
      </div>
      <div class="social-links" onclick="event.stopPropagation()">
        <a href="${member.github}" target="_blank" rel="noopener" class="social-icon" aria-label="GitHub">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href="${member.linkedin}" target="_blank" rel="noopener" class="social-icon" aria-label="LinkedIn">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
      </div>
    `;

    teamGrid.appendChild(card);
  });
}

// Modal View Handler
function openMemberModal(member) {
  const content = document.getElementById("modalContent");
  content.innerHTML = `
    <div class="modal-header">
      <img src="${member.avatar}" alt="${member.name}" class="modal-avatar" />
      <div>
        <h2 style="font-size: 1.5rem; color: var(--text-primary);">${member.name}</h2>
        <div style="color: var(--accent-primary); font-weight: 600; font-size: 0.95rem;">${member.role}</div>
        <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 4px;">Department: ${member.dept.toUpperCase()}</div>
      </div>
    </div>
    <div class="modal-body">
      <h4 style="margin-bottom: 8px; color: var(--text-primary);">About & Impact</h4>
      <p>${member.bio}</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; padding: 16px; background: var(--bg-glass); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <div>
          <div style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Projects Led</div>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">${member.projects}</div>
        </div>
        <div>
          <div style="color: var(--text-muted); font-size: 0.8rem; text-transform: uppercase;">Code Contributions</div>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-cyan);">${member.contributions}</div>
        </div>
      </div>

      <h4 style="margin-bottom: 12px; color: var(--text-primary);">Core Competencies</h4>
      <div class="skill-tags" style="justify-content: flex-start;">
        ${member.skills.map(s => `<span class="tag" style="padding: 6px 14px; font-size: 0.85rem;">${s}</span>`).join('')}
      </div>
    </div>
  `;
  memberModal.classList.add("active");
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderTeam();
});

filterPills.forEach(btn => {
  btn.addEventListener("click", () => {
    filterPills.forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    renderTeam();
  });
});

themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", newTheme);
  themeToggleBtn.innerHTML = newTheme === "light" 
    ? `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`
    : `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
});

nominateBtn.addEventListener("click", () => {
  nominateModal.classList.add("active");
});

closeModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    memberModal.classList.remove("active");
    nominateModal.classList.remove("active");
  });
});

[memberModal, nominateModal].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });
});

nominateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nomName").value;
  const role = document.getElementById("nomRole").value;
  const dept = document.getElementById("nomDept").value;
  
  // Add new member to dynamic array
  teamMembers.unshift({
    id: Date.now(),
    name,
    role,
    dept,
    avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random()*1000)}?auto=format&fit=crop&w=400&q=80`,
    bio: "Newly nominated team contributor.",
    skills: ["Innovation", "Collaboration"],
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    projects: 1,
    contributions: "10+",
    status: "online"
  });

  renderTeam();
  nominateModal.classList.remove("active");
  nominateForm.reset();
  showToast(`Successfully added ${name} to the team showcase!`);
});

function showToast(message) {
  const toast = document.createElement("div");
  const id = "toast-" + Date.now();
  toast.id = id;
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderTeam();
});
