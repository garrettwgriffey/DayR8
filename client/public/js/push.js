if (!('serviceWorker' in navigator)) {
    console.log("No service worker in window")
}
else {
  navigator.serviceWorker.register("../sw.js")
  .then(reg => {reg.pushManager.getSubscription()
  .then(sub => {console.log(sub)})})
  askPermission()
  .then(() => {subscribe()})
}

if (!('PushManager' in window)) {
    console.log("No push messages in window")
}

// Asks permission from the user to allow push notifications
function askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('User did not grant permission.');
      }
    });
}

function subscribe() {
    return navigator.serviceWorker.getRegistration()
    .then(reg => {
      console.log("sw registered")
      reg.pushManager.subscribe({
        userVisibleOnly: true,  
        applicationServerKey: urlBase64ToUint8Array(
        'BIaxVOV4GWELIuDl2Uy9TqJgEyZ5EJH_Ukeo36_0basokUvNXfl_8PLMIx0epX1GpV71sFGBm3Tt-zXPeL3swkY'
      )}).then(sub => {
        // Find a way to access the arrays under the applicationServerKey section of the object
        console.log(sub.endpoint)
        let subscription = sub.endpoint
        sendSubscriptionToBackEnd(sub.endpoint)
        console.log("push manager subscribed")
      })
    })
}

function sendSubscriptionToBackEnd(subscription) {
  $.ajax({
    url : 'http://localhost:8081/api/save-subscription/',
    type: "POST",
    data : subscription,
    processData: false,
    contentType: "application/json" ,
    success: function(data, textStatus, jqXHR)
    {
        console.log(data)
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
      console.log(errorThrown)
    }
  });
    // return fetch('http://localhost:7000/api/save-subscription/', {
    //   method: 'POST',
    //   body: subscription
    // })
    // .then(function(response) {
    //   console.log(response)
    //   if (!response.ok) {
    //     throw new Error('Bad status code from server.');
    //   }
  
    //   return response.json();
    // })
    // .then(function(responseData) {
    //   if (!(responseData.data && responseData.data.success)) {
    //     throw new Error('Bad response from server.');
    //   }
    // });
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}