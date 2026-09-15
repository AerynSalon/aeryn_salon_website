/**
 * AERYN SALON & BEAUTY LOUNGE - INTERACTIVE JAVASCRIPT
 * Official Website: aerynsalon.my.id
 */

document.addEventListener('DOMContentLoaded', () => {
  // Salon WhatsApp Hotline (Configurable)
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

  // --- 3. Active Nav Link on Scroll (IntersectionObserver) ---
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

  // --- 4. Service Category Filter Tabs ---
  const serviceTabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

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
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. Lookbook / Gallery Filter ---
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

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
            item.style.transition = 'opacity 0.4s ease';
            item.style.opacity = '1';
          }, 10);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Lightbox Modal for Lookbook ---
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

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
      lightboxImg.src = '';
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

  // --- 7. Quick Service Booking Buttons (Auto-select Service) ---
  const quickBookBtns = document.querySelectorAll('.quick-book-btn');
  const serviceSelect = document.getElementById('bookService');
  const bookingSection = document.getElementById('booking');

  quickBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        // Find matching option or set value
        let found = false;
        for (let opt of serviceSelect.options) {
          if (opt.value.toLowerCase().includes(serviceName.toLowerCase()) || 
              opt.text.toLowerCase().includes(serviceName.toLowerCase())) {
            serviceSelect.value = opt.value;
            found = true;
            break;
          }
        }
        if (!found) {
          serviceSelect.value = serviceName;
        }
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

  // --- 8. WhatsApp Smart Booking Engine ---
  const bookingForm = document.getElementById('whatsappBookingForm');
  if (bookingForm) {
    // Set default date to today or tomorrow
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

      const name = document.getElementById('bookName').value.trim();
      const phone = document.getElementById('bookPhone').value.trim();
      const service = document.getElementById('bookService').value;
      const date = document.getElementById('bookDate').value;
      const time = document.getElementById('bookTime').value.trim();
      const notes = document.getElementById('bookNotes').value.trim();

      if (!name) {
        alert('Mohon masukkan nama lengkap Anda.');
        document.getElementById('bookName').focus();
        return;
      }

      if (!service) {
        alert('Mohon pilih jenis treatment atau layanan.');
        document.getElementById('bookService').focus();
        return;
      }

      if (!time) {
        alert('Mohon cantumkan estimasi jam kedatangan Anda.');
        document.getElementById('bookTime').focus();
        return;
      }

      // Format WhatsApp Message
      let message = `*RESERVASI BARU - AERYN SALON*\n`;
      message += `-----------------------------------------\n`;
      message += `Halo Admin Aeryn Salon, saya ingin melakukan reservasi:\n\n`;
      message += `👤 *Nama Pelanggan:* ${name}\n`;
      if (phone) message += `📱 *No. WhatsApp:* ${phone}\n`;
      message += `💇‍♀️ *Layanan/Treatment:* ${service}\n`;
      message += `📅 *Rencana Tanggal:* ${date}\n`;
      message += `⏰ *Estimasi Jam Kedatangan:* ${time}\n`;
      if (notes) message += `📝 *Catatan Khusus:* ${notes}\n`;
      message += `\nMohon konfirmasi ketersediaan slot jadwal. Terima kasih! ✨`;

      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/${SALON_WHATSAPP}?text=${encodedMessage}`;

      // Open WhatsApp in new tab/window
      window.open(waUrl, '_blank');
    });
  }

  // --- 9. Visitor Counter Display & Update ---
  fetch('visitor.json')
    .then(res => res.json())
    .then(data => {
      const visitorElem = document.getElementById('visitorCounter');
      if (visitorElem && data && data.count) {
        visitorElem.textContent = Number(data.count) + 1;
      }
    })
    .catch(() => {
      // Graceful fallback
      const visitorElem = document.getElementById('visitorCounter');
      if (visitorElem) visitorElem.textContent = '103';
    });
});
