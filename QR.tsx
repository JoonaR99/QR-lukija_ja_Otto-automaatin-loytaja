import React, { useState } from 'react'
import { Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

interface Props{
  data: string
}

const QR = () => {

  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState(false);
  const [linkki, setLinkki] = useState<string>("");

  const skannaa = () => {
    const getBarCodeScannerPermissions = async () : Promise<void> => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
    };
    getBarCodeScannerPermissions();
  };
  const handleBarCodeScanned = ({ data } : Props) => {
    setScanned(true);
    const apuData = data;
    setLinkki(apuData);
    alert(`Avattiin sivu: ${data}`);
  };
  if (hasPermission === null) {
    return <View style={styles.container}><Text >Saako sovellus käyttää kameraa</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text >Kameran käyttö kielletty</Text></View>;
  }

  if (scanned === true){
    return <WebView style={styles.container} source={{uri : linkki}}/>
  }

  return (
    (hasPermission)
    ? <>
        <View style={styles.container}>
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          />
        </View>
      </>
    :<>
    <View style={styles.container}>
      <Button
        onPress={skannaa}
        mode='contained'
        style={{padding: 10}}
      >Skannaa QR-koodi</Button>      
      <StatusBar style="auto" />
    </View>
    </>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
});
export default QR;