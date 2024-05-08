'use client'

import axios, { AxiosRequestConfig } from 'axios'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SimpleProgressBar from '@/components/shared/progress'

import {
  UploadCloudIcon,
  FileCheck2Icon,
  LucideTrash2
} from 'lucide-react'

type Props = {
  eventSocket: any;
  eventMessage: any;
  handleTabIdentifier: (identifier: any) => void;
}

function TabContents({ eventSocket, eventMessage, handleTabIdentifier }: Props) {
  const inputRef = useRef<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tabIdentifier, setTabIdentifier] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, identifier: string) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setTabIdentifier(identifier)
      handleTabIdentifier(identifier)
    }
  };

  const handleUpload = async () => {
    setUploaded(true)
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

        if (percentage === 100) {
          setUploaded(false);
        }
      },
    };

    try {
      await axios.post(`https://api.synchronice.id/upload/bulan/${tabIdentifier}`, formData, options)
        .then(({ data }) => {
          setFile(null)
        })
      setUploaded(false)
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

  function removeFile() {
    setFile(null);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <Tabs defaultValue="distributor" className="w-full h-fit">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="distributor">Report F5</TabsTrigger>
        <TabsTrigger value="kios">Report F6</TabsTrigger>
      </TabsList>
      <TabsContent value="distributor" className='pt-2'>
        <Card className='border shadow-none'>
          <CardContent className="space-y-2 pt-6">
            <div className="space-y-1 text-center">
              <form
                className={`w-full flex flex-col mb-6 mt-6 rounded-lg h-fit items-center justify-center`}
              >
                {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
                <input
                  placeholder="fileInput"
                  className="hidden"
                  ref={inputRef}
                  type="file"
                  id="file"
                  accept=".csv"
                  onChange={(e) => handleFileChange(e, 'f5')}
                  multiple={false}
                />

                {
                  !file && (
                    <p className='flex flex-row gap-2'>
                      <UploadCloudIcon className='w-6 h-6 opacity-70' />
                      <span
                        className="font-bold text-blue-600 cursor-pointer"
                        onClick={openFileExplorer}
                      >
                        <u>Select files F5</u>
                      </span>{" "}
                      to upload
                    </p>
                  )
                }

                <div className="w-full flex flex-col items-center p-3">
                  {file && (
                    <div className="w-full flex flex-row items-center justify-between gap-4 p-6 rounded-lg bg-blue-100/50">
                      <div className='flex flex-row gap-4 items-center'>
                        <FileCheck2Icon className='w-6 h-6 opacity-70' />
                        <div className='flex flex-col text-left'>
                          <p className='text-sm opacity-80'>File Name: <span className='font-bold'>{file.name}</span></p>
                          <p className='text-sm opacity-80'>File Size: <span className='font-bold'>{(file.size / (1024 * 1024)).toFixed(2)} MB</span></p>
                        </div>
                      </div>
                      <LucideTrash2
                        className="w-6 h-6 text-red-500 cursor-pointer"
                        onClick={() => removeFile()}
                      />
                    </div>
                  )}
                </div>
              </form>
              <p className='text-sm opacity-70'>Upload your file report f5 here, the file must <span className='font-bold underline'>csv</span> extension.</p>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            {
              uploaded && <SimpleProgressBar progress={progress} remaining={remaining} />
            }
            {
              eventMessage !== '' && (<h1 className='text-sm opacity-70'>{eventMessage}</h1>)
            }
            {
              eventSocket.length > 0 ? (<></>) : (<Button className='ml-auto' onClick={handleUpload}>Upload data</Button>)
            }
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="kios" className='pt-2'>
        <Card className='border shadow-none'>
          <CardContent className="space-y-2 pt-6">
            <div className="space-y-1 text-center">
              <form
                className={`w-full flex flex-col mb-6 mt-6 rounded-lg h-fit items-center justify-center`}
              >
                {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
                <input
                  placeholder="fileInput"
                  className="hidden"
                  ref={inputRef}
                  type="file"
                  id="file"
                  accept=".csv"
                  onChange={(e) => handleFileChange(e, 'f6')}
                  multiple={false}
                />

                {
                  !file && (
                    <p className='flex flex-row gap-2'>
                      <UploadCloudIcon className='w-6 h-6 opacity-70' />
                      <span
                        className="font-bold text-blue-600 cursor-pointer"
                        onClick={openFileExplorer}
                      >
                        <u>Select files F6</u>
                      </span>{" "}
                      to upload
                    </p>
                  )
                }

                <div className="w-full flex flex-col items-center p-3">
                  {file && (
                    <div className="w-full flex flex-row items-center justify-between gap-4 p-6 rounded-lg bg-blue-100/50">
                      <div className='flex flex-row gap-4 items-center'>
                        <FileCheck2Icon className='w-6 h-6 opacity-70' />
                        <div className='flex flex-col text-left'>
                          <p className='text-sm opacity-80'>File Name: <span className='font-bold'>{file.name}</span></p>
                          <p className='text-sm opacity-80'>File Size: <span className='font-bold'>{(file.size / (1024 * 1024)).toFixed(2)} MB</span></p>
                        </div>
                      </div>
                      <LucideTrash2
                        className="w-6 h-6 text-red-500 cursor-pointer"
                        onClick={() => removeFile()}
                      />
                    </div>
                  )}
                </div>
              </form>
              <p className='text-sm opacity-70'>Upload your file report f5 here, the file must <span className='font-bold underline'>csv</span> extension.</p>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            {
              uploaded && <SimpleProgressBar progress={progress} remaining={remaining} />
            }
            {
              eventMessage !== '' && (<h1 className='text-sm opacity-70'>{eventMessage}</h1>)
            }
            {
              eventSocket.length > 0 ? (<></>) : (<Button className='ml-auto' onClick={handleUpload}>Upload data</Button>)
            }
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default TabContents