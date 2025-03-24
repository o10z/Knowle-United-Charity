document.addEventListener("DOMContentLoaded", function () {
    // Check if SignaturePad is loaded
    if (typeof SignaturePad === "undefined") {
        console.error("SignaturePad library failed to load!");
        return;
    }
  
    // Get all signature pads
    const canvases = document.querySelectorAll("canvas[id^='signature-pad']");
  
    canvases.forEach((canvas, index) => {
        const signaturePad = new SignaturePad(canvas);
        const clearBtn = document.getElementById(`clear-signature-${index + 1}`);
        const signatureData = document.getElementById(`signature-data-${index + 1}`);
        const form = document.querySelector("form");
  
        if (!canvas || !clearBtn || !signatureData) {
            console.warn(`Missing elements for signature pad ${index + 1}`);
            return;
        }
  
        // Function to resize canvas
        function resizeCanvas() {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth;
            canvas.height = 150;
            canvas.getContext("2d").scale(ratio, ratio);
            signaturePad.clear();
        }
  
        // Resize canvas on page load & window resize
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
  
        // Clear button event
        clearBtn.addEventListener("click", function () {
            signaturePad.clear();
        });
  
        // Form submission event
        form.addEventListener("submit", function (e) {
            if (!signaturePad.isEmpty()) {
                signatureData.value = signaturePad.toDataURL(); // Save signature as Base64
            } else {
                alert(`Please provide signature for field ${index + 1}.`);
                e.preventDefault();
            }
        });
    });
  });
  