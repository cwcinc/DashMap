function initSideSettings() {
  const DIV = document.getElementById("side-settings");
  DIV.addEventListener('mouseenter', () => {
    DIV.classList.add('active');
    DIV.classList.remove('inactive');
  });

  DIV.addEventListener('mouseleave', () => {
    if (DIV.classList.contains('locked')) {
      return;
    }
    DIV.classList.remove('active');
    DIV.classList.add('inactive');
  });
}

var copyLabelTimeout;
function shareMap() {
  navigator.clipboard.writeText("https://cwcinc.github.io/DashMap/?trackid=" + trackId);

  let copiedLabel = document.querySelector(".copied-label");
  clearTimeout(copyLabelTimeout);
  copiedLabel.classList.remove("active");
  copiedLabel.classList.add("active");

  copyLabelTimeout = setTimeout(() => {
    copiedLabel.classList.remove("active");
  }, 1000);
}

window.addEventListener('load', () => {
  initSideSettings();

  document.getElementById("track-id-input").addEventListener("click", function() {
    this.select();
  });
});