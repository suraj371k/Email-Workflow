"use client";

import { useGmailStore } from "@/store/gmailStore";
import React, { useEffect } from "react";

const Test = () => {
  const { labels, loading, getLabels, messages, getMessages } = useGmailStore();



  useEffect(() => {
    getMessages();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }


messages.map((msg) => {
  console.log("snippet: " , msg.snippet)
})

  return (
    <div className="mt-20">
      <h1 className="text-5xl font-bold">Message</h1>
      <div>
        {/* {messages.map((message) => (
          <div key={message.partId}>
            <p>{message.body.data.snippet}</p>
          </div>
        ))} */}
      </div>
      <div>
          {messages.map((msg) => (
            <ol className="list-disc" key={msg.id}>
              <li className="list-disc">{msg.snippet}</li>
            </ol>
          ))}
      </div>
    </div>
  );
};

export default Test;
