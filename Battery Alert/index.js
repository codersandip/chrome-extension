setInterval(() => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        navigator.getBattery().then((battery) => {
            if (battery.charging == true && battery.level > 0.90) {
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon.png",
                    title: "Battery Alert",
                    message: "Please Remove Your Charger!"
                })
				var myAudio = new Audio();
				myAudio.src = "LISTEN--zpZhcJrquP.mp3";
				myAudio.play();
            }

            if (battery.charging == false && battery.level < 0.25) {
				var myAudio = new Audio();
				myAudio.src = "LISTEN--ug5rCmSpEi.mp3";
				myAudio.play();
                chrome.notifications.create({
                    type: "basic",
                    iconUrl: "icon1.png",
                    title: "Battery Alert",
                    message: "Please Plugin Your Charger!"
                })
            }
        });
    });
}, 30000);