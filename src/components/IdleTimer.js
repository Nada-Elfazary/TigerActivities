import { update } from "lodash";

class IdleTimer{
    constructor({timeout, onTimeout}) {
        this.onTimeout = onTimeout
        this.timeout = timeout;
        this.eventHandler = this.updateExpiredTime.bind(this);
        this.tracker();
    }

    startInterval() {
        this.updateExpiredTime();
        this.interval = setInterval(() => {
            const expiredime = parseInt(localStorage.getItem("_expiredime") || 0, 10);
            if (expiredime < Date.now()) {
                if (this.onTimeout) {
                    this.onTimeout;
                    this.cleanUp
                }
            }
        }, 1000);
    }
    updateExpiredTime() {
    localStorage.setItem("_expiredime", Date.now() + this.timeout * 1000);
}
tracker() {
    window.addEventListener("mousemove", this.eventHandler);
    window.addEventListener("scroll", this.eventHandler);
    window.addEventListener("keydown", this.eventHandler);


}
cleanUp() {
    clearInterval(this.interval);
    window.removeEventListener("mousemove", this.eventHandler);
    window.removeEventListener("mousemove", this.eventHandler);
    window.removeEventListener("mousemove", this.eventHandler);
}
}
export default IdleTimer
