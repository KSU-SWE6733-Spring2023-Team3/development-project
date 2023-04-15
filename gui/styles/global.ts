import { StyleSheet } from "react-native"

const globalStyles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        color:"#fff"
    },
    input: {
        width: '80%',
        height: 48,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginTop: 16,
    },
    text:{
        color:'#fff',
        fontSize:18
    },
    errorText:{
      color:'#F44B4B'  
    },
    btn:{
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'#7700FF',
        marginVertical:10,
        borderRadius:5
    },
})

export default globalStyles