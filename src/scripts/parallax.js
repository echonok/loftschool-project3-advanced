const parallax = document.querySelector('.parallax');
const layers = parallax.children;

const moveLayersOnScroll = (wScroll) => {
  Array.from(layers).forEach((layer, index) => {
    const divider = index;
    const strafe = wScroll / (-divider * 40);
    layer.style.transform = `translateY(${strafe}%)`;
  });
};

window.addEventListener('scroll', event => {
  const wScroll = window.pageYOffset;
  moveLayersOnScroll(wScroll)
});