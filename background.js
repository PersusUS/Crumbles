// Escucha mensajes del content script que captura el texto de cookies
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "cookieTextCaptured") {
        const cookieText = message.cookieText;
        
        // Llama a la API de Hugging Face con el modelo de BART
        fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
            method: "POST",
            headers: {
                "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Reemplaza con tu API Key de Hugging Face
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: cookieText // Envía el texto capturado de la alerta de cookies
            })
        })
        .then(response => response.json())
        .then(data => {
            const summary = data[0]?.summary_text || "No se pudo generar el resumen."; // Obtiene el resumen generado
            // Almacena el resumen en el almacenamiento local para mostrarlo en el popup
            chrome.storage.local.set({ cookieSummary: summary });
        })
        .catch(err => {
            console.error("Error llamando a la API de Hugging Face:", err);
            chrome.storage.local.set({ cookieSummary: "Error al generar el resumen." });
        });
    }
});
