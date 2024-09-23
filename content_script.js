// Detecta la alerta de cookies en el DOM
function detectCookieAlert() {
    // Aquí seleccionamos los posibles elementos donde puede estar la alerta de cookies
    const cookieAlert = document.querySelector(".cookie-alert, #cookieConsent, .aviso-cookies, .modal, .cookie-banner, .gdpr-consent, .popup") || 
                        document.querySelector('[role="dialog"]');  // Se puede expandir esta lista
    
    if (cookieAlert) {
        const cookieText = cookieAlert.innerText || cookieAlert.textContent;

        // Envía el texto de la alerta de cookies al background script
        chrome.runtime.sendMessage({ action: "cookieTextCaptured", cookieText: cookieText });
    }
}

// Monitorea el DOM por cambios para detectar la aparición de la alerta de cookies
const observer = new MutationObserver(detectCookieAlert);
observer.observe(document.body, { childList: true, subtree: true });

// Ejecuta una detección inmediata al cargar la página
detectCookieAlert();
