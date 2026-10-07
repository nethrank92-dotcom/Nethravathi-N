/**
 * ==========================================================================
 * MUΣE EDITORIAL PORTFOLIO - MAIN INTERACTION CONTROLLER
 * Luxury magazine interactive features, AI sandbox, audio ambience & animations
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageTransition();
  initMastheadScroll();
  initCustomCursor();
  initMobileMenu();
  initAudioAmbience();
  initScrollReveals();
  initSkillProgressAnimation();
  initProjectFilters();
  initAiAssistantSandbox();
  initResumeModal();
  initContactForm();
  initCopyEmail();
  initSubtleParallax();
});

/* --------------------------------------------------------------------------
   0. Page Ready Transition
   -------------------------------------------------------------------------- */
function initPageTransition() {
  requestAnimationFrame(() => {
    document.body.classList.add('page-ready');
  });
}

/* --------------------------------------------------------------------------
   1. Masthead Scroll & Active Section Highlighting
   -------------------------------------------------------------------------- */
function initMastheadScroll() {
  const masthead = document.querySelector('.editorial-masthead');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      masthead.classList.add('scrolled');
    } else {
      masthead.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Custom Editorial Cursor
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (!cursor || !follower || window.matchMedia('(pointer: coarse)').matches) {
    if (cursor) cursor.style.display = 'none';
    if (follower) follower.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }, { passive: true });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
    requestAnimationFrame(animateFollower);
  }
  requestAnimationFrame(animateFollower);

  // Magnetic hover states on clickable elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, .editorial-tab, .project-card, .editorial-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width = '54px';
      follower.style.height = '54px';
      follower.style.borderColor = 'var(--accent-gold)';
      follower.style.backgroundColor = 'rgba(197, 160, 89, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'var(--accent-gold)';
      follower.style.backgroundColor = 'transparent';
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll Reveal & Image Curtain Controller
   -------------------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.editorial-reveal, .image-reveal-wrapper');
  const timelineItems = document.querySelectorAll('.timeline-monograph-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
  timelineItems.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   4. Subtle Mouse & Scroll Parallax
   -------------------------------------------------------------------------- */
function initSubtleParallax() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const heroFrame = document.querySelector('.hero-image-frame-outer');
  if (!heroFrame) return;

  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

    heroFrame.style.transform = `perspective(1000px) rotateY(${xRatio * 2.5}deg) rotateX(${-yRatio * 2.5}deg) translate(${xRatio * 4}px, ${yRatio * 4}px)`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeMenu = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}

/* --------------------------------------------------------------------------
   6. Ambient Audio Generator (Web Audio API Synthesizer)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let noiseNode = null;
let isAudioPlaying = false;

function initAudioAmbience() {
  const audioBtn = document.querySelector('.nav-audio-btn');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!isAudioPlaying) {
      startAmbientAudio();
      audioBtn.classList.add('playing');
      audioBtn.innerHTML = `<span>●</span> AMBIENCE: ON`;
      showToast('♪ Study Vinyl Ambience Activated');
    } else {
      stopAmbientAudio();
      audioBtn.classList.remove('playing');
      audioBtn.innerHTML = `<span>○</span> AMBIENCE: OFF`;
      showToast('Ambience Muted');
    }
  });
}

function startAmbientAudio() {
  if (!audioCtx) return;
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + (0.02 * white)) / 1.02; // Brown/Warm study noise
    lastOut = data[i];
    data[i] *= 0.035; // Gentle low volume
  }

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = buffer;
  noiseNode.loop = true;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 450;

  noiseNode.connect(filter);
  filter.connect(audioCtx.destination);
  noiseNode.start();
  isAudioPlaying = true;
}

function stopAmbientAudio() {
  if (noiseNode) {
    try {
      noiseNode.stop();
      noiseNode.disconnect();
    } catch(e) {}
    isAudioPlaying = false;
  }
}

/* --------------------------------------------------------------------------
   7. Skill Progress Bar Scroll Animation
   -------------------------------------------------------------------------- */
function initSkillProgressAnimation() {
  const progressBars = document.querySelectorAll('.skill-progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute('data-width') || '85%';
        fill.style.width = targetWidth;
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => observer.observe(bar));
}

/* --------------------------------------------------------------------------
   8. Project Filtering System
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const tabs = document.querySelectorAll('.project-tab');
  const projects = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projects.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category?.includes(filterValue)) {
          card.style.display = 'flex';
          card.classList.add('animate-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   9. AI Study Assistant Interactive Sandbox Simulator
   -------------------------------------------------------------------------- */
const aiScenarios = {
  summary: {
    query: "Summarize Time & Space Complexity of Dijkstra's Algorithm using Min-Heap.",
    response: `**Dijkstra's Shortest Path Algorithm Analysis:**
• **Time Complexity:** $O((V + E) \\log V)$ with a standard Binary Min-Heap Priority Queue.
• **Space Complexity:** $O(V)$ for storing dist[] array and heap elements.
• **Key Invariant:** Assumes non-negative edge weights; greedy choice guarantees optimal substructure at every vertex relaxation step.`
  },
  flashcard: {
    query: "Generate a flashcard for CAP Theorem in Distributed Databases.",
    response: `📇 **FLASHCARD // DISTRIBUTED SYSTEMS N° 07**
• **FRONT:** What trade-off is dictated by the CAP Theorem during network partitions?
• **BACK:** A distributed data store can guarantee at most two of three properties: *Consistency*, *Availability*, and *Partition Tolerance*. Since network partitions are inevitable in real networks, systems must choose between CP (Consistency) or AP (Availability).`
  },
  code: {
    query: "Explain this PyTorch Attention Mechanism tensor shape transformation.",
    response: `\`\`\`python
# Multi-Head Attention Q, K, V Projection
# Input Tensor: (Batch_Size, Seq_Len, d_model) -> (B, S, H, D_k)
scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)
attention_weights = F.softmax(scores, dim=-1)
output = torch.matmul(attention_weights, V)
\`\`\`
✨ **Architectural Insight:** The matrix dot-product computes token-to-token semantic affinity, scaled by $1/\\sqrt{d_k}$ to prevent gradient vanishing in the softmax exponent.`
  },
  quiz: {
    query: "Test my knowledge on Virtual Memory Paging vs Segmentation.",
    response: `📝 **ACTIVE RECALL QUESTION // OS ARCHITECTURE**
*Question:* Why does Paging eliminate external fragmentation while Segmentation is susceptible to it?
*Select or type your answer:*
A) Pages have fixed physical block sizes $(4KB)$, whereas segments are variable logical lengths.
B) Paging runs in kernel space only.
*(Correct Answer: Option A — fixed chunking ensures zero external fragmentation).*`
  }
};

function initAiAssistantSandbox() {
  const promptInput = document.getElementById('ai-prompt-input');
  const sendBtn = document.getElementById('ai-send-btn');
  const terminalBody = document.getElementById('ai-terminal-body');
  const modePills = document.querySelectorAll('.ai-mode-pill-btn');

  if (!promptInput || !terminalBody) return;

  // Mode pill quick selector
  modePills.forEach(pill => {
    pill.addEventListener('click', () => {
      modePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const mode = pill.getAttribute('data-mode');
      if (aiScenarios[mode]) {
        promptInput.value = aiScenarios[mode].query;
        handleAiSubmission(aiScenarios[mode].query, aiScenarios[mode].response);
      }
    });
  });

  const triggerSubmit = () => {
    const text = promptInput.value.trim();
    if (!text) return;
    
    // Check if matching scenario or provide default intelligent answer
    let botReply = `✨ **AI Assistant Synthesis:** Analyzed your query on *" ${text} "*. Integrating retrieval augmented generation from CS textbook corpus and course lecture notes.`;
    
    for (let key in aiScenarios) {
      if (text.toLowerCase().includes(key) || aiScenarios[key].query.toLowerCase() === text.toLowerCase()) {
        botReply = aiScenarios[key].response;
        break;
      }
    }
    
    handleAiSubmission(text, botReply);
    promptInput.value = '';
  };

  if (sendBtn) sendBtn.addEventListener('click', triggerSubmit);
  promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') triggerSubmit();
  });

  function handleAiSubmission(userText, botResponse) {
    // Append User message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message animate-fade-in';
    userMsg.innerHTML = `
      <div class="ai-avatar user">YOU</div>
      <div class="ai-bubble user">${escapeHtml(userText)}</div>
    `;
    terminalBody.appendChild(userMsg);

    // Typing placeholder
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-message animate-fade-in';
    typingIndicator.id = 'ai-typing-temp';
    typingIndicator.innerHTML = `
      <div class="ai-avatar bot">AI</div>
      <div class="ai-bubble" style="font-style:italic; opacity:0.7;">
        Synthesizing syllabus knowledge graph...
      </div>
    `;
    terminalBody.appendChild(typingIndicator);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    // Simulate AI generation delay
    setTimeout(() => {
      const temp = document.getElementById('ai-typing-temp');
      if (temp) temp.remove();

      const botMsg = document.createElement('div');
      botMsg.className = 'ai-message animate-fade-in';
      botMsg.innerHTML = `
        <div class="ai-avatar bot">AI</div>
        <div class="ai-bubble">${formatMarkdown(botResponse)}</div>
      `;
      terminalBody.appendChild(botMsg);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 650);
  }
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function formatMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```python([\s\S]*?)```/g, '<pre style="background:#090D15; padding:10px; border-radius:4px; font-family:monospace; color:#DFC28A; overflow-x:auto;"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.1); padding:2px 5px; border-radius:3px;">$1</code>')
    .replace(/\n/g, '<br>');
}

/* --------------------------------------------------------------------------
   10. Resume / Dossier Modal
   -------------------------------------------------------------------------- */
function initResumeModal() {
  const openBtns = document.querySelectorAll('.open-resume-modal');
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.querySelector('.resume-modal-close');
  const printBtn = document.getElementById('resume-print-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* --------------------------------------------------------------------------
   11. Contact Form & Feedback Toast
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('editorial-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast('⚠️ Please provide all required dispatch fields.');
      return;
    }

    const name = nameInput.value.trim();
    showToast(`✉ Transmission received from ${name}. Thank you for connecting.`);
    form.reset();
  });
}

function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const email = btn.getAttribute('data-email') || 'nethravathi.cse@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`📋 Copied: ${email}`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.querySelector('.editorial-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'editorial-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✧</span> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}
