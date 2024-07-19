import * as functions from "firebase-functions";

export const handleMessage = functions.firestore
  .document("conversations/{convid}/messages/{msgid}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const message = newValue.message;

    // perform desired operations ...
    functions.logger.log("new message was sent", message,
      context.params.convid,
      context.params.msgid
    );
  });
