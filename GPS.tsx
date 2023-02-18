import React, { useState } from 'react'
import { Button, Text } from 'react-native-paper';
import {StyleSheet,View} from 'react-native';
import * as Location from 'expo-location';
import koordinaatit from './koordinaatit';
import { LocationObject } from 'expo-location';

interface Koordinaatti{
    katuosoite : string
    postinumero : string
    postitoimipaikka : string
    koordinaatti_LAT : number
    koordinaatti_LON : number
}

const GPS = () => {
    const [location, setLocation] = useState<LocationObject> ();
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [lahin, setLahin] = useState<Koordinaatti>();
    const [odotusViesti, setOdotusViesti] = useState<string>("");
    const koordinaattiLista : Koordinaatti[] = koordinaatit;

    const hae = () =>{
      
      (async () => {
        setOdotusViesti("Haetaan...");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Lupa sijaintitietojen käyttöön kiellettiin!');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        let pieninEtaisyys : number = 1000000;

        for (let i = 0; i < koordinaatit.length; i++) {
         let etaisyys = (Math.sqrt(Math.pow(Number(koordinaatit[i].koordinaatti_LAT) - Number(location.coords.latitude), 2) + Math.pow(Number(koordinaatit[i].koordinaatti_LON) - Number(location.coords.longitude), 2)) * 111);

         if (etaisyys < pieninEtaisyys) {
          pieninEtaisyys = etaisyys;
          setLahin(koordinaatit[i]);
         }

        }
        setOdotusViesti("");
      })();
    }
    
      return (
        (isNaN(Number((Math.sqrt(Math.pow(Number(lahin?.koordinaatti_LAT) - Number(location?.coords.latitude),2) + Math.pow(Number(lahin?.koordinaatti_LON) - Number(location?.coords.longitude), 2)) * 111).toFixed(1))))
        ?<View style={styles.container}>
          <Button
            onPress={hae}
            mode='contained'
            style={{padding: 10, marginBottom: 30}}
          >Hae lähin Otto-automaatti</Button>
          <Text style={{fontSize: 20, marginTop: 5}}>{odotusViesti}</Text>
        </View>
        :<View style={styles.container}>
          <Button
            onPress={hae}
            mode='contained'
            style={{padding: 10, marginBottom: 30}}
          >Hae lähin Otto-automaatti</Button>
          <Text style={styles.paragraph}>{lahin?.katuosoite}</Text>
          <Text style={styles.paragraph}>{lahin?.postinumero} {lahin?.postitoimipaikka}</Text>
          <Text style={styles.paragraph}>Etäisyys: {(Math.sqrt(Math.pow(Number(lahin?.koordinaatti_LAT) - Number(location?.coords.latitude),2) + Math.pow(Number(lahin?.koordinaatti_LON) - Number(location?.coords.longitude), 2)) * 111).toFixed(1)} km</Text>
          <Text style={{fontSize: 20, marginTop: 20}}>{odotusViesti}</Text>
        </View>
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paragraph: {
      fontSize: 18,
      textAlign: 'center',
    },
});
export default GPS;