// gumroad-overlay.js
(function () {
  const productId = document.currentScript.dataset.gumroadProduct;
  const productUrl = `https://gumroad.com/checkout?product=${productId}&quantity=1`;

  function injectUI() {
    const html = `
      <button id="gumroad-close-modal" style="
        position:fixed;top:20px;right:20px;
        background:#fff;color:#000;font-size:32px;
        border:none;border-radius:50%;width:48px;height:48px;
        cursor:pointer;box-shadow:0 4px 10px rgba(0,0,0,0.3);
        z-index:10000;display:none;
        align-items:center;justify-content:center;">×</button>

      <div id="gumroad-overlay" style="
        display:none;position:fixed;z-index:9999;
        top:0;left:0;width:100%;height:100%;
        background-color:rgba(0,0,0,0.6);
        justify-content:center;align-items:center;">
        <div id="gumroad-modal" style="
          width:90%;max-width:540px;height:600px;
          border-radius:18px;background:white;
          box-shadow:0 20px 60px rgba(0,0,0,0.4);
          position:relative;overflow:hidden;">
          <div style='height:100%;position:relative;'>
            <div style='height:100%;width:100%;overflow:hidden;position:relative;'>
              <iframe id="gumroad-iframe" src="" style="
                width:100%;height:1000px;border:none;
                position:absolute;top:-290px;"
                allow="payment *; clipboard-write"
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", html);
  }

  function setupEvents() {
    const overlay = document.getElementById("gumroad-overlay");
    const iframe = document.getElementById("gumroad-iframe");
    const closeBtn = document.getElementById("gumroad-close-modal");

    function openOverlay() {
      iframe.src = productUrl;
      overlay.style.display = "flex";
      closeBtn.style.display = "flex";
    }

    function closeOverlay() {
      overlay.style.display = "none";
      iframe.src = "";
      closeBtn.style.display = "none";
    }

    // Attach to all triggers: buttons + links
    document.querySelectorAll('[data-gumroad-open]').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault(); // prevent anchor jump
        openOverlay();
      });
    });

    closeBtn.addEventListener('click', closeOverlay);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeOverlay();
    });

    // Global access
    window.GumroadOverlay = {
      open: openOverlay,
      close: closeOverlay
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      injectUI();
      setupEvents();
    });
  } else {
    injectUI();
    setupEvents();
  }
})();
