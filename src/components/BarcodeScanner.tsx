import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from '@zxing/library';


const BarcodeScanner = () => {
  const [codeReader, setCodeReader] = useState <BrowserMultiFormatReader>();
  const [resultBarcode, setResultBarcode] = useState<string>("");
  const [devices, setDevices] = useState<MediaDeviceInfo[] | []>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>();

  const videoElement = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // window.addEventListener('load', function () {
      let selectedDeviceId: string;
      const codeReader = new BrowserMultiFormatReader()
      setCodeReader(codeReader)
      console.log('ZXing code reader initialized')
      codeReader.listVideoInputDevices()
        .then((videoInputDevices) => {
          setDevices(videoInputDevices)
        })
        .catch((err) => {
          console.error(err)
        })
    // })
  }, [])

  const handleStartClick = () => {
    codeReader?.decodeFromVideoDevice(selectedDeviceId as string, videoElement.current, (result, err) => {
      setResultBarcode(result.getText())
      // const resultElement = document.getElementById('result')
      // if (result) {
      //   console.log(result)
      //   if (resultElement)
      //     resultElement.textContent = result.text
      // }
      // if (err && !(err instanceof ZXing.NotFoundException)) {
      //   console.error(err)
      //   if (resultElement)
      //     resultElement.textContent = err.message
      // }
    })
    console.log("Started continous decode from camera with id ${selectedDeviceId}")
  }

  const handleResetClick = () => {
    codeReader?.reset();
    setResultBarcode("");
    console.log("Reset camera with id ${selectedDeviceId")
  }

  return (
    <div>
      <label htmlFor="cars">Choose a camera:</label>

      <select name="cars" id="sourceSelect" onChange={e => setSelectedDeviceId(e.currentTarget.value)} value={selectedDeviceId}>
        {devices.map(device => {
          return <option value={device.deviceId}>{device.label}</option>
        })}
      </select>
      <div>
      <button id="startButton" onClick={handleStartClick}>Start</button>
      <button id="resetButton" onClick={handleResetClick}>Reset</button>
      </div>
      <div>
        <video ref={videoElement} id="video" width="300" height="200" style={{border: "1px solid gray"}}></video>
      </div>
      <h3>Result: {resultBarcode}</h3>
    </div>
  )
}

export default BarcodeScanner;