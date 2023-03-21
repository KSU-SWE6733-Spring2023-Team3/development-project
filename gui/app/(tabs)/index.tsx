import { Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }}
        style={styles.image}
      />
      <View style={styles.contentsContainer}>
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.status}>Active Now</Text>
        <Text style={styles.distance}>4 Miles away</Text>
        <View style={styles.actionsContainer}>
          <View style={styles.iconContainer}>
            <Icon name="close" size={30} color="#ffafcc" style={styles.icon} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="heart" size={30} color="#ffafcc" style={styles.icon} />
          </View>
          <View style={styles.iconContainer}>
            <Icon name="rocket" size={30} color="#ffafcc" style={styles.icon} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  image: {
    // flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
  contentsContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    backgroundColor: 'transparent',
    rowGap:7
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  distance: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  status: {
    fontSize: 16,
    fontWeight: '400'
    
  },
  actionsContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    width:'90%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    // borderWidth:3
  },
  iconContainer: {
    backgroundColor: 'transparent',
    width:50,
    height:50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor:'#ffafcc',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
    
  },
  icon: {
    
  }
});
