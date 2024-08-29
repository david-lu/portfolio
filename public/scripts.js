const { gsap, Meanderer, ScrollTrigger } = window;

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// MENU
document.querySelector("#nav-hamburger").addEventListener(
  'click',
  () => {
    document.querySelector('#nav-art').classList.toggle('hidden');
    document.querySelector('#nav-contact').classList.toggle('hidden');
  }
);

// SCROLL
const makeScroll = (button, target, duration = 1) => {
  document.querySelector(button).addEventListener(
    'click',
    () => gsap.to(window, {
      duration: 2,
      scrollTo: {
        y: target,
        autoKill: true
      },
      ease: 'power2'
    })
  );
};
makeScroll("#big-info-button", '#button-0');
makeScroll("#button-0", '#button-1');
makeScroll("#button-1", '#button-2');
makeScroll("#button-2", 'max');

// GSAP ABOVE CLOUD
const ABOVE_CLOUD_TRIGGER = {
  trigger: "#above-cloud",
  start: "top top",
  end: "bottom top",
  scrub: 1,
  // markers: true,
};

gsap.to("#above-right", {
  yPercent: '130',
  ease: "ease-in",
  scrollTrigger: ABOVE_CLOUD_TRIGGER,
});

gsap.to("#big-info-header", {
  yPercent: '-150',
  ease: "ease-in",
  scrollTrigger: ABOVE_CLOUD_TRIGGER,
});

gsap.utils.toArray('.big-info-text').forEach((text) => {
  gsap.to(text, {
    yPercent: '-100',
    ease: "ease-in",
    scrollTrigger: ABOVE_CLOUD_TRIGGER,
  });
});

gsap.to("#big-info-button", {
  yPercent: '-40',
  ease: "ease-in",
  scrollTrigger: ABOVE_CLOUD_TRIGGER,
});

document.querySelector('#big-nimbus').addEventListener('click', () => {
  document.querySelector('#big-nimbus-arm-image').classList.toggle('fast');
});

// GSAP BELOW CLOUD
const parallax = (element, yPercent, markers = false) => {
  gsap.to(element, {
    y: '-50%',
    yPercent: yPercent,
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "+=200% top",
      scrub: 1,
      markers: markers,
    },
    // ease: "power1.in",
  });
};

const infos = gsap.utils.toArray('.info');
infos.forEach((info) => {
  parallax(info, 30, true);
});

// NIMBUS
const BELOW_CLOUD_TRIGGER = {
  trigger: "#below-cloud",
  start: "top top",
  end: "bottom bottom",
  scrub: 1,
  // markers: true,
};

// NIMBUS PATH
const meanderMaker = (containerElem, svgElem, pathElem) => {
  const [x, y, width, height] = svgElem.getAttribute("viewBox").split(' ');

  const responsivePath = new Meanderer({
    path: pathElem.getAttribute("d"),
    width: width,
    height: height,
  });

  const setPath = () => {
    const scaledPath = responsivePath.generatePath(
      containerElem.offsetWidth,
      containerElem.offsetHeight
    )
    containerElem.style.setProperty('--path', `"${scaledPath}"`)
  };

  const SizeObserver = new ResizeObserver(setPath);
  SizeObserver.observe(containerElem);
};

meanderMaker(
  document.querySelector('#nimbus-path'),
  document.querySelector('#nimbus-path svg'),
  document.querySelector('#nimbus-path path')
);

ScrollTrigger.create({
  trigger: '#below-cloud',
  start: '-=15% top',
  end: 'bottom bottom',
  onUpdate: (self) => {
    // console.log(
    //     'progress:',
    //     self.progress.toFixed(3),
    //     'direction:',
    //     self.direction,
    //     'velocity',
    //     self.getVelocity()
    // );
    let nimbus = document.querySelector('#nimbus-element');
    nimbus.style.offsetDistance = (100 * self.progress.toFixed(3)) + '%';
  }
});

// CLOODS
gsap.utils.toArray('.cloud.layer-1').forEach((cloud) => {
  parallax(cloud, 80);
});
gsap.utils.toArray('.cloud.layer-2').forEach((cloud) => {
  parallax(cloud, 60);
});