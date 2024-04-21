'use client'

import axios, { AxiosRequestConfig } from 'axios'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SimpleProgressBar from '@/components/shared/progress'

type Props = {}

function TabContents({}: Props) {  
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [tabIdentifier, setTabIdentifier] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, identifier: string) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTabIdentifier(identifier)
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    let startAt = Date.now();
    const formData = new FormData();
    formData.append('file', file);

    if (tabIdentifier) {
      formData.append('tabIdentifier', tabIdentifier);
    }

    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
  
        const percentage = (loaded * 100) / total;
        setProgress(+percentage.toFixed(2));
  
        const timeElapsed = Date.now() - startAt;
        const uploadSpeed = loaded / timeElapsed;
        const duration = (total - loaded) / uploadSpeed;
        setRemaining(duration);
      },
    };

    try {      
      await axios.post('https://api.synchronice.id/upload-file', formData, options)
      .then(({ data }) => {
  
        console.log("File was uploaded successfylly:", data);

      })
      // Handle success
    } catch (e: any) {
      setError('Error uploading the file.');
      console.error(e);
      const error =
        e.response && e.response.data
          ? e.response.data.error
          : "Sorry! something went wrong.";
      alert(error);
    }
  };
  
  return (
    <Tabs defaultValue="distributor" className="w-full h-fit">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="distributor">Report F5</TabsTrigger>
        <TabsTrigger value="kios">Report F6</TabsTrigger>
      </TabsList>
      <TabsContent value="distributor" className='pt-2'>
        <Card className='border shadow-none'>
          <CardContent className="space-y-2 pt-6">
            <div className="space-y-1">
              <Label htmlFor="file">File F5</Label>
              <Input 
                id="file" 
                type="file" 
                accept=".csv" 
                className='invert text-white'
                onChange={(e) => handleFileChange(e, 'F5')}
              />
              <p className='text-sm opacity-70'>Upload your file report f5 here, the file must <span className='font-bold underline'>csv</span> extension.</p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-2'>
            <SimpleProgressBar progress={progress} remaining={remaining} />
            <Button className='ml-auto' onClick={handleUpload}>Upload data</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="kios" className='pt-2'>
        <Card className='border shadow-none'>
          <CardContent className="space-y-2 pt-6">
            <div className="space-y-1">
              <Label htmlFor="file">File F6</Label>
              <Input 
                id="file" 
                type="file" 
                accept=".csv" 
                className='invert text-white'
                onChange={(e) => handleFileChange(e, 'F6')}
              />
              <p className='text-sm opacity-70'>Upload your file report f6 here, the file must <span className='font-bold underline'>csv</span> extension.</p>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-2'>
            <SimpleProgressBar progress={progress} remaining={remaining} />
            <Button className='ml-auto' onClick={handleUpload}>Upload data</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default TabContents