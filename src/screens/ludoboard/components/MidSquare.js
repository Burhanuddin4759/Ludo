import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../enums/StyleGuides'

const MidSquare = () => {
    return (
        <View style={styles.container}>
            <View style={styles.green}></View>
            <View style={styles.blue}></View>
            <View style={styles.red}></View>
            <View style={styles.yellow}></View>
        </View>
    )
}

export default MidSquare

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '20%',
        // borderWidth:2,
        borderColor:COLORS.BORDER_COLOR,
        justifyContent:'center',
        alignItems:'center'
    },
    green:{
        // borderStyle:'solid',
        // backgroundColor:'transparent',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderBottomColor:COLORS.GREEN,
        borderLeftWidth:42,
        borderRightWidth:42,
        borderBottomWidth:42,
        // alignSelf:'center',
        transform:[{rotate:'90deg'}],
        height:'100%',
        width:'100%',
        position:'absolute',
        left:0,
        // zIndex:0
    },
    blue:{
        // borderStyle:'solid',
        // backgroundColor:'transparent',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderBottomColor:COLORS.BLUE,
        borderLeftWidth:42,
        borderRightWidth:42,
        borderBottomWidth:42,
        // alignSelf:'center',
        transform:[{rotate:'-90deg'}],
        height:'100%',
        width:'100%',
        position:'absolute',
        right:0,
        // zIndex:0
    },
    yellow:{
        // borderStyle:'solid',
        // backgroundColor:'transparent',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderBottomColor:COLORS.YELLOW,
        borderLeftWidth:42,
        borderRightWidth:42,
        borderBottomWidth:42,
        // alignSelf:'center',
        transform:[{rotate:'180deg'}],
        height:'100%',
        width:'100%',
        position:'absolute',
        top:0,
        // zIndex:0
    },
    red:{
        // borderStyle:'solid',
        // backgroundColor:'transparent',
        borderRightColor:'transparent',
        borderLeftColor:'transparent',
        borderBottomColor:COLORS.RED,
        borderLeftWidth:42,
        borderRightWidth:42,
        borderBottomWidth:42,
        // alignSelf:'center',
        transform:[{rotate:'360deg'}],
        height:'100%',
        width:'100%',
        position:'absolute',
        bottom:0,
        // zIndex:0
    }
})