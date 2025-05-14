// Select elements
const backend = "http://localhost:3014"
const usernameInput = document.querySelector('.username-input');
const messageInput = document.querySelector('.new-message-input');
const sendMessageButton = document.querySelector('.send-message-btn');
const chatWindow = document.querySelector('.chat-window');
const clearChatButton = document.querySelector('.clear-chat-btn');
const errorMessagePopup = document.querySelector('.error-message-popup');
const closeErrorButton = document.querySelector('.close-btn');

// Hide error popup initially
errorMessagePopup.classList.remove('active');

// Enable/disable the send button based on input values
function updateSendButtonState() {
    sendMessageButton.disabled = !usernameInput.value.trim() || !messageInput.value.trim();
}

// Add event listeners
usernameInput.addEventListener('input', updateSendButtonState);
messageInput.addEventListener('input', updateSendButtonState);

// Close error message popup
closeErrorButton.addEventListener('click', () => {
    errorMessagePopup.classList.remove('active');
});

// Send message function
async function sendMessage() {
    const author = usernameInput.value.trim();
    const messageContent = messageInput.value.trim();

    if (!author || !messageContent) return;

    try {
        // Step 1: Censor message
        const censorResponse = await fetch(`${backend}/censorMessage?message=${encodeURIComponent(messageContent)}`);
        if (!censorResponse.ok) throw new Error('Failed to censor message');
        const { censoredMessage } = await censorResponse.json();

        // Step 2: Send censored message to chat
        const postResponse = await fetch(`${backend}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, message: censoredMessage })
        });
        if (!postResponse.ok) throw new Error('Failed to send message');
        
        // Clear input field and update chat
        messageInput.value = '';
        updateSendButtonState();
        loadChat();
    } catch (error) {
        console.error(error);
        showErrorPopup(error.message);
    }
}

// Display error message popup
function showErrorPopup(message) {
    errorMessagePopup.querySelector('.message').textContent = message;
    errorMessagePopup.classList.add('active');
}

// Load chat messages and update chat window
async function loadChat() {
    try {
        const response = await fetch(`${backend}/chat`);
        if (!response.ok) throw new Error('Failed to load chat');
        const chatMessages = await response.json();

        chatWindow.innerHTML = chatMessages.map(msg => `
            <div class="chat-entry">
                <span class="author">${msg.author}</span>
                <span class="delimiter">:&nbsp;</span>
                <span class="message">${msg.message}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error(error);
        showErrorPopup(error.message);
    }
}

// Clear chat messages
async function clearChat() {
    try {
        const response = await fetch(`${backend}/chat`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to clear chat');
        loadChat();
    } catch (error) {
        console.error(error);
        showErrorPopup(error.message);
    }
}

// Set up event listeners
sendMessageButton.addEventListener('click', sendMessage);
clearChatButton.addEventListener('click', clearChat);

// Handle Enter key press for message sending
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !sendMessageButton.disabled) {
        event.preventDefault();
        sendMessage();
    }
});

// Poll for new chat messages every 500ms
setInterval(loadChat, 500);

// Load the chat immediately after the page is loaded
document.addEventListener('DOMContentLoaded', loadChat);