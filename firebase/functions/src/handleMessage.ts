import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

const ORCHESTRATOR_URL = "https://us-central1-sheykh-c68e3.cloudfunctions.net/orchestrator";

const firestore = admin.firestore();

export const handleMessage = functions.firestore
  .document("conversations/{convid}/messages/{msgid}")
  .onCreate(async (snap, context) => {
    // Get an object representing the document
    const value = snap.data();

    // perform desired operations ...
    // functions.logger.log("new message was sent", message,
    //   context.params.convid,
    //   context.params.msgid
    // );

    const conversationRef = firestore
      .collection("conversations")
      .doc(context.params.convid)
      .collection("messages");

    try {
      // Step 1: Call the orchestrator function
      const orchestratorResponse = await axios.post(
        ORCHESTRATOR_URL,
        {
          text: value.content,
        }
      );

      const {url} = orchestratorResponse.data;


      conversationRef.add({
        audio: url,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        user: value.user,
      });
    } catch (error) {
      console.error("Error processing audio:", error);
      throw new Error("Internal Server Error");
    }
  });
