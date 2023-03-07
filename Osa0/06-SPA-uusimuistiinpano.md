::: mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser has received the JavaScript code already earlier.

    Note right of browser: The browser sends only the new note (with date)
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Server responses with code 201 "note created"
    deactivate server
    
    Note right of browser: The browser executes the JavaScript code and updates the browser display.

:::