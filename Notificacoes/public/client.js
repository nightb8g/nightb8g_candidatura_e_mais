const publicKey = 'BEKhoriJtGUskW18vLmH1_EKEda8GDAY7mvzgAICYmC_tjRFsBy3TZJLi07QMfXquo3aKefHBuKp3jpigiuZccI';

const notify = document.querySelector('.notify');

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// notify
async function triggerNotification() {
    if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('/worker.js', {
            scope: '/'
        });

        let subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        const form = document.getElementById('form');
        let newSubscription = {
            to: form.to.value,
            subject: form.subject.value,
            message: form.message.value,
            "subscription": subscription
        };

        // /notifyForm is the link for nodejs app.js REST
        await fetch('/notify', {
            method: 'POST',
            body: JSON.stringify(newSubscription),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } else {
        console.error('Service workers are not supported in this browser');
    }
}

// notification event call
notify.addEventListener('click', () => {
    triggerNotification().catch(err => console.error(err));
});

