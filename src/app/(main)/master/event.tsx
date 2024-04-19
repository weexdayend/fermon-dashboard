'use client'

import React, { useEffect, useState } from 'react'

type Props = {}

function Event({}: Props) {
  useEffect(() => {
    const eventSource = new EventSource('https://api.synchronice.id/socket-connection-request');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message.startsWith('Batch')) {
        // Update current batch information in the UI
        console.log('Current batch:', data.message);
      } else if (data.message.startsWith('Estimated')) {
        // Update estimated remaining time in the UI
        console.log('Estimated remaining time:', data.message);
      }
    };

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    // Clean up the event source when the component unmounts
    return () => {
      eventSource.close();
    };
  }, []);
  
  return (
    <div>Event Stream</div>
  )
}

export default Event