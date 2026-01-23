"use client";

import { useGmailStore } from "@/store/gmailStore";
import { useParams } from "next/navigation"; // Import useParams
import React, { useEffect, useState } from "react";

const Test = () => {
  const params = useParams(); // Get params from URL
  const messageId = params?.messageId as string; // Extract messageId
  
  const { 
    labels, 
    loading, 
    getLabels, 
    messages, 
    getMessages, 
    getMessageById, 
    encodedMessage 
  } = useGmailStore();
  
  const [activeFilter, setActiveFilter] = useState("all");

  // useEffect(() => {
  //   getMessages(activeFilter);
  // }, []);

  useEffect(() => {
    // Guard clause: only fetch if messageId exists
    if (messageId && messageId !== 'undefined') {
      getMessageById(messageId);
    }
  }, [messageId, getMessageById]);

  console.log("Encoded Message:", encodedMessage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!messageId) {
    return <p>No message ID provided</p>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-5xl font-bold">Message</h1>
      <div>
        <p>Message ID: {messageId}</p>
        {encodedMessage && (
          <div>
            <h2>Message Content:</h2>
            <div 
              dangerouslySetInnerHTML={{ 
                __html: atob(encodedMessage.replace(/-/g, '+').replace(/_/g, '/')) 
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;