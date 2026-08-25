import React, { memo } from 'react'
import { StyleSheet, Text, Pressable, View, ActivityIndicator, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'
import { playSound } from '../../helpers/SoundUtility'

const GradientButton = ({
    title,
    onPress,
    icon: Icon,           // pass a heroicon component, e.g. PlayIcon
    iconPosition = 'left', // 'left' | 'right'
    iconColor = '#fff',
    iconSize = RFValue(14),
    colors = ['#4c669f', '#3b5998', '#192f6a'], // fixed: mid stop was neon green, likely a typo
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const isDisabled = disabled || loading

    return (
        <View style={[styles.container, style]}>
            <Pressable
                onPress={()=>{
                    playSound('ui');
                    onPress();
                }}
                disabled={isDisabled}
                style={({ pressed }) => [
                    styles.btnContainer,
                    isDisabled && styles.btnContainerDisabled,
                    pressed && !isDisabled && styles.btnContainerPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={title}
                accessibilityState={{ disabled: isDisabled, busy: loading }}
                hitSlop={8}
            >
                <LinearGradient
                    colors={isDisabled ? ['#9a9a9a', '#7a7a7a'] : colors}
                    style={styles.btn}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            {Icon && iconPosition === 'left' && (
                                <Icon color={iconColor} width={iconSize} height={iconSize} />
                            )}
                            <Text style={[styles.btnTxt, textStyle]} allowFontScaling={false}>
                                {title}
                            </Text>
                            {Icon && iconPosition === 'right' && (
                                <Icon color={iconColor} width={iconSize} height={iconSize} />
                            )}
                        </>
                    )}
                </LinearGradient>
            </Pressable>
        </View>
    )
}

export default memo(GradientButton)

const styles = StyleSheet.create({
    container: {
        width: '75%',
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 12,
        ...Platform.select({
            ios: {
                shadowColor: '#dfbe3e',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.35,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    btnContainer: {
        borderRadius: 12,
        overflow: 'hidden', // keeps gradient clipped to rounded corners
        borderWidth: 1.5,
        borderColor: '#dfbe3e',
    },
    btnContainerPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.98 }],
    },
    btnContainerDisabled: {
        borderColor: '#7a7a7a',
        opacity: 0.7,
    },
    btn: {
        paddingVertical: 15,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    btnTxt: {
        color: '#fff',
        fontSize: RFValue(15),
        fontFamily: 'Philosopher-Bold',
        letterSpacing: 1.5,
    },
})