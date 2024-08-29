import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { COLORS } from '../../enums/StyleGuides'

const CustomInput = (props) => {
    const {
        holder, onChangeText,
        value, style, secureTextEntry,
        rightIcon, onPress,
        multiline,
        placeholderTextColor, floatingholder, backgroundColor
    } = props

    return (

        <View style={[styles.inputView,{backgroundColor}]}>

            {
                floatingholder
                    ?
                    <Text style={[styles.floatingLable]}>
                        {floatingholder}
                    </Text>
                    :
                    null
            }

            <TextInput
                style={style}
                placeholder={holder}
                onChangeText={onChangeText}
                value={value}
                secureTextEntry={secureTextEntry && secureTextEntry}
                placeholderTextColor={placeholderTextColor}
                multiline={multiline}
            />
            {
                rightIcon
                    ?
                    <CustomButton
                        icon={rightIcon}
                        onPress={onPress}
                    />
                    :
                    null
            }
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 55,
        borderWidth: 1,
        borderColor: COLORS.INPUT_BORDERS,
        // marginVertical: '3.5%',
        marginVertical: Dimensions.get('screen').height*0.01,
        paddingHorizontal: 10,
    },
    floatingLable: {
        position: 'absolute',
        top: -10,
        left: 15,
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 5,
        color: COLORS.INPUT_BORDERS
    }
})