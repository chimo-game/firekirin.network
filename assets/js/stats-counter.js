/**
 * Dynamic Statistics Counter
 * Animates account creation counter with smooth continuous counting
 */

class StatsCounter {
  constructor() {
    this.accountsElement = document.getElementById("accountsCounter");
    this.jackpotElement = document.getElementById("jackpotCounter");

    // Load persisted values from localStorage or start at 0
    this.accountsCurrent = this.getStoredValue("accounts", 0);
    this.jackpotCurrent = this.getStoredValue("jackpot", 0);

    // Increment amounts per update cycle
    this.accountsIncrement = this.getRandomIncrement(5, 15);
    this.jackpotIncrement = this.getRandomIncrement(100, 400);

    this.hasStarted = false;
    this.isAnimating = false;

    this.init();
  }

  init() {
    // Set initial display values from stored data
    if (this.accountsElement) {
      this.accountsElement.textContent = this.formatNumber(this.accountsCurrent);
    }
    if (this.jackpotElement) {
      this.jackpotElement.textContent = this.formatCurrency(this.jackpotCurrent);
    }

    // Start animation when element becomes visible
    this.observeElement();

    // Update counters every 10 seconds with smooth increment (slower)
    setInterval(() => {
      this.incrementStats();
    }, 10000);
  }

  observeElement() {
    // Use Intersection Observer to trigger animation when visible
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasStarted) {
              this.hasStarted = true;
              this.incrementStats();
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      const container = document.querySelector(".stats-container");
      if (container) {
        observer.observe(container);
      }
    } else {
      // Fallback if IntersectionObserver not supported
      setTimeout(() => this.incrementStats(), 500);
    }
  }

  getRandomIncrement(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  incrementStats() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;

    // Generate new increment amounts
    const newAccountsIncrement = this.getRandomIncrement(2, 5);
    const newJackpotIncrement = this.getRandomIncrement(30, 100);

    // Animate the increment smoothly over 5 seconds for much slower counting
    this.animateIncrement(
      newAccountsIncrement,
      newJackpotIncrement,
      5000 // 5 seconds for much slower, more gradual counting
    );
  }

  animateIncrement(accountsTarget, jackpotTarget, duration) {
    const startTime = Date.now();
    const startAccounts = this.accountsCurrent;
    const startJackpot = this.jackpotCurrent;

    const animateFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing (ease-out-cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      // Smoothly increment from current to target
      this.accountsCurrent = Math.floor(
        startAccounts + easeProgress * accountsTarget
      );
      if (this.accountsElement) {
        this.accountsElement.textContent = this.formatNumber(
          this.accountsCurrent
        );
      }

      this.jackpotCurrent = Math.floor(
        startJackpot + easeProgress * jackpotTarget
      );
      if (this.jackpotElement) {
        this.jackpotElement.textContent = this.formatCurrency(
          this.jackpotCurrent
        );
      }

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      } else {
        // Save final values to localStorage when animation completes
        this.saveToStorage("accounts", this.accountsCurrent);
        this.saveToStorage("jackpot", this.jackpotCurrent);
        this.isAnimating = false;
      }
    };

    requestAnimationFrame(animateFrame);
  }

  // localStorage utility methods
  getStoredValue(key, defaultValue) {
    try {
      const stored = localStorage.getItem(`statsCounter_${key}`);
      return stored ? parseInt(stored, 10) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(`statsCounter_${key}`, value.toString());
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  }

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  formatCurrency(num) {
    return "$" + this.formatNumber(num);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new StatsCounter();
  });
} else {
  new StatsCounter();
}
