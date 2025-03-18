// Load Signature Pad dynamically
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/signature_pad/2.3.2/signature_pad.min.js";
script.onload = () => {
  console.log("Signature Pad library loaded.");
  initSignaturePad();
};
document.head.appendChild(script);

// Function to initialize signature pad after the library is loaded
function initSignaturePad() {
  const canvas = document.getElementById("signature-pad");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }

  const signaturePad = new SignaturePad(canvas);
  const clearBtn = document.getElementById("clear-signature");
  const signatureData = document.getElementById("signature-data");

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = 150 * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear();
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  clearBtn.addEventListener("click", function () {
    signaturePad.clear();
  });

  document.querySelector("form").addEventListener("submit", function (e) {
    if (!signaturePad.isEmpty()) {
      signatureData.value = signaturePad.toDataURL();
    } else {
      alert("Please provide your signature.");
      e.preventDefault();
    }
  });
}
