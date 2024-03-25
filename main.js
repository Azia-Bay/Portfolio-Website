new WOW({animateClass: 'animate__animated'}).init();

const contactButton = document.querySelector('.navigation-links a:last-of-type');
contactButton.addEventListener('click', pulseSocials);

function pulseSocials() {
  var socials = document.querySelectorAll('#contact .box');
  socials.forEach(social => {
    if (!social.classList.contains('animate__heartBeat'))
      animateCSS(social, 'heartBeat');
  });
}

const companies = document.querySelectorAll('.companies-section .box');
companies.forEach(company => {
  company.addEventListener('mouseover', pulseCompany);
});

function pulseCompany(event) {
  node = event.target;
  if (!node.classList.contains('animate__pulse'))
    animateCSS(node, 'pulse');
}

const animateCSS = (node, animation, prefix = 'animate__') =>
  new Promise((resolve, _reject) => {
    const animationName = `${prefix}${animation}`;
    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
