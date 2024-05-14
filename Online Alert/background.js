function check() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        const xhr = new XMLHttpRequest();
        // xhr.open('GET', 'https://api.ipify.org'); // /?format=json
        // xhr.open('GET', 'https://www.instagram.com/favicon.ico'); // /?format=json
        xhr.open('GET', 'https://www.google.com/favicon.ico'); // /?format=json
        xhr.timeout = 5000;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    networkStatus('Online');
                } else {
                    networkStatus('Offline');
                }
                setTimeout(() => {
                    check();
                }, 5000);
            }
        };
        xhr.send();
    });
}
check();

function networkStatus(status) {
    const xhr = new XMLHttpRequest();
    if (localStorage.getItem('network_status') == 'Online' && status == 'Offline') {
        xhr.open('GET', 'http://desktop-i1780c6/net-log/?status=' + status);
        xhr.timeout = 5000;
        xhr.send();
        var myAudio = new Audio();
        myAudio.src = "LISTEN--C2pMy3vXcI.mp3";
        myAudio.play();
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Offline Alert',
                message: 'You are now offline!'
            });
        });
    } else if (localStorage.getItem('network_status') == 'Offline' && status == 'Online') {
        xhr.open('GET', 'http://desktop-i1780c6/net-log/?status=' + status);
        xhr.timeout = 5000;
        xhr.send();
        var myAudio = new Audio();
        myAudio.src = "LISTEN--3HPE9u3tS3.mp3";
        myAudio.play();
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'Online Alert',
                message: 'You are now online!'
            });
        });
    }
    localStorage.setItem('network_status', status)
}