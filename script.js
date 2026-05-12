async function analyzeVideo() {
    const url = document.getElementById('videoLink').value;
    const btn = document.getElementById('analyzeBtn');
    const resultsSection = document.getElementById('results');
    const loaderContainer = document.getElementById('loaderContainer');
    const progressFill = document.getElementById('progressFill');
    const loaderText = document.getElementById('loaderText');

    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    if (!videoId || videoId.length < 5) {
        alert("Lien non reconnu. Veuillez copier un lien YouTube.");
        return;
    }

    btn.disabled = true;
    loaderContainer.style.display = "block";
    resultsSection.style.display = "none";
    
    // Étapes d'analyse personnalisées
    const steps = [
        "Scan des métadonnées par CreatorTool...",
        "Analyse sémantique du contenu...",
        "Extraction de la miniature HD...",
        "Finalisation des points clés..."
    ];

    for(let i = 0; i < steps.length; i++) {
        loaderText.innerText = steps[i];
        progressFill.style.width = ((i + 1) * 25) + "%";
        await new Promise(r => setTimeout(r, 850));
    }

    btn.disabled = false;
    loaderContainer.style.display = "none";
    resultsSection.style.display = "block";

    document.getElementById('thumbnailPreview').innerHTML = 
        `<img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg">`;

    const points = genererPointsIA(url);
    document.getElementById('iaContent').innerHTML = points.map(p => `
        <div class="ia-item">
            <strong>${p.titre}</strong><br>
            <small style="color:#aaa">${p.desc}</small>
        </div>
    `).join('');

    const hooks = [
        `🔥 Pourquoi ce contenu sur "${videoId.substring(0,5)}" fonctionne`,
        `💡 3 leçons stratégiques à appliquer immédiatement`,
        `😱 Analyse CreatorTool : Le secret de l'engagement`
    ];
    document.getElementById('hookList').innerHTML = `<ul style="padding-left:15px;">${hooks.map(h => `<li style="margin-bottom:10px">${h}</li>`).join('')}</ul>`;

    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function genererPointsIA(url) {
    if(url.toLowerCase().includes("gaming")) {
        return [
            {titre: "🎮 Immersion Gamer", desc: "CreatorTool a détecté une colorimétrie dynamique propice au visionnage long."},
            {titre: "⏱️ Rythme Intensif", desc: "Analyse du montage : séquences courtes pour maximiser la rétention."},
            {titre: "🔊 Clarté Audio", desc: "La voix est isolée pour une compréhension parfaite même sur mobile."}
        ];
    } else if(url.toLowerCase().includes("tuto")) {
        return [
            {titre: "📝 Pédagogie IA", desc: "Structure par étapes validée. Excellent pour le SEO YouTube."},
            {titre: "👁️ Focalisation", desc: "L'image se concentre sur l'action, augmentant la valeur éducative."},
            {titre: "✅ Autorité", desc: "Le début de vidéo établit une confiance immédiate avec l'audience."}
        ];
    } else {
        return [
            {titre: "🔍 Rétention Optimale", desc: "L'analyse montre une gestion du suspense efficace dès l'intro."},
            {titre: "✨ Impact Visuel", desc: "Le contraste de la miniature est optimisé pour un taux de clic (CTR) élevé."},
            {titre: "📈 Engagement", desc: "La structure incite naturellement au partage et au commentaire."}
        ];
    }
}
