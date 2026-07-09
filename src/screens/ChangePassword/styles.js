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
    marginBottom:12,
    color:colors.text
  },
  label:{
    color:colors.gray,
    marginTop:12,
    marginBottom:6
  },
  input:{
    backgroundColor:colors.white,
    padding:12,
    borderRadius:10,
    borderWidth:1,
    borderColor:colors.border
  }
});
