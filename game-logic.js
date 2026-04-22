function gameHandler() {
    return {
        score: 0,
        timer: 0,
        isStartScreen: true,
        showSettings: false,
        gameOver: false,
        isPaused: false,
        monkeys: [],
        monkeyId: 0,
        loopId: null,
        timerIntervalId: null,
        
        sandbox: {
            letters: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
            speed: 1.0,
            time: 60,
            skin: "🐵"
        },

        init() {
            const savedScore = localStorage.getItem('typie_total_score');
            const savedSettings = localStorage.getItem('typie_sandbox_settings');
            
            if (savedScore) this.score = parseInt(savedScore);
            if (savedSettings) this.sandbox = JSON.parse(savedSettings);
        },

        saveProgress() {
            localStorage.setItem('typie_total_score', this.score);
            localStorage.setItem('typie_sandbox_settings', JSON.stringify(this.sandbox));
        },

        startRound() {
            this.isStartScreen = false;
            this.gameOver = false;
            this.isPaused = false;
            this.showSettings = false;
            this.timer = this.sandbox.time;
            this.saveProgress();
            this.startLoop();
        },

        startLoop() {
            this.monkeys = [];
            this.runGameIntervals();
        },

        runGameIntervals() {
            if (this.loopId) clearInterval(this.loopId);
            if (this.timerIntervalId) clearInterval(this.timerIntervalId);

            this.loopId = setInterval(() => {
                if (!this.isPaused) this.update();
            }, 20);

            this.timerIntervalId = setInterval(() => {
                if (!this.isPaused && this.timer > 0) {
                    this.timer--;
                } else if (this.timer === 0 && !this.isPaused) {
                    this.endRound();
                }
            }, 1000);
        },

        togglePause() {
            if (!this.isStartScreen && !this.gameOver && !this.showSettings) {
                this.isPaused = !this.isPaused;
            }
        },

        update() {
            const field = document.getElementById('game-field');
            const fw = field.clientWidth;
            const fh = field.clientHeight;

            // Spawn rate is slightly affected by speed multiplier
            const spawnRate = 0.02 * this.sandbox.speed;

            if (Math.random() < spawnRate) {
                this.spawnMonkey(fw, fh);
            }

            this.monkeys.forEach(m => {
                if (!m.isCaught) {
                    m.x += m.vx;
                    m.y += m.vy;
                    if (m.x < -150 || m.x > fw + 150 || m.y < -150 || m.y > fh + 150) {
                        m.outOfBounds = true;
                    }
                }
            });

            this.monkeys = this.monkeys.filter(m => !m.outOfBounds && !m.removed);
        },

        spawnMonkey(fw, fh) {
            const side = Math.floor(Math.random() * 4);
            let x, y, vx, vy;
            
            // Base speed adjusted by sandbox multiplier
            const baseSpeed = 0.6 + Math.random() * 0.8;
            const finalSpeed = baseSpeed * this.sandbox.speed;

            if (side === 0) { x = Math.random() * fw; y = -100; vx = (Math.random()-0.5) * 0.5; vy = finalSpeed; }
            else if (side === 1) { x = fw + 100; y = Math.random() * fh; vx = -finalSpeed; vy = (Math.random()-0.5) * 0.5; }
            else if (side === 2) { x = Math.random() * fw; y = fh + 100; vx = (Math.random()-0.5) * 0.5; vy = -finalSpeed; }
            else { x = -100; y = Math.random() * fh; vx = finalSpeed; vy = (Math.random()-0.5) * 0.5; }

            const chars = this.sandbox.letters;
            if (!chars) return;
            
            this.monkeys.push({
                id: this.monkeyId++,
                x, y, vx, vy,
                letter: chars[Math.floor(Math.random() * chars.length)],
                isCaught: false, removed: false, outOfBounds: false
            });
        },

        handleInput(e) {
            if (e.key === ' ') {
                this.togglePause();
                return;
            }

            if (this.isStartScreen || this.showSettings || this.gameOver || this.isPaused) return;
            
            const char = e.key.toUpperCase();
            const index = this.monkeys.findIndex(m => m.letter === char && !m.isCaught);
            
            if (index !== -1) {
                this.score += 10;
                const m = this.monkeys[index];
                m.isCaught = true;
                setTimeout(() => m.removed = true, 500);
                this.saveProgress();
            }
        },

        endRound() {
            clearInterval(this.loopId);
            clearInterval(this.timerIntervalId);
            this.gameOver = true;
        },

        restartGame() {
            this.startRound();
        }
    };
}
