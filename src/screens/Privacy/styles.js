import {StyleSheet} from 'react-native';
import {colors} from '../../theme';

export default StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.background,
    padding:20
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    color:colors.text,
    marginBottom:12
  },
  subtitle:{
    fontSize:16,
    fontWeight:'700',
    color:colors.text
  },
  paragraph:{
    color:colors.gray,
    marginTop:6
  }
});
