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
  row:{
    backgroundColor:colors.white,
    padding:14,
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
    borderWidth:1,
    borderColor:colors.border
  },
  rowText:{
    fontSize:16,
    color:colors.text
  }
});
