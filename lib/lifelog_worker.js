// to handle dissappearing messages 
setInterval(() => {
    postMessage("check"); // Send a message to the main thread to trigger `check_diss`
    console.log("working")
}, 60000); // Every minute
  