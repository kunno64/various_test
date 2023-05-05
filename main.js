// Replace with your own Google API key
const apiKey = "AIzaSyAXzIP-0J6cxmbhhkYt_WBOyve3OnWQFT8";
const calendarId = "1b112b48337ae63de8bfa98217f112e74464d0187fe9ed54ff0b6c93c4e5f5cc@group.calendar.google.com";

// Load the Google API client library and authenticate
gapi.load("client", async () => {
  try {
    await gapi.client.init({ apiKey });
    await createEvent();
  } catch (error) {
    console.error("Error initializing Google API client:", error);
  }
});

// Function to create the event
async function createEvent() {
  const eventData = {
    summary: "Sample Event",
    location: "123 Main St, Anytown, USA",
    description: "A sample event for demonstration purposes.",
    start: {
      dateTime: "2023-05-10T10:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: "2023-05-10T12:00:00-07:00",
      timeZone: "America/Los_Angeles",
    },
    attendees: [
      {
        email: "attendee1@example.com",
      },
      {
        email: "attendee2@example.com",
      },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "email",
          minutes: 24 * 60,
        },
        {
          method: "popup",
          minutes: 10,
        },
      ],
    },
  };

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${gapi.client.getToken().access_token}`,
        },
        body: JSON.stringify(eventData),
      }
    );

    if (response.ok) {
      const createdEvent = await response.json();
      console.log("Event created successfully!", createdEvent);
    } else {
      console.error("Error creating event:", response.status);
      console.error(await response.text());
    }
  } catch (error) {
    console.error("Error sending request:", error);
  }
}
