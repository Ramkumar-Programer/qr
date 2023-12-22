import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from '@material-ui/core';
import QRCode from 'qrcode';
import { QrReader } from 'react-qr-reader';

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [scanning, setScanning] = useState(true); // New state for scanning
  const classes = useStyles();

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log('err  : ' + error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      console.log('QR code scanned:', result);
      setScanResultWebCam(result);
      setScanning(false); // Stop scanning after successful scan
    } else {
      console.log('No QR code found.');
    }
  };
  

  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Generate Download & Scan QR Code with React js</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)} />
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={() => {
                  generateQrCode();
                  setScanning(true); // Resume scanning if it was stopped
                }}
              >
                Generate
              </Button>
              <br />
              <br />
              <br />
              {imageUrl ? (
                <a href={imageUrl} download>
                  <img src={imageUrl} alt="img" />
                </a>
              ) : null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <h3>Qr Code Scan by Web Cam</h3>
              {scanning && (
                <QrReader
                  delay={300}
                  onError={handleErrorWebCam}
                  onResult={handleScanWebCam}
                  style={{ width: '20%' , height : '10%'}}
                />
              )}
              <h3>Scanned By WebCam Code: {scanResultWebCam.text}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3f51b5',
    color: '#fff',
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));

export default App;
