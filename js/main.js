const terminalCommands = [
    "Initiating love.exe...",
    "Target identified: KINZA 💖",
    "Bypassing sibling rivalry protocols... [OK]",
    "Loading favorite memories...",
    "Compiling endless hugs & smiles...",
    "Decrypting gift for Kinza... 100%",
    "Warning: Heart overflowing! ❤️"
];

const sounds = {
    click: new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
    whoosh: new Audio('https://assets.mixkit.co/active_storage/sfx/608/608-preview.mp3'),
    tada: new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3')
};

function playSound(name) {
    sounds[name].currentTime = 0;
    sounds[name].play().catch(e => console.log("Audio play blocked"));
}

function toggleTheme() {
    document.body.classList.toggle('party-mode');
    playSound('click');
    const btn = document.querySelector('.theme-toggle');
    btn.innerHTML = document.body.classList.contains('party-mode') ? '🌙' : '✨';
}

async function startDecryption() {
    playSound('click');
    document.getElementById('step-1').classList.add('hidden');
    const step2 = document.getElementById('step-2');
    step2.classList.remove('hidden');

    const terminal = document.getElementById('terminal');
    terminal.style.display = 'block';
    const typingText = document.getElementById('typing-text');

    for (let i = 0; i < terminalCommands.length; i++) {
        await typeText(typingText, terminalCommands[i]);
        playSound('click');
        if (i < terminalCommands.length - 1) {
            typingText.innerHTML += '<br>';
            await sleep(400);
        }
    }

    await sleep(800);
    step2.classList.add('hidden');
    document.body.classList.add('love-mode');
    startFloatingHearts();

    const step3 = document.getElementById('step-3');
    step3.classList.remove('hidden');
    fireConfetti();
}

function typeText(element, text) {
    return new Promise(resolve => {
        let index = 0;
        let interval = setInterval(() => {
            if (index < text.length) { element.innerHTML += text.charAt(index); index++; }
            else { clearInterval(interval); resolve(); }
        }, 30);
    });
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function fireConfetti() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff4d6d', '#ff758c', '#ffffff'] });
}

function startFloatingHearts() {
    setInterval(() => {
        const h = document.createElement('div'); h.classList.add('bg-heart');
        h.innerHTML = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = Math.random() * 2 + 1 + 'rem';
        h.style.animationDuration = Math.random() * 5 + 5 + 's';
        document.getElementById('hearts-container').appendChild(h);
        setTimeout(() => h.remove(), 10000);
    }, 300);
}

function showCake() {
    playSound('click');
    const cc = document.getElementById('cake-container');
    cc.classList.add('visible');
    cc.scrollIntoView({ behavior: 'smooth' });
}

function blowCandle() {
    const c = document.getElementById('candle');
    if (!c.classList.contains('blown')) {
        c.classList.add('blown');
        playSound('whoosh');
        setTimeout(() => playSound('tada'), 500);
        fireConfetti();
        triggerWishParticles();
        document.getElementById('wish-message').classList.remove('hidden');
        document.getElementById('scroll-hint').classList.remove('hidden');
    }
}

function triggerWishParticles() {
    const container = document.getElementById('wish-cloud');
    const wishes = ["Success", "Happiness", "Travel", "Laughter", "Health", "Joy"];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.classList.add('wish-particle');
        p.innerText = wishes[Math.floor(Math.random() * wishes.length)];
        p.style.left = "50%";
        p.style.top = "50%";
        p.style.setProperty('--tx', `${(Math.random() - 0.5) * 600}px`);
        p.style.setProperty('--ty', `${(Math.random() - 0.5) * 600}px`);
        p.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(p);
        setTimeout(() => p.remove(), 4000);
    }
}

const memories = [
    { title: "Dear Kinza!", desc: "You were always the best sister a brother could ask for. I'm so grateful to have you in my life. " },
    { title: "Day One Friends", desc: "You've been my best friend and my biggest supporter since the very beginning." },
    { title: "Endless Laughter", desc: "The countless inside jokes and the way we can't stop laughing at the simplest things." },
    { title: "The Shared Dreams", desc: "For all the late-night talks about the future and how we're going to take over the world." },
    { title: "Always Together", desc: "No matter where life takes us, I know you'll always have my back, and I'll have yours." },
    { title: "Infinite Love", desc: "Wishing you the happiest of birthdays, filled with all the love and joy you deserve!" }
];

function showMemoryLane() {
    playSound('click');
    const ml = document.getElementById('memory-lane');
    const mt = document.getElementById('memory-track');

    if (mt.children.length === 0) {
        ml.style.display = 'block';
        memories.forEach((m, i) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.innerHTML = `<h3>${m.title}</h3><p>${m.desc}</p>`;
            mt.appendChild(card);
            setTimeout(() => card.classList.add('reveal'), i * 200 + 400);
        });
    }

    ml.scrollIntoView({ behavior: 'smooth' });
}

function scrollTrack(direction) {
    playSound('click');
    const track = document.getElementById('memory-track');
    const scrollAmount = 350; // Approximates card width + margin
    track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}
