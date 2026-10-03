/**
 * AERYN SALON & BEAUTY LOUNGE - INTERACTIVE JAVASCRIPT
 * Official Website: aerynsalon.my.id
 */

document.addEventListener('DOMContentLoaded', () => {
  // Nomor kontak resmi Aeryn Salon: 0813 1680 1311
  const SALON_WHATSAPP = '6281316801311';

  // --- 1. Sticky Header on Scroll ---
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeLightbox();
    }
  });

  // --- 3. Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a, .drawer-links a');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else if (link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // --- 4. Service Category Filter Tabs (Signature Showcase) ---
  const serviceTabBtns = document.querySelectorAll('.service-tabs .tab-btn');
  const serviceCards = document.querySelectorAll('.services-grid .service-card');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Hair Problem Finder Click Handlers ---
  const finderCards = document.querySelectorAll('.finder-card');
  const catalogTabBtns = document.querySelectorAll('.catalog-tab-btn');
  const catalogPanes = document.querySelectorAll('.catalog-pane');

  function activateCatalogPillar(pillarId) {
    catalogTabBtns.forEach(btn => {
      if (btn.getAttribute('data-pillar') === pillarId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    catalogPanes.forEach(pane => {
      if (pane.id === pillarId) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  finderCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target-tab');
      let pillarId = 'p-haircut';
      if (target === 'coloring') pillarId = 'p-coloring';
      else if (target === 'treatment') pillarId = 'p-treatment';
      else if (target === 'spa') pillarId = 'p-spa';

      activateCatalogPillar(pillarId);

      const catalogElem = document.getElementById('treatmentCatalog');
      if (catalogElem) {
        catalogElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- 6. 4 Pillars Catalog Tabs Switcher ---
  catalogTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pillarId = btn.getAttribute('data-pillar');
      activateCatalogPillar(pillarId);
    });
  });

  // --- 7. Catalog Live Search Feature ---
  const catalogSearchInput = document.getElementById('catalogSearchInput');
  if (catalogSearchInput) {
    catalogSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const allCatalogItems = document.querySelectorAll('.catalog-card-item');

      if (query.length > 0) {
        // Show all panes during search so results aren't hidden
        catalogPanes.forEach(pane => pane.classList.add('active'));

        allCatalogItems.forEach(item => {
          const title = item.querySelector('h5')?.textContent.toLowerCase() || '';
          const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
          if (title.includes(query) || desc.includes(query)) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      } else {
        // Restore active pane state
        const activeBtn = document.querySelector('.catalog-tab-btn.active');
        const activePillar = activeBtn ? activeBtn.getAttribute('data-pillar') : 'p-haircut';
        activateCatalogPillar(activePillar);
        allCatalogItems.forEach(item => item.style.display = 'flex');
      }
    });
  }

  // --- 8. Lookbook / Gallery Filter & Lightbox ---
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category') || '';
        if (filter === 'all' || category === filter || category.split(' ').includes(filter)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.35s ease';
            item.style.opacity = '1';
          }, 10);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || 'Aeryn Salon Signature Look';
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (lightboxImg) lightboxImg.src = '';
    }, 300);
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('h5') ? item.querySelector('h5').textContent : '';
      const subtitle = item.querySelector('span') ? item.querySelector('span').textContent : '';
      const caption = title ? `${title} — ${subtitle}` : 'Aeryn Salon Lookbook';
      if (img) openLightbox(img.src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // --- 9. CASCADING SMART BOOKING FORM (Category -> Service) ---
  const servicesData = {
    Haircut: [
      "Women's Signature Haircut",
      "Layered Cut (Butterfly / Wolf / Hush / French Cut)",
      "Curtain Bangs Cut",
      "Kids Hair Cut & Children Bangs",
      "Hair Trimming (Rapikan Ujung Bercabang)",
      "Hair Wash & Scalp Massage",
      "Blow In / Catok In Short Hair",
      "Blow In / Catok In Long Hair",
      "Wave & Curly Styling Glamour",
      "Full Hair Makeover"
    ],
    Coloring: [
      "Ash Blonde Balayage Signature",
      "Ash Brown Highlight Balayage",
      "Caramel Blonde Full Color",
      "Milk Tea Ash Blonde",
      "Ash Blue Metallic Shades",
      "Basic Color & Root Touch-Up",
      "Multi-Dimensional Highlight",
      "Peek a Boo / Hidden Color",
      "Full Head Fashion Color",
      "Color Refresh & Anti-Brass Toning",
      "Bleaching Protection Safe Process",
      "Extra Olaplex / Smartplex Protection"
    ],
    Treatment: [
      "Hair Keratin Restoration",
      "Keratin Filler (Nutrisi Rambut Keropos)",
      "Collagen Smoothing Treatment",
      "Signature Silk Straight",
      "Keratin Blow Perm (Korean Wave)",
      "Down Perm (Rambut Samping Rapi)",
      "Traditional & Blow Perming",
      "Intensive Hair Spa (L'Oreal / Keratin)",
      "Creambath Aromatherapy & Tradisional",
      "Damage Control Hair Mask"
    ],
    Spa: [
      "Manicure & Pedicure Package",
      "Spa Manicure & Spa Pedicure",
      "Gel Polish & Glamour Nail Art",
      "Brightening Facial Treatment",
      "Totok Wajah Relaksasi & Aura",
      "Eyelash Extension Lentik Alami",
      "Lulur Tradisional Keraton + Body Massage",
      "Ratus Wangi (Herbal Steam)",
      "Make Up & Hair Do Spesial"
    ]
  };

  const bookCategory = document.getElementById('bookCategory');
  const bookService = document.getElementById('bookService');

  function populateServices(category, preselectedService = null) {
    if (!bookService) return;
    bookService.innerHTML = '';

    if (!category || !servicesData[category]) {
      bookService.disabled = true;
      bookService.innerHTML = '<option value="" disabled selected>-- Pilih Kategori Dulu di Sebelah Kiri --</option>';
      return;
    }

    bookService.disabled = false;
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.disabled = true;
    defaultOpt.selected = !preselectedService;
    defaultOpt.textContent = '-- Pilih Layanan Spesifik --';
    bookService.appendChild(defaultOpt);

    servicesData[category].forEach(srv => {
      const opt = document.createElement('option');
      opt.value = srv;
      opt.textContent = srv;
      if (preselectedService && (srv.toLowerCase().includes(preselectedService.toLowerCase()) || preselectedService.toLowerCase().includes(srv.toLowerCase()))) {
        opt.selected = true;
      }
      bookService.appendChild(opt);
    });
  }

  if (bookCategory) {
    bookCategory.addEventListener('change', (e) => {
      populateServices(e.target.value);
    });
  }

  // --- 10. Quick Book Buttons Auto-Select & Smooth Scroll ---
  const quickBookBtns = document.querySelectorAll('.quick-book-btn');
  const bookingSection = document.getElementById('booking');

  quickBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.getAttribute('data-category');
      const srv = btn.getAttribute('data-service');

      if (bookCategory && cat) {
        bookCategory.value = cat;
        populateServices(cat, srv);
      }

      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('bookName');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    });
  });

  // --- 11. WhatsApp Smart Booking Submission ---
  const bookingForm = document.getElementById('whatsappBookingForm');
  if (bookingForm) {
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookName')?.value.trim();
      const phone = document.getElementById('bookPhone')?.value.trim();
      const category = document.getElementById('bookCategory')?.value;
      const service = document.getElementById('bookService')?.value;
      const hairLength = document.getElementById('bookHairLength')?.value;
      const date = document.getElementById('bookDate')?.value;
      const time = document.getElementById('bookTime')?.value;
      const notes = document.getElementById('bookNotes')?.value.trim();

      if (!name) {
        alert('Mohon masukkan nama lengkap Anda.');
        document.getElementById('bookName').focus();
        return;
      }

      if (!phone) {
        alert('Mohon masukkan nomor WhatsApp aktif Anda.');
        document.getElementById('bookPhone').focus();
        return;
      }

      if (!service) {
        alert('Mohon pilih jenis treatment atau layanan.');
        document.getElementById('bookService').focus();
        return;
      }

      if (!time) {
        alert('Mohon pilih slot jam kedatangan Anda.');
        document.getElementById('bookTime').focus();
        return;
      }

      // Format WhatsApp Message (Professional & Clear)
      let message = `*RESERVASI JADWAL - AERYN SALON*
`;
      message += `-----------------------------------------
`;
      message += `Halo Admin Aeryn Salon, saya ingin reservasi jadwal perawatan:

`;
      message += `👤 *Nama Pelanggan:* ${name}
`;
      message += `📱 *No. WhatsApp:* ${phone}
`;
      message += `📂 *Kategori:* ${category}
`;
      message += `💇‍♀️ *Layanan/Treatment:* ${service}
`;
      message += `📏 *Panjang Rambut:* ${hairLength}
`;
      message += `📅 *Tanggal Kunjungan:* ${date}
`;
      message += `⏰ *Pilihan Jam Kedatangan:* ${time}
`;
      if (notes) message += `📝 *Catatan Tambahan:* ${notes}
`;
      message += `
Mohon informasi ketersediaan slot jadwal dan konfirmasi reservasinya ya. Terima kasih banyak! ✨`;

      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/${SALON_WHATSAPP}?text=${encodedMessage}`;

      window.open(waUrl, '_blank');
    });
  }

  // --- 12. Real Live Visitor Counter ---
  const visitorElem = document.getElementById('visitorCounter');
  if (visitorElem) {
    // Unique counter key for Aeryn Salon
    const COUNTER_KEY = 'aerynsalon_my_id_prod';
    const BASE_OFFSET = 125; // Angka dasar awal trafik salon

    // Cek apakah pengunjung sudah dihitung dalam sesi browser saat ini (mencegah spam reload)
    const hasVisitedThisSession = sessionStorage.getItem('aeryn_visited');
    const apiUrl = hasVisitedThisSession
      ? `https://countapi.mileshilliard.com/api/v1/get/${COUNTER_KEY}`
      : `https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`;

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error('Counter API unavailable');
        return res.json();
      })
      .then(data => {
        if (data && typeof data.value === 'number') {
          const totalVisits = BASE_OFFSET + data.value;
          visitorElem.textContent = totalVisits.toLocaleString('id-ID');
          sessionStorage.setItem('aeryn_visited', 'true');
          localStorage.setItem('aeryn_last_count', totalVisits);
        }
      })
      .catch(() => {
        // Fallback offline / local cache jika API eksternal terganggu
        const cachedCount = localStorage.getItem('aeryn_last_count');
        if (cachedCount) {
          visitorElem.textContent = Number(cachedCount).toLocaleString('id-ID');
        } else {
          fetch('visitor.json')
            .then(r => r.json())
            .then(d => {
              const countVal = (d && d.count) ? Number(d.count) + 1 : 126;
              visitorElem.textContent = countVal.toLocaleString('id-ID');
            })
            .catch(() => {
              visitorElem.textContent = '126';
            });
        }
      });
  }
});
