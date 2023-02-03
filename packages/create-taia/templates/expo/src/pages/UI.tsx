import { StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { Text, View } from '../components/Themed';

export default function UI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>UI example</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button shadow={2} onPress={() => console.log('hello world')}>
        Click me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
