function selectItem(itemNumber, element) {
    // Reset active class from all items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to the clicked item
    element.classList.add('active');

    if (itemNumber === 2) {
        // Fetch and display content from page1.html
        fetch('directmessage/dm.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching page1.html:', error);
                document.getElementById('content').innerText = 'Error loading content.';
            });
    } else {
        // Update content area for other items (or remove this else block if not needed)
        document.getElementById('content').innerText = "Item " + itemNumber + " selected";
    }


    if (itemNumber === 1) {
        // Fetch and display content from page1.html
        fetch('clientmanager/cm.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
            })
            .catch(error => {
                console.error('Error fetching page1.html:', error);
                document.getElementById('content').innerText = 'Error loading content.';
            });
    } else {
        // Update content area for other items (or remove this else block if not needed)
        document.getElementById('content').innerText = "Item " + itemNumber + " selected";
    }
}
