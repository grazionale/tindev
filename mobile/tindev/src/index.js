import React from 'react';
import Routes from './routes';
import YellowBox from 'react-native';

YellowBox.ignoreWarnings = ([
  'Unrecognized WebSocket',
]);

console.disableYellowBox = true;

export default  function App() {
  return (
    <Routes/>
  );
}