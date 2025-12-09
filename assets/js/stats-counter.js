/**
 * Dynamic Statistics Counter
 * Animates account creation counter and daily jackpot amount
 */

class StatsCounter {
  constructor() {
    this.accountsElement = document.getElementById("accountsCounter");
    this.jackpotElement = document.getElementById("jackpotCounter");

    // Initial values
    this.accountsTarget = this.getRandomAccounts();
    this.jackpotTarget = this.getRandomJackpot();

    // Current animated values
    this.accountsCurrent = 0;
    this.jackpotCurrent = 0;

    this.isVisible = false;
    this.hasStarted = false;

    this.init();
  }

  init() {
    // Set initial display values
    if (this.accountsElement) {
      this.accountsElement.textContent = "0";
    }
    if (this.jackpotElement) {
      this.jackpotElement.textContent = "$0";
    }

    // Start animation when element becomes visible
    this.observeElement();

    // Update stats every 8 seconds with new random values
    setInterval(() => {
      this.updateStats();
    }, 8000);
  }

  observeElement() {
    // Use Intersection Observer to trigger animation when visible
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasStarted) {
              this.hasStarted = true;
              this.animate();
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
      setTimeout(() => this.animate(), 500);
    }
  }

  getRandomAccounts() {
    // Random between 145 and 285 accounts
    return Math.floor(Math.random() * (285 - 145 + 1)) + 145;
  }

  getRandomJackpot() {
    // Random between $2,450 and $9,999
    return Math.floor(Math.random() * (9999 - 2450 + 1)) + 2450;
  }

  updateStats() {
    this.accountsTarget = this.getRandomAccounts();
    this.jackpotTarget = this.getRandomJackpot();
    this.animate();
  }

  animate() {
    const duration = 4000; // 4 seconds animation (slower, more realistic)
    const startTime = Date.now();

    const animateFrame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      // Animate accounts counter
      this.accountsCurrent = Math.floor(easeProgress * this.accountsTarget);
      if (this.accountsElement) {
        this.accountsElement.textContent = this.formatNumber(
          this.accountsCurrent
        );
      }

      // Animate jackpot counter
      this.jackpotCurrent = Math.floor(easeProgress * this.jackpotTarget);
      if (this.jackpotElement) {
        this.jackpotElement.textContent = this.formatCurrency(
          this.jackpotCurrent
        );
      }

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    };

    requestAnimationFrame(animateFrame);
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
