---
layout: post
title: Food Paris Review
permalink: /travel/Paris/food_paris/review
menu: nav/paris_hotbar.html
---

async function submitPost(userMessage) {
    const title = "Title";
        const content = userMessage;
        const channel_id = 2;
        const postData = {
            title: title,
            comment: content,
            channel_id: channel_id
        };
        try {
            const response = await fetch(`${pythonURI}/api/post`, {
                ...fetchOptions,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            if (!response.ok) {
                throw new Error('Failed to add channel: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error adding channel:', error);
            alert('Error adding channel: ' + error.message);
        }
}
</script> 