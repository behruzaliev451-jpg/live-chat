// Ин код дар паси пардаи телефон кор мекунад
self.addEventListener('push', function(event) {
    let data = { title: 'Паёми нав', body: 'Шумо паёми нав доред!' };
    if (event.data) {
        try { data = event.data.json(); } catch (e) { data.body = event.data.text(); }
    }
    const options = {
        body: data.body,
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
        vibrate: [200, 100, 200],
        data: { url: self.location.origin }
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(function(clientList) {
            if (clientList.length > 0) return clientList[0].focus();
            return clients.openWindow(event.notification.data.url);
        })
    );
});
