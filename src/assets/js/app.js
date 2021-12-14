
const loadScript = async(url, callback) => {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  head.appendChild(script);
};

const toggleMenuMobile = async() => {
  setTimeout(() => {
    const headerMobile = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');

    if (headerMobile) {
      headerMobile.addEventListener('click', () => {
        headerMobile.classList.toggle('open');
        sidebar.classList.toggle('show-menu');
      });
    }
  }, 100);
};

const generateBar = () => {
  const bars = document.querySelectorAll('.progress-bar');

  if (bars) {
    bars.forEach(bar => {
      const current = bar.dataset.current;
      const max = bar.dataset.max;
      const width = (current / max) * 100;

      bar.style.width = width + '%';
      bar.parentNode.parentNode.querySelector('.number').textContent = current + ' / ' + max;
    });
  }
};

const autoSelectOnSelectOs = () => {
  const osInputs = document.querySelectorAll('input[name="options-os"]');

  if (osInputs) {
    osInputs.forEach(input => {
      input.addEventListener('click', (e) => {
        let target = e.currentTarget.dataset.bsTarget;

        if (target) {
          let tabContent = document.getElementById(target.replace('#', ''));
          tabContent.querySelector('input[name="options-version"]').checked = true;
        }
      });
    });
  }
};

window.menuActive = (page) => {

  setTimeout(() => {
    const menuLinks = document.querySelectorAll('.menu-link');

    if (menuLinks) {
      menuLinks.forEach(menu => {
        menu.dataset.page === page ? menu.classList.add('active') : '';
      });
    }
  },100);
};

const init = async() => {
  await loadScript('./assets/js/csi.min.js');
  await toggleMenuMobile();
  generateBar();
  autoSelectOnSelectOs();
};

init();
