# Lockbox

A plugin for Google Drive that allows you to securely send out a copy of a Drive document.

## How it works
It works by streaming a PDF copy to the Lockbox service, and sending a one-time link to the specified recipient. The recipient has a limited time to download the PDF via the provided link.

If the recipient tries to download the file after the link expired, they can require a new key to download the file. The key will be send to the email address specified by the sender, ensuring that only the owner of the email address can access the file.

## Happy flow
```
Sender                      Lockbox                   Recipient

Stream PDF for recipient =>
                            Store file
                            Generate key
                            Send link to recipient
                                                        Open link
                                                        <= Request file
                            Link valid?
                            Y: Stream PDF to recipient
                            N: Show request key page
```

## Attack vectors
### Input
- Intercepting the document on the way in to Lockbox
### Persistence
- Getting access to documents while in Lockbox
### Delivery
- This system hinges on the recipient having control over their email address

## Architecture
```

client

gateway

logic

storage
```

### Gateway
```
POST  /store { PDF, email } => key    // Return `success` to `sender`, in the background send `key` to `recipient`
GET   /get { key } => PDF

GET   /key { key:expired } => html:requestKeys
POST  /key { email:valid } => key
POST  /key { email:invalid } => html:error
```

### Ledger
TODO: figure out if the `key` should be persisted something link this: { key: { data } } or like this: [ key: {data} ]. Second option is a funky use of Array.

```
[
  {
    created:  Date.now(),
    valid:    Number,       // expiry window in ms
    email:    String,
    document: String,       // URI to the document
    key:      String        // private part of the key pair
  }
]
```
