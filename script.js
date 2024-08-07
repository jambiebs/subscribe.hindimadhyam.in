// set a cookie
function setCookie(name, value, days, domain) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=" + domain;
  }
  
  // delete a cookie
  function deleteCookie(name, domain) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain;
  }
  
  // check notification permission and update cookie
  function checkNotificationAndUpdateCookie() {
    if (Notification.permission === "granted") {
      setCookie("hm-notify", "true", 9999, ".hindimadhyam.in");
    } else {
      deleteCookie("hm-notify", ".hindimadhyam.in");
    }
  }
  
  // update the button
  function updateButtonBasedOnNotificationPermission() {
    const actionButton = document.getElementById('actionButton');
    if (!actionButton) {
      console.error('Button element not found.');
      return;
    }
  
    if (Notification.permission === "granted") {
      actionButton.textContent = "❮ Go Back";
      actionButton.style.backgroundColor = "#004aad";
      actionButton.onclick = function() {
        window.history.back();
      };
    } else {
      actionButton.textContent = "Subscribe";
      actionButton.style.backgroundColor = "#808000";
      actionButton.onclick = function() {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            setCookie("hm-notify", "true", 9999, ".hindimadhyam.in");
            actionButton.textContent = "❮ Go Back";
            actionButton.onclick = function() {
              window.history.back();
            };
          } else {
            console.log('Notification permission denied');
          }
        }).catch((error) => {
          console.error('Error requesting notification permission:', error);
        });
      };
    }
  }
  
  // Set up initial button update and interval
  document.addEventListener('DOMContentLoaded', function() {
    updateButtonBasedOnNotificationPermission();
    // Set up interval to check and update the button every 1000 ms
    setInterval(checkNotificationAndUpdateCookie, 1000);
    setInterval(updateButtonBasedOnNotificationPermission, 1000);
  });