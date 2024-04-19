'use client'

import { Button } from '@/components/ui/button';
import axios from 'axios';
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

  const handle = async () => {
    try {
      const response = await axios.get('https://api.synchronice.id/send-message-to-client', {
        headers: {
          'Access-Control-Allow-Origin': 'https://admin.synchronice.id',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <div className='w-full h-full flex flex-col'>
      <h1>Event Stream</h1>
      <Button variant={'outline'} onClick={handle}>Test Event</Button>
    </div>
  )
}

export default Event