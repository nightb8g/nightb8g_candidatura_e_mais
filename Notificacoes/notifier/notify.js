const webpush = require('web-push');

const keys = {
    public: 'BEKhoriJtGUskW18vLmH1_EKEda8GDAY7mvzgAICYmC_tjRFsBy3TZJLi07QMfXquo3aKefHBuKp3jpigiuZccI',
    private: 'NgkZOqUQRVLHSEsLZnw9ApZd-86KDolM2kCi69dDR4w'
};

//PUBLIC_VAPID_KEY
//PRIVATE_VAPID_KEY

module.exports = (email, subscription, payload) => {
    webpush.setVapidDetails(`mailto:${email}`, keys.public, keys.private);

    webpush.sendNotification(subscription, payload)
        .catch(err => {
            console.error(err.stack);
        });
};