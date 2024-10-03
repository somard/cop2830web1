let messages = [
    { content: "Welcome to your inbox!", isRead: false },
    { content: "Reminder: Meeting tomorrow at 10 AM", isRead: false },
    { content: "Your subscription is ending soon.", isRead: false }
];

let currentIndex = 0;

function updateMessageDisplay() {
    const messageContent = document.getElementById("message-content");
    const messageCount = document.getElementById("message-count");
    
    if (messages.length > 0) {
        messageContent.value = messages[currentIndex].content;
        messageCount.textContent = `Message ${currentIndex + 1} of ${messages.length}`;
    } else {
        messageContent.value = "No new messages.";
        messageCount.textContent = "Messages: 0";
    }

    updateNavigationButtons();
}

function updateInboxCount() {
    const inboxCount = document.getElementById("inbox-count");
    const newMessages = messages.filter(msg => !msg.isRead).length;
    inboxCount.textContent = `New Messages: ${newMessages}`;
}

function updateNavigationButtons() {
    document.getElementById("back-btn").disabled = currentIndex === 0;
    document.getElementById("forward-btn").disabled = currentIndex === messages.length - 1;
}

function loadPreviousMessage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateMessageDisplay();
    }
}

function loadNextMessage() {
    if (currentIndex < messages.length - 1) {
        currentIndex++;
        updateMessageDisplay();
    }
}

document.getElementById("back-btn").addEventListener("click", loadPreviousMessage);
document.getElementById("forward-btn").addEventListener("click", loadNextMessage);

// Simulate checking for new messages every 15 seconds
setInterval(() => {
    // Simulate adding or removing a message randomly
    if (Math.random() < 0.5 && messages.length < 15) {
        // Add a new message
        messages.push({ content: "New Message at " + new Date().toLocaleTimeString(), isRead: false });
    } else if (messages.length > 0) {
        // Remove the first message
        messages.shift();
    }

    currentIndex = Math.min(currentIndex, messages.length - 1);
    updateMessageDisplay();
    updateInboxCount();
}, 5000);

// Initial load
updateMessageDisplay();
updateInboxCount();

