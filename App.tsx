import React, {useState} from 'react';
import { BottomNavigation } from 'react-native-paper';
import GPS from './GPS'
import QR from './QR';

const App : React.FC = () : React.ReactElement => {

  const GpsRoute = () => <GPS/>

  const QrRoute = () => <QR/>;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'qr', title: 'QR', focusedIcon: 'qrcode-scan', unfocusedIcon: 'qrcode' },
    { key: 'gps', title: 'GPS', focusedIcon: 'crosshairs-gps', unfocusedIcon: 'crosshairs'}
  ]);

  const renderScene = BottomNavigation.SceneMap({
    qr: QrRoute,
    gps: GpsRoute

  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default App;