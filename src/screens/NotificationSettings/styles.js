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
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:colors.white,
    padding:14,
    borderRadius:10,
    marginBottom:10,
    borderWidth:1,
    borderColor:colors.border
  },
  rowText:{
    color:colors.text,
    fontSize:16
  }
});
