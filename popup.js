document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get("cookieSummary", (result) => {
        const summaryElement = document.getElementById("summary");
        summaryElement.textContent = result.cookieSummary || "No se ha detectado ninguna alerta de cookies.";
    });
});
