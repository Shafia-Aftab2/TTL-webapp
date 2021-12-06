function NotificationsSnackQue(maxVisible = 3) {
  let position = "bottom";
  let parentContainer = document.body;
  let queue = [];
  const notifications = {};
  const container = document.createElement("div");
  container.className = `talkie-notification-container ${position}`;

  parentContainer.appendChild(container);

  const createNotificationMessageElement = (
    msg,
    pos,
    closeButton = false,
    displayIcon = false
  ) => {
    const box = document.createElement("div");
    const icon = displayIcon
      ? `<div class='talkie-notification-icon-wrapper'>
              ${
                (displayIcon === "success" &&
                  "<svg class='talkie-notification-icon' focusable='false' viewBox='0 0 24 24' aria-hidden='true'><path d='M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z'></path></svg>") ||
                (displayIcon === "error" &&
                  "<svg class='talkie-notification-icon' focusable='false' viewBox='0 0 24 24' aria-hidden='true'><path d='M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z'></path></svg>") ||
                (displayIcon === "info" &&
                  "<svg class='talkie-notification-icon' focusable='false' viewBox='0 0 24 24' aria-hidden='true'><path d='M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z'></path></svg>") ||
                (displayIcon === "warning" &&
                  "<svg class='talkie-notification-icon' focusable='false' viewBox='0 0 24 24' aria-hidden='true'><path d='M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z'></path></svg>")
              }
            </div>`
      : "";
    box.className = "talkie-notification-message";
    box.innerHTML = `${icon}<span>${msg}</span>${
      closeButton
        ? "<button type='button' class='talkie-notification-close-button'>x</button>"
        : ""
    }`;
    closeButton &&
      box
        .querySelector(".talkie-notification-close-button")
        .addEventListener("click", () => {
          let sib = box.nextElementSibling;
          let height = box.offsetHeight + 15;

          while (sib) {
            sib.style[pos] = parseInt(sib.style[pos], 10) - height + "px";
            height = sib.offsetHeight + 15;
            sib = sib.nextElementSibling;
          }

          this.hide(msg);
        });

    return box;
  };

  const resetNotification = (msg, duration) => {
    clearTimeout(notifications[msg].timer);
    notifications[msg].timer = setTimeout(() => this.hide(msg), duration);
  };

  this.show = (message, options) => {
    const {
      position = "bottom",
      duration = 3000,
      variant = "",
      closeButton = false,
      displayIcon = false,
    } = options;

    if (!container.children.length) {
      container.className = `talkie-notification-container ${position}`;
    }

    if (notifications[message]) {
      return resetNotification(message, duration);
    }

    if (container.children.length === maxVisible) {
      return queue.push([
        message,
        position,
        duration,
        variant,
        closeButton,
        displayIcon,
      ]);
    }

    if (queue.length) {
      queue.shift();
    }

    let pos = position && position.startsWith("bottom") ? "bottom" : "top";
    let timer = null;
    const notificationElement = createNotificationMessageElement(
      message,
      pos,
      closeButton,
      ["success", "error", "info", "warning"].includes(variant) && displayIcon
        ? variant
        : false
    );

    if (variant) {
      variant === "success" &&
        notificationElement.classList.add(
          "talkie-notification-success-message"
        );
      variant === "error" &&
        notificationElement.classList.add("talkie-notification-error-message");
      variant === "info" &&
        notificationElement.classList.add("talkie-notification-info-message");
      variant === "warning" &&
        notificationElement.classList.add(
          "talkie-notification-warning-message"
        );
    }

    container.insertAdjacentElement("afterbegin", notificationElement);

    let height = notificationElement.offsetHeight + 40;
    let sib = notificationElement.nextElementSibling;

    while (sib) {
      sib.style[pos] = height + "px";
      height += sib.offsetHeight + 15;
      sib = sib.nextElementSibling;
    }

    // removal
    timer = setTimeout(() => this.hide(message), duration);

    notifications[message] = { timer, notificationElement };
  };

  this.hide = (message) => {
    if (notifications[message]) {
      clearTimeout(notifications[message].timer);
      notifications[message].notificationElement.remove();
      delete notifications[message];

      if (queue.length) {
        setTimeout(() => queue.length && this.show(...queue[0]), 300);
      }
    }
  };

  this.clear = () => {
    queue = [];
    Object.keys(notifications).forEach((msg) => this.hide(msg));
  };
}

const notifications = new NotificationsSnackQue();

export { NotificationsSnackQue, notifications };
